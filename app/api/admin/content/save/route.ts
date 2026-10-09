import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  DEFAULT_SERVICES,
  DEFAULT_SERVICES_BANNER,
  DEFAULT_COMPLIANCE_DEADLINES,
  DEFAULT_WHY_CHOOSE,
  DEFAULT_STATS,
  DEFAULT_HERO,
  DEFAULT_ABOUT,
  DEFAULT_SETTINGS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_INDUSTRIES,
} from '@/lib/defaultData';

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

// Map default data to tables
function getDefaultsForTable(table: string): any {
  switch (table) {
    case 'services':
      return DEFAULT_SERVICES;
    case 'services_banner':
      return {
        banner: DEFAULT_SERVICES_BANNER,
        default: DEFAULT_SERVICES_BANNER,
      };
    case 'compliance_deadlines':
      return DEFAULT_COMPLIANCE_DEADLINES;
    case 'why_choose_items':
      return DEFAULT_WHY_CHOOSE;
    case 'homepage_stats':
      return DEFAULT_STATS;
    case 'homepage_sections':
      return { hero: DEFAULT_HERO };
    case 'about_content':
      return { default: DEFAULT_ABOUT, about: DEFAULT_ABOUT };
    case 'site_settings':
      return { default: DEFAULT_SETTINGS, settings: DEFAULT_SETTINGS };
    case 'testimonials':
      return DEFAULT_TESTIMONIALS;
    case 'industries':
      return DEFAULT_INDUSTRIES;
    case 'careers':
      return [];
    case 'career_settings':
      return {
        talent_pool: {
          heading: "Don't see your role above?",
          description: "We are always looking for driven CA finalists, semi-qualified accountants, and tax interns to join our talent pool.",
          button_text: "Send Your CV to info@hsauditors.com",
          email: "info@hsauditors.com",
          is_active: true,
        },
      };
    default:
      return null;
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
    const defaults = getDefaultsForTable(table);

    if (table === 'services_banner') {
      const bannerData =
        tableOverrides['banner'] ||
        tableOverrides['default'] ||
        defaults?.banner ||
        DEFAULT_SERVICES_BANNER;
      return NextResponse.json(bannerData);
    }

    // List tables (array of items)
    if (['services', 'compliance_deadlines', 'why_choose_items', 'homepage_stats', 'industries', 'testimonials', 'team_members', 'careers'].includes(table)) {
      // 1. Try fetching from Supabase if online
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

      // 2. Base list is dbItems or default items
      const baseItems: any[] = dbItems.length > 0 ? dbItems : Array.isArray(defaults) ? [...defaults] : [];

      // 3. Map over base items and apply overrides
      const itemsMap = new Map<string, any>();
      baseItems.forEach((item) => {
        if (table === 'services' && (!item.sub_services || item.sub_services.length === 0)) {
          const def = Array.isArray(defaults)
            ? defaults.find((d: any) => d.slug === item.slug || d.title?.toLowerCase() === item.title?.toLowerCase())
            : null;
          if (def?.sub_services) {
            item.sub_services = def.sub_services;
          }
        }
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
          // If overrideData has an id that matches an existing item, merge
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

    // Single-object tables
    if (defaults && typeof defaults === 'object') {
      const merged = { ...defaults, ...tableOverrides };
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

    // 2. Attempt Supabase sync non-blocking
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
        // Try update, if none updated then insert
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

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully',
      savedData: overrides[table][key],
    });
  } catch (err: any) {
    console.error('API content save error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to save content' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { table, id, matchKey = 'id' } = body;

    if (!table || !id) {
      return NextResponse.json({ error: 'Missing table or id' }, { status: 400 });
    }

    const overrides = readOverrides();
    if (!overrides[table]) {
      overrides[table] = {};
    }

    // Mark as deleted or delete key
    overrides[table][id] = {
      ...(overrides[table][id] || {}),
      _deleted: true,
      updated_at: new Date().toISOString(),
    };
    writeOverrides(overrides);

    // Also attempt deletion in Supabase
    try {
      let supabase: any;
      try {
        supabase = createAdminClient();
      } catch {
        supabase = createClient();
      }
      await supabase.from(table).delete().eq(matchKey, id);
    } catch (err: any) {
      console.warn('Supabase delete sync note:', err?.message);
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

    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  } catch (err: any) {
    console.error('API content delete error:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete item' }, { status: 500 });
  }
}
