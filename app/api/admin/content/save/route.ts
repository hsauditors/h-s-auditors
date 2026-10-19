import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/require-admin';

async function getSupabaseClient(userClient?: any) {
  try {
    return createAdminClient();
  } catch {
    return userClient || createClient();
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const supabase = createClient();

    if (!table) {
      return NextResponse.json({ error: 'Missing table parameter' }, { status: 400 });
    }

    if (table === 'services_banner') {
      const defaultBanner = {
        eyebrow: 'OUR SERVICES',
        headline: 'Accounting, Audit & Advisory Services',
        description: 'Explore our core domains below. Each service is delivered with expertise, accuracy and a deep understanding of regulatory requirements to support your business goals.',
        image_url: '/images/service-accounting.jpg',
      };

      try {
        const { data } = await supabase
          .from('homepage_sections')
          .select('*')
          .eq('section_key', 'services_banner')
          .maybeSingle();

        if (data) {
          return NextResponse.json({
            eyebrow: data.eyebrow || defaultBanner.eyebrow,
            headline: data.headline || defaultBanner.headline,
            description: data.description || defaultBanner.description,
            image_url: data.desktop_image_url || data.mobile_image_url || defaultBanner.image_url,
          });
        }
      } catch {}

      return NextResponse.json(defaultBanner);
    }

    if (table === 'career_settings') {
      const defaultPool = {
        talent_pool: {
          heading: "Don't see your role above?",
          description: "We are always looking for driven CA finalists, semi-qualified accountants, and tax interns to join our talent pool.",
          button_text: "Send Your CV to info@hsauditors.com",
          email: "info@hsauditors.com",
        },
      };

      try {
        const { data } = await supabase
          .from('homepage_sections')
          .select('*')
          .eq('section_key', 'talent_pool')
          .maybeSingle();

        if (data) {
          return NextResponse.json({
            talent_pool: {
              heading: data.headline || defaultPool.talent_pool.heading,
              description: data.description || defaultPool.talent_pool.description,
              button_text: data.primary_cta_text || defaultPool.talent_pool.button_text,
              email: defaultPool.talent_pool.email,
            },
          });
        }
      } catch {}

      return NextResponse.json(defaultPool);
    }

    // List tables (array of items)
    if (['services', 'compliance_deadlines', 'why_choose_items', 'homepage_stats', 'industries', 'testimonials', 'team_members', 'careers', 'values', 'about_features'].includes(table)) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn(`Error fetching ${table}:`, error.message);
        return NextResponse.json([]);
      }

      const activeItems = (data || []).filter((item: any) => item.is_active !== false && !item._deleted);
      return NextResponse.json(activeItems);
    }

    // Single-object tables (homepage_sections, about_content, site_settings)
    if (['homepage_sections', 'about_content', 'site_settings'].includes(table)) {
      let query = supabase.from(table).select('*');
      if (table === 'homepage_sections') {
        query = query.eq('section_key', 'hero');
      }
      const { data, error } = await query.limit(1).maybeSingle();
      if (error && error.code !== 'PGRST116') {
        console.warn(`Error fetching ${table}:`, error.message);
      }
      return NextResponse.json(data || {});
    }

    return NextResponse.json([]);
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

    const supabase = await getSupabaseClient(auth.supabase);

    // Handle services_banner stored in homepage_sections
    if (table === 'services_banner') {
      const bannerPayload = {
        section_key: 'services_banner',
        eyebrow: data.eyebrow || '',
        headline: data.headline || '',
        description: data.description || '',
        desktop_image_url: data.image_url || '',
        is_active: true,
        updated_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase
        .from('homepage_sections')
        .select('id')
        .eq('section_key', 'services_banner')
        .maybeSingle();

      if (existing) {
        await supabase
          .from('homepage_sections')
          .update(bannerPayload)
          .eq('section_key', 'services_banner');
      } else {
        await supabase
          .from('homepage_sections')
          .insert([bannerPayload]);
      }

      revalidatePath('/', 'layout');
      revalidatePath('/services');
      return NextResponse.json({ success: true, item: data });
    }

    // Handle career_settings (talent_pool) stored in homepage_sections
    if (table === 'career_settings') {
      const pool = data.talent_pool || {};
      const poolPayload = {
        section_key: 'talent_pool',
        headline: pool.heading || '',
        description: pool.description || '',
        primary_cta_text: pool.button_text || '',
        is_active: true,
        updated_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase
        .from('homepage_sections')
        .select('id')
        .eq('section_key', 'talent_pool')
        .maybeSingle();

      if (existing) {
        await supabase
          .from('homepage_sections')
          .update(poolPayload)
          .eq('section_key', 'talent_pool');
      } else {
        await supabase
          .from('homepage_sections')
          .insert([poolPayload]);
      }

      revalidatePath('/', 'layout');
      revalidatePath('/careers');
      return NextResponse.json({ success: true, item: data });
    }

    // Handle about_content (single-row table with NO is_active column in Postgres)
    if (table === 'about_content') {
      const { data: existing } = await supabase
        .from('about_content')
        .select('id')
        .limit(1)
        .maybeSingle();

      const aboutPayload: any = {
        ...data,
        updated_at: new Date().toISOString(),
      };
      delete aboutPayload.is_active;
      delete aboutPayload._deleted;

      if (existing?.id) {
        aboutPayload.id = existing.id;
        const { error: updateErr } = await supabase
          .from('about_content')
          .update(aboutPayload)
          .eq('id', existing.id);

        if (updateErr) throw new Error(updateErr.message);
      } else {
        aboutPayload.id = (aboutPayload.id && aboutPayload.id !== 'default')
          ? aboutPayload.id
          : '00000000-0000-0000-0007-000000000001';
        const { error: insertErr } = await supabase
          .from('about_content')
          .insert([aboutPayload]);

        if (insertErr) throw new Error(insertErr.message);
      }

      try {
        revalidatePath('/', 'layout');
        revalidatePath('/about');
      } catch {}

      return NextResponse.json({ success: true, item: aboutPayload });
    }

    // Handle site_settings (single-row table with NO is_active column in Postgres)
    if (table === 'site_settings') {
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      const settingsPayload: any = {
        ...data,
        updated_at: new Date().toISOString(),
      };
      delete settingsPayload.is_active;
      delete settingsPayload._deleted;

      const targetId = existing?.id || '00000000-0000-0000-0000-000000000001';
      settingsPayload.id = targetId;

      if (existing?.id) {
        const { error: updateErr } = await supabase
          .from('site_settings')
          .update(settingsPayload)
          .eq('id', targetId);

        if (updateErr) throw new Error(updateErr.message);
      } else {
        const { error: insertErr } = await supabase
          .from('site_settings')
          .insert([settingsPayload]);

        if (insertErr) throw new Error(insertErr.message);
      }

      try {
        revalidatePath('/', 'layout');
      } catch {}

      return NextResponse.json({ success: true, item: settingsPayload });
    }

    // Generate solid ID if missing
    if (!data.id) {
      data.id = matchValue || data.slug || `${table}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    }

    // Tables without is_active column in DB schema
    const tablesWithoutIsActive = ['about_content', 'site_settings', 'enquiries', 'media', 'admin_profiles'];

    const payload: any = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    if (!tablesWithoutIsActive.includes(table)) {
      payload.is_active = data.is_active !== false;
    } else {
      delete payload.is_active;
    }
    delete payload._deleted;

    // Supabase update or insert
    const key = matchValue || data[matchKey] || data.id;

    if (key) {
      const { data: existing } = await supabase
        .from(table)
        .select(matchKey)
        .eq(matchKey, key)
        .maybeSingle();

      if (existing) {
        const { error: updateErr } = await supabase
          .from(table)
          .update(payload)
          .eq(matchKey, key);

        if (updateErr) throw new Error(updateErr.message);
      } else {
        const { error: insertErr } = await supabase
          .from(table)
          .insert([payload]);

        if (insertErr) throw new Error(insertErr.message);
      }
    } else {
      const { error: insertErr } = await supabase
        .from(table)
        .insert([payload]);

      if (insertErr) throw new Error(insertErr.message);
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

    return NextResponse.json({ success: true, item: payload });
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

    const supabase = await getSupabaseClient(auth.supabase);

    const { error: deleteErr } = await supabase
      .from(table)
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (deleteErr) {
      console.warn(`Supabase deactivate error on ${table}:`, deleteErr.message);
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/industries');
      revalidatePath('/services');
      revalidatePath('/about');
      revalidatePath('/careers');
    } catch {}

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    console.error('API content DELETE error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
