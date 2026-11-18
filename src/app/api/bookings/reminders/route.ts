import { NextRequest, NextResponse } from 'next/server';
import { mockUniversalBookings } from '../../../../data/mockUniversalBookings';
import { UniversalBooking } from '../../../../database/models';

export async function GET(req: NextRequest) {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Find pending reminders
    let tomorrowBookings = mockUniversalBookings.filter(
      (b) => b.bookingDate === tomorrowStr && b.status === 'CONFIRMED' && !b.reminderSent
    );

    // Format WhatsApp preview templates
    const previewList = tomorrowBookings.map((b) => {
      const template = generateWhatsAppReminderMessage(b);
      return {
        bookingId: b.id,
        bookingNumber: b.bookingNumber,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        businessCategory: b.businessCategory,
        providerName: b.providerName,
        bookingDate: b.bookingDate,
        bookingTime: b.bookingTime,
        messagePreview: template,
      };
    });

    return NextResponse.json({
      scheduledDate: tomorrowStr,
      pendingCount: previewList.length,
      reminders: previewList,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const dispatched: any[] = [];
    const nowTimestamp = new Date().toISOString();

    for (const b of mockUniversalBookings) {
      if (b.bookingDate === tomorrowStr && b.status === 'CONFIRMED' && !b.reminderSent) {
        b.reminderSent = true;
        b.reminderSentAt = nowTimestamp;
        dispatched.push({
          bookingNumber: b.bookingNumber,
          customerName: b.customerName,
          phone: b.customerPhone,
          message: generateWhatsAppReminderMessage(b),
          status: 'SENT_VIA_WHATSAPP_GATEWAY',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Dispatched ${dispatched.length} WhatsApp reminders for tomorrow (${tomorrowStr}).`,
      sentCount: dispatched.length,
      dispatched,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function generateWhatsAppReminderMessage(b: any): string {
  const categoryEmoji =
    b.businessCategory === 'CLINIC'
      ? '🩺'
      : b.businessCategory === 'SALON'
      ? '💇'
      : b.businessCategory === 'AUTO_SERVICE'
      ? '🚗'
      : b.businessCategory === 'PET_CARE'
      ? '🐾'
      : '🧘';

  return `*Appointment Reminder from ${b.storeName || 'Our Center'}* ${categoryEmoji}\n\n` +
    `Hello *${b.customerName}*,\n` +
    `This is a friendly reminder for your upcoming session:\n\n` +
    `📌 *Service:* ${b.serviceName}\n` +
    `👨‍⚕️/👩‍💼 *Specialist:* ${b.providerName} (${b.providerTitle})\n` +
    `🗓️ *Date:* ${b.bookingDate}\n` +
    `⏰ *Time Slot:* ${b.bookingTime} (${b.durationMinutes} mins)\n` +
    `🆔 *Booking Ref:* ${b.bookingNumber}\n\n` +
    `📍 *Location:* Main Center, 1st Floor, High Street.\n` +
    `Please arrive 10 minutes prior to your scheduled slot. If you need to reschedule, reply *RESCHEDULE* to this number.\n\n` +
    `Thank you!`;
}
