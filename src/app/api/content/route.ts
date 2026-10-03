import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (err: any) {
    console.error('Error fetching site content:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateSiteContent(body);
    return NextResponse.json({
      success: true,
      message: 'Site content updated and published live successfully!',
      content: updated,
    });
  } catch (err: any) {
    console.error('Error updating site content:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to update site content' },
      { status: 500 }
    );
  }
}
