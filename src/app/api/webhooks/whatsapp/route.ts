import { NextRequest, NextResponse } from 'next/server';
import { mockUniversalBookings } from '../../../../data/mockUniversalBookings';
import { UniversalBooking } from '../../../../database/models';
import { sendWhatsAppMessage } from '../../../../services/whatsappService';

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'explore_whatsapp_token_2026';

/**
 * GET: Meta Webhook Handshake & Verification
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ [WhatsApp Webhook] Meta Handshake Verified successfully.');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification token mismatch' }, { status: 403 });
}

/**
 * POST: Inbound Two-Way WhatsApp Customer Replies
 * Handles customer replies: "CONFIRM", "YES", "RESCHEDULE", "CANCEL"
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if this is a message from WhatsApp
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (!message) {
      // Might be a delivery receipt or status update
      return NextResponse.json({ status: 'ACKNOWLEDGED_STATUS_PING' }, { status: 200 });
    }

    const senderPhone = message.from; // e.g. "919876543210"
    const textBody = (message.text?.body || '').trim().toUpperCase();

    console.log('📩 [Inbound WhatsApp Reply Received]: From:', senderPhone, 'Message:', textBody);

    // Find the latest active booking matching customer phone
    const cleanSender = senderPhone.replace(/[^0-9]/g, '');
    let matchedBooking = mockUniversalBookings.find((b) => {
      const bPhone = b.customerPhone.replace(/[^0-9]/g, '');
      return bPhone.endsWith(cleanSender) || cleanSender.endsWith(bPhone);
    });

    let actionTaken = 'NONE';
    let autoReplyText = '';

    if (matchedBooking) {
      if (textBody.includes('CONFIRM') || textBody === 'YES' || textBody === '1') {
        matchedBooking.status = 'CONFIRMED';
        actionTaken = 'SLOT_CONFIRMED_BY_CUSTOMER';
        autoReplyText = `✅ Thank you, ${matchedBooking.customerName}! Your appointment with ${matchedBooking.providerName} on ${matchedBooking.bookingDate} at ${matchedBooking.bookingTime} is 100% CONFIRMED. See you soon!`;
      } else if (textBody.includes('RESCHEDULE') || textBody.includes('CANCEL') || textBody === '2') {
        matchedBooking.status = 'RESCHEDULED';
        actionTaken = 'RESCHEDULE_REQUESTED_BY_CUSTOMER';
        autoReplyText = `⚠️ We noted your request to reschedule, ${matchedBooking.customerName}. Our front desk will contact you shortly to allocate a new convenient slot.`;
      } else if (textBody.includes('BOOK')) {
        actionTaken = 'RECALL_CONVERTED_NEW_BOOKING_INITIATED';
        matchedBooking.followUpStatus = 'CONVERTED';
        autoReplyText = `🎉 Welcome back! We are thrilled to have you. Please tap our direct booking portal to pick your slot: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/book`;
      }

      // Try updating Sequelize DB if connected
      try {
        const dbBooking = await UniversalBooking.findOne({ where: { bookingNumber: matchedBooking.bookingNumber } });
        if (dbBooking) {
          if (actionTaken === 'SLOT_CONFIRMED_BY_CUSTOMER') dbBooking.status = 'CONFIRMED';
          if (actionTaken === 'RESCHEDULE_REQUESTED_BY_CUSTOMER') dbBooking.status = 'RESCHEDULED';
          if (actionTaken === 'RECALL_CONVERTED_NEW_BOOKING_INITIATED') dbBooking.followUpStatus = 'CONVERTED';
          await dbBooking.save();
        }
      } catch (dbErr) {
        console.warn('DB sync warning on inbound webhook:', (dbErr as Error).message);
      }

      // Send automated WhatsApp confirmation reply
      if (autoReplyText) {
        await sendWhatsAppMessage({
          toPhone: senderPhone,
          customerName: matchedBooking.customerName,
          templateType: 'BOOKING_CONFIRMATION',
          data: {
            ...matchedBooking,
            eodWhatsAppMessage: autoReplyText,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      senderPhone,
      textBody,
      matchedBookingNumber: matchedBooking?.bookingNumber || null,
      actionTaken,
    });
  } catch (error: any) {
    console.error('❌ [WhatsApp Webhook Error]:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
