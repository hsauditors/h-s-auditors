import { NextResponse } from 'next/server';
import {
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '@/lib/enquiries';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const list = await getAllEnquiries();
    return NextResponse.json(list);
  } catch (err: any) {
    console.error('Error in GET /api/admin/enquiries:', err);
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 }
      );
    }

    await updateEnquiryStatus(id, status);
    return NextResponse.json({ success: true, id, status });
  } catch (err: any) {
    console.error('Error in PATCH /api/admin/enquiries:', err);
    return NextResponse.json(
      { error: 'Failed to update enquiry status' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing enquiry id' },
        { status: 400 }
      );
    }

    await deleteEnquiry(id);
    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    console.error('Error in DELETE /api/admin/enquiries:', err);
    return NextResponse.json(
      { error: 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}
