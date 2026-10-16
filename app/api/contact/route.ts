import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addEnquiry } from '@/lib/enquiries';

const enquirySchema = z.object({
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Please enter a valid phone number').max(35),
  countryCode: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Please enter a message').max(4000),
});

// Simple in-memory rate-limiter by IP/time
const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local';
    const lastRequest = rateLimitMap.get(ip);
    const now = Date.now();

    // Limit to 1 request every 1.5 seconds per IP
    if (lastRequest && now - lastRequest < 1500) {
      return NextResponse.json(
        { error: 'Please wait a moment before sending another message.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    const body = await request.json();
    const validatedData = enquirySchema.parse(body);

    // Calculate full composite name
    const computedName =
      validatedData.name?.trim() ||
      `${validatedData.firstName || ''} ${validatedData.lastName || ''}`.trim() ||
      'Website Client';

    // Calculate full phone number with country code
    const fullPhone = validatedData.countryCode && !validatedData.phone.startsWith('+')
      ? `${validatedData.countryCode} ${validatedData.phone}`.trim()
      : validatedData.phone.trim();

    // Format full message including subject if provided
    const fullMessage = validatedData.subject?.trim()
      ? `[Subject: ${validatedData.subject.trim()}]\n\n${validatedData.message.trim()}`
      : validatedData.message.trim();

    // Save with guaranteed local-first storage + Supabase sync (no mock data)
    const saved = await addEnquiry({
      name: computedName,
      email: validatedData.email.trim(),
      phone: fullPhone,
      message: fullMessage,
    });

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received successfully. We will get back to you shortly.',
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
