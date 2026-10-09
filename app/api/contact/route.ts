import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addEnquiry } from '@/lib/enquiries';

const enquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Please enter a valid phone number').max(30),
  message: z.string().min(1, 'Please enter a message').max(4000),
});

// Simple in-memory rate-limiter by IP/time
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local';
    const lastRequest = rateLimitMap.get(ip);
    const now = Date.now();

    // Limit to 1 request every 2 seconds per IP
    if (lastRequest && now - lastRequest < 2000) {
      return NextResponse.json(
        { error: 'Please wait a moment before sending another message.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    const body = await request.json();
    const validatedData = enquirySchema.parse(body);

    // Save with guaranteed local-first storage + Supabase sync
    const saved = await addEnquiry({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
    });

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received successfully.',
      enquiryId: saved.id,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0]?.message || 'Validation failed' },
        { status: 400 }
      );
    }

    console.error('API /api/contact error:', err);
    return NextResponse.json(
      { error: 'Failed to process enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
