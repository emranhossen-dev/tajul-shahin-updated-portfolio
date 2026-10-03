import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const candidates = [
      path.join(process.cwd(), 'public', 'Resume_of_Emran_Hossen.pdf'),
      path.join(process.cwd(), 'public', 'Resume-of-Emran Hossen.pdf'),
      path.join(process.cwd(), 'public', 'Resume of Emran Hossen.pdf'),
    ];

    const filePath = candidates.find((p) => fs.existsSync(p));

    if (!filePath) {
      return new NextResponse('Resume file not found in public folder', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Resume_of_Emran_Hossen.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Download resume error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

