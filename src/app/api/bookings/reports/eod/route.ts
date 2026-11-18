import { NextRequest, NextResponse } from 'next/server';
import { mockUniversalBookings } from '../../../../data/mockUniversalBookings';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const storeId = searchParams.get('storeId');

    let dailyBookings = mockUniversalBookings.filter((b) => b.bookingDate === date);
    if (storeId && storeId !== 'ALL') {
      dailyBookings = dailyBookings.filter((b) => b.storeId === storeId);
    }

    const totalScheduled = dailyBookings.length;
    const completed = dailyBookings.filter((b) => b.status === 'COMPLETED');
    const confirmedRemaining = dailyBookings.filter((b) => b.status === 'CONFIRMED');
    const cancelled = dailyBookings.filter((b) => b.status === 'CANCELLED');
    const noShows = dailyBookings.filter((b) => b.status === 'NO_SHOW');

    // Revenue calculations
    let totalRevenue = 0;
    let upiRevenue = 0;
    let cashRevenue = 0;
    let cardRevenue = 0;

    for (const b of completed) {
      const amt = Number(b.amountPaid || b.amountTotal || 0);
      totalRevenue += amt;
      if (b.paymentMode === 'UPI') upiRevenue += amt;
      else if (b.paymentMode === 'CASH') cashRevenue += amt;
      else if (b.paymentMode === 'CARD') cardRevenue += amt;
      else upiRevenue += amt; // Default
    }

    // Follow-ups generated today
    const followUpsScheduled = dailyBookings.filter((b) => b.followUpRequired).length;

    // Build the formatted WhatsApp EOD message (as designed in the scanned guide)
    const eodWhatsAppMessage =
      `📊 *DAILY END-OF-DAY (EOD) BUSINESS REPORT*\n` +
      `📅 *Date:* ${date} | ⏰ *Generated at:* 21:00 IST\n` +
      `---------------------------------------\n\n` +
      `👥 *PATIENT / CLIENT APPOINTMENTS SUMMARY:*\n` +
      `• Total Scheduled Slots: *${totalScheduled}*\n` +
      `• Completed Visits: *${completed.length}* (${totalScheduled > 0 ? Math.round((completed.length / totalScheduled) * 100) : 0}% turn-out)\n` +
      `• Pending / In-Progress: *${confirmedRemaining.length}*\n` +
      `• Cancellations / No-Shows: *${cancelled.length + noShows.length}*\n\n` +
      `💰 *FINANCIAL & BILLING SUMMARY:*\n` +
      `• Total Revenue Collected: *₹${totalRevenue.toLocaleString('en-IN')}*\n` +
      `  - 📲 UPI / Digital: *₹${upiRevenue.toLocaleString('en-IN')}*\n` +
      `  - 💵 Cash Counter: *₹${cashRevenue.toLocaleString('en-IN')}*\n` +
      `  - 💳 POS Card Swipe: *₹${cardRevenue.toLocaleString('en-IN')}*\n\n` +
      `🔁 *RETENTION & FOLLOW-UPS:*\n` +
      `• Follow-up recalls scheduled: *${followUpsScheduled}*\n` +
      `• 18:00 WhatsApp Reminders for tomorrow: *Active & Dispatched*\n\n` +
      `_Automated by Explore Hyperlocal Multi-Business Commerce OS_`;

    return NextResponse.json({
      date,
      summary: {
        totalScheduled,
        completedCount: completed.length,
        pendingCount: confirmedRemaining.length,
        cancelledCount: cancelled.length,
        noShowCount: noShows.length,
        totalRevenue,
        breakdown: {
          upi: upiRevenue,
          cash: cashRevenue,
          card: cardRevenue,
        },
        followUpsScheduled,
      },
      eodWhatsAppMessage,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
