import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import cloudinary from '@/lib/cloudinary';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'hs_auditors';
    const altText = (formData.get('alt_text') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg+xml'];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WEBP, SVG' },
        { status: 400 }
      );
    }

    // Validate file size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds maximum 15MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. ALWAYS write locally to public/uploads/ so the image is guaranteed to work instantly
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const safeFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const localFilePath = path.join(uploadsDir, safeFilename);
    fs.writeFileSync(localFilePath, buffer);
    const localUrl = `/uploads/${safeFilename}`;

    // 2. Also attempt Cloudinary upload
    let finalUrl = localUrl;
    let publicId = safeFilename;
    let width = 1200;
    let height = 800;

    try {
      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      if (uploadResult?.secure_url) {
        finalUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
        width = uploadResult.width;
        height = uploadResult.height;
      }
    } catch (cloudErr: any) {
      console.warn('Cloudinary upload fallback to local storage:', cloudErr?.message);
    }

    // 3. Attempt Supabase media log (non-blocking)
    try {
      let supabase: any;
      try {
        supabase = createAdminClient();
      } catch {
        supabase = createClient();
      }
      await supabase.from('media').insert([
        {
          public_id: publicId,
          secure_url: finalUrl,
          resource_type: 'image',
          folder,
          width,
          height,
          bytes: buffer.length,
          alt_text: altText || file.name,
        },
      ]);
    } catch (dbErr) {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      media: {
        id: publicId,
        public_id: publicId,
        secure_url: finalUrl,
        width,
        height,
        bytes: buffer.length,
      },
    });
  } catch (err: any) {
    console.error('Error handling upload:', err);
    return NextResponse.json(
      { error: err.message || 'Image upload failed' },
      { status: 500 }
    );
  }
}
