import { NextRequest, NextResponse } from 'next/server';
import { mockUniversalBookings } from '../../../../data/mockUniversalBookings';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const interval = searchParams.get('interval'); // '7' | '15' | '30' | '90' | 'ALL'
    const status = searchParams.get('status'); // 'PENDING' | 'CONTACTED' | 'CONVERTED' | 'ALL'
    const dueFilter = searchParams.get('due'); // 'TODAY' | 'OVERDUE' | 'UPCOMING' | 'ALL'

    const todayStr = new Date().toISOString().split('T')[0];

    let followUps = mockUniversalBookings.filter((b) => b.followUpRequired);

    if (interval && interval !== 'ALL') {
      followUps = followUps.filter((b) => b.followUpIntervalDays === Number(interval));
    }

    if (status && status !== 'ALL') {
      followUps = followUps.filter((b) => b.followUpStatus === status);
    }

    if (dueFilter === 'TODAY') {
      followUps = followUps.filter((b) => b.followUpDate === todayStr);
    } else if (dueFilter === 'OVERDUE') {
      followUps = followUps.filter((b) => b.followUpDate && b.followUpDate < todayStr && b.followUpStatus === 'PENDING');
    } else if (dueFilter === 'UPCOMING') {
      followUps = followUps.filter((b) => b.followUpDate && b.followUpDate > todayStr);
    }

    return NextResponse.json({
      today: todayStr,
      count: followUps.length,
      followUps,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, followUpStatus, notes } = body;

    if (!bookingId || !followUpStatus) {
      return NextResponse.json({ error: 'bookingId and followUpStatus required' }, { status: 400 });
    }

    const item = mockUniversalBookings.find((b) => b.id === bookingId);
    if (!item) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    item.followUpStatus = followUpStatus;
    if (notes) {
      item.followUpNotes = `${item.followUpNotes || ''}\n[Status Updated to ${followUpStatus}]: ${notes}`;
    }

    return NextResponse.json({
      success: true,
      message: `Follow-up recall updated to ${followUpStatus}.`,
      booking: item,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
