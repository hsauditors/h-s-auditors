import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/supabase/require-admin';

interface ReorderPayload {
  table: string;
  items: Array<{ id: string; display_order: number }>;
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;
    const supabaseUserClient = auth.supabase;

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

    // Sync to Supabase
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
