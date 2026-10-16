import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const targetDir = path.join(process.cwd(), 'public', 'images');
  const targetPath = path.join(targetDir, 'hero-mobile.jpg');

  try {
    if (fs.existsSync(targetPath)) {
      const fileBuffer = fs.readFileSync(targetPath);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
