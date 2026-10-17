import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/supabase/require-admin';

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if (auth.response) return auth.response;
    const supabaseUserClient = auth.supabase;

    const { public_id } = await request.json();

    if (!public_id) {
      return NextResponse.json({ error: 'Missing public_id' }, { status: 400 });
    }

    // Delete asset from Cloudinary
    await cloudinary.uploader.destroy(public_id);

    // Delete record from Supabase media table
    let supabase;
    try {
      supabase = createAdminClient();
    } catch {
      supabase = supabaseUserClient;
    }

    await supabase.from('media').delete().eq('public_id', public_id);

    return NextResponse.json({ success: true, message: 'Media asset deleted successfully' });
  } catch (err: any) {
    console.error('Error deleting Cloudinary asset:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to delete media asset' },
      { status: 500 }
    );
  }
}
