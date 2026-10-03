import { NextRequest, NextResponse } from 'next/server';
import { getAllMessages, markMessageRead, deleteMessage, defaultCaseStudies } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const messages = await getAllMessages();
    const unreadCount = messages.filter((m) => !m.read).length;

    // Calculate quick stats
    const stats = {
      totalLeads: messages.length,
      unreadLeads: unreadCount,
      totalCaseStudies: defaultCaseStudies.length,
      adSpendManaged: '$1,000,000+',
      satisfactionRate: '98%',
    };

    const hasPostgres = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '');
    const dbStatus = {
      isPostgres: hasPostgres,
      type: hasPostgres ? 'PostgreSQL Cloud Database' : 'Isolated Local Database (JSON)',
      details: hasPostgres
        ? 'Custom DATABASE_URL configured in .env.local'
        : 'Private local database stored in data/content.json & data/messages.json',
      location: hasPostgres ? 'Cloud Database' : 'Local Project Filesystem (100% Private)',
    };

    return NextResponse.json({
      success: true,
      stats,
      messages,
      caseStudies: defaultCaseStudies,
      dbStatus,
    });
  } catch (error: any) {
    console.error('Admin API GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to load admin data' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Message ID is required' }, { status: 400 });
    }

    await markMessageRead(id, read ?? true);
    return NextResponse.json({ success: true, message: 'Message updated' });
  } catch (error: any) {
    console.error('Admin API PATCH error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Message ID is required' }, { status: 400 });
    }

    await deleteMessage(id);
    return NextResponse.json({ success: true, message: 'Message deleted' });
  } catch (error: any) {
    console.error('Admin API DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete message' }, { status: 500 });
  }
}
