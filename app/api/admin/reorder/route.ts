import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

interface ReorderPayload {
  table: string;
  items: Array<{ id: string; display_order: number }>;
}

export async function POST(request: Request) {
  try {
    const supabaseUserClient = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabaseUserClient.auth.getUser();

    if (process.env.NODE_ENV === 'production' && (authError || !user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { table, items }: ReorderPayload = await request.json();

    const allowedTables = [
      'services',
      'industries',
      'why_choose_items',
      'values',
      'compliance_deadlines',
      'team_members',
      'testimonials',
      'careers',
      'homepage_stats',
      'navigation_items',
      'about_features',
    ];

    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
    }

    // 1. Sync display_order in local overrides file
    try {
      const OVERRIDES_FILE = path.join(process.cwd(), 'data', 'cms_overrides.json');
      if (fs.existsSync(OVERRIDES_FILE)) {
        const overrides = JSON.parse(fs.readFileSync(OVERRIDES_FILE, 'utf-8') || '{}');
        if (!overrides[table]) overrides[table] = {};
        for (const item of items) {
          overrides[table][item.id] = {
            ...(overrides[table][item.id] || {}),
            id: item.id,
            display_order: item.display_order,
            updated_at: new Date().toISOString(),
          };
        }
        fs.writeFileSync(OVERRIDES_FILE, JSON.stringify(overrides, null, 2), 'utf-8');
      }
    } catch (fsErr) {
      console.warn('Reorder local overrides note:', fsErr);
    }

    // 2. Sync to Supabase
    try {
      let supabase: any;
      try {
        supabase = createAdminClient();
      } catch {
        supabase = supabaseUserClient;
      }

      for (const item of items) {
        await supabase
          .from(table)
          .update({ display_order: item.display_order, updated_at: new Date().toISOString() })
          .eq('id', item.id);
      }
    } catch (dbErr) {
      console.warn('Reorder Supabase sync note:', dbErr);
    }

    // 3. Instant cache revalidation
    try {
      revalidatePath('/', 'layout');
    } catch {}

    return NextResponse.json({ success: true, count: items.length });
  } catch (err: any) {
    console.error('Error reordering items:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to reorder items' },
      { status: 500 }
    );
  }
}
