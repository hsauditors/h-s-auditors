import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/require-admin';

const OVERRIDES_FILE = path.join(process.cwd(), 'data', 'cms_overrides.json');

function readOverrides(): Record<string, any> {
  try {
    if (fs.existsSync(OVERRIDES_FILE)) {
      const content = fs.readFileSync(OVERRIDES_FILE, 'utf-8');
      return JSON.parse(content || '{}');
    }
  } catch (err) {
    console.warn('Error reading cms_overrides.json:', err);
  }
  return {};
}

function writeOverrides(data: Record<string, any>) {
  try {
    const dir = path.dirname(OVERRIDES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(OVERRIDES_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing cms_overrides.json:', err);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const overrides = readOverrides();

    if (!table) {
      return NextResponse.json(overrides);
    }

    const tableOverrides = overrides[table] || {};

    if (table === 'services_banner') {
      const defaultBanner = {
        eyebrow: 'OUR SERVICES',
        headline: 'Accounting, Audit & Advisory Services',
        description: 'Explore our core domains below. Each service is delivered with expertise, accuracy and a deep understanding of regulatory requirements to support your business goals.',
        image_url: '/images/service-accounting.jpg',
      };
      const bannerData =
        tableOverrides['banner'] ||
        tableOverrides['default'] ||
        defaultBanner;
      return NextResponse.json(bannerData);
    }

    // List tables (array of items)
    if (['services', 'compliance_deadlines', 'why_choose_items', 'homepage_stats', 'industries', 'testimonials', 'team_members', 'careers', 'values', 'about_features'].includes(table)) {
      // 1. Fetch from Supabase
      let dbItems: any[] = [];
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from(table)
          .select('*')
          .order('display_order', { ascending: true });
        if (data && data.length > 0) {
          dbItems = data;
        }
      } catch {}

      // 2. Base list is dbItems
      const baseItems: any[] = dbItems;

      // 3. Map over base items and apply overrides
      const itemsMap = new Map<string, any>();
      baseItems.forEach((item) => {
        const key = item.id || item.slug || item.key;
        itemsMap.set(String(key), item);
      });

      // 4. Merge or append overrides
      Object.entries(tableOverrides).forEach(([key, overrideData]: [string, any]) => {
        if (overrideData && overrideData._deleted) {
          itemsMap.delete(key);
          return;
        }
        if (itemsMap.has(key)) {
          itemsMap.set(key, { ...itemsMap.get(key), ...overrideData });
        } else {
          let matched = false;
          for (const [existingKey, existingVal] of Array.from(itemsMap.entries())) {
            if (
              (overrideData.id && String(existingVal.id) === String(overrideData.id)) ||
              (overrideData.slug && existingVal.slug === overrideData.slug)
            ) {
              itemsMap.set(existingKey, { ...existingVal, ...overrideData });
              matched = true;
              break;
            }
          }
          if (!matched && key !== 'default') {
            itemsMap.set(key, overrideData);
          }
        }
      });

      const result = Array.from(itemsMap.values())
        .filter((item) => !item._deleted)
        .sort((a, b) => (a.display_order ?? 99) - (b.display_order ?? 99));

      return NextResponse.json(result);
    }

    // Single-object tables (homepage_sections, about_content, site_settings)
    if (['homepage_sections', 'about_content', 'site_settings'].includes(table)) {
      let dbItem: any = null;
      try {
        const supabase = createClient();
        let query = supabase.from(table).select('*');
        if (table === 'homepage_sections') {
          query = query.eq('section_key', 'hero');
        }
        const { data } = await query.limit(1).single();
        if (data) dbItem = data;
      } catch {}

      const merged = { ...(dbItem || {}), ...tableOverrides };
      return NextResponse.json(merged);
    }

    return NextResponse.json(tableOverrides);
  } catch (err: any) {
    console.error('API content GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    const body = await request.json();
    const { table, matchKey = 'id', matchValue, data } = body;

    if (!table || !data) {
      return NextResponse.json({ error: 'Missing table or data' }, { status: 400 });
    }

    // Generate solid ID if missing
    if (!data.id) {
      data.id = matchValue || data.slug || `${table}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    }

    const key = matchValue || data[matchKey] || data.id || data.section_key || 'default';

    // 1. Persist to server-side overrides store
    const overrides = readOverrides();
    if (!overrides[table]) {
      overrides[table] = {};
    }

    overrides[table][key] = {
      ...(overrides[table][key] || {}),
      ...data,
      _deleted: false,
      updated_at: new Date().toISOString(),
    };
    writeOverrides(overrides);

    // 2. Attempt Supabase sync
    try {
      let supabase: any;
      try {
        supabase = createAdminClient();
      } catch {
        supabase = createClient();
      }

      if (matchValue) {
        await supabase.from(table).update(data).eq(matchKey, matchValue);
      } else if (data.id) {
        const { error: updateErr } = await supabase.from(table).update(data).eq('id', data.id);
        if (updateErr) {
          await supabase.from(table).insert([data]);
        }
      }
    } catch (dbErr: any) {
      console.warn('Supabase DB sync note:', dbErr?.message);
    }

    // Trigger instant ISR cache revalidation
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/industries');
      revalidatePath('/services');
      revalidatePath('/about');
      revalidatePath('/careers');
      revalidatePath('/contact');
    } catch {}

    return NextResponse.json({ success: true, key, item: overrides[table][key] });
  } catch (err: any) {
    console.error('API content POST error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;

    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const id = searchParams.get('id');

    if (!table || !id) {
      return NextResponse.json({ error: 'Missing table or id parameter' }, { status: 400 });
    }

    const overrides = readOverrides();
    if (overrides[table] && overrides[table][id]) {
      overrides[table][id] = {
        ...overrides[table][id],
        _deleted: true,
        is_active: false,
        updated_at: new Date().toISOString(),
      };
      writeOverrides(overrides);
    } else {
      if (!overrides[table]) overrides[table] = {};
      overrides[table][id] = {
        id,
        _deleted: true,
        is_active: false,
        updated_at: new Date().toISOString(),
      };
      writeOverrides(overrides);
    }

    // Best-effort Supabase sync
    try {
      let supabase: any;
      try {
        supabase = createAdminClient();
      } catch {
        supabase = createClient();
      }
      await supabase.from(table).update({ is_active: false }).eq('id', id);
    } catch {}

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/industries');
      revalidatePath('/services');
      revalidatePath('/about');
    } catch {}

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    console.error('API content DELETE error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
