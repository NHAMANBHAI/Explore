import { NextRequest, NextResponse } from 'next/server';
import { UniversalBooking } from '../../../../database/models';
import { mockUniversalBookings, MockBookingItem } from '../../../../data/mockUniversalBookings';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      status,
      consultationNotes,
      paymentStatus,
      paymentMode,
      amountPaid,
      followUpRequired,
      followUpIntervalDays,
      followUpNotes,
      followUpStatus,
    } = body;

    // Calculate follow-up date if required
    let followUpDate: string | undefined = undefined;
    if (followUpRequired && followUpIntervalDays) {
      const d = new Date();
      d.setDate(d.getDate() + Number(followUpIntervalDays));
      followUpDate = d.toISOString().split('T')[0];
    }

    // Try DB update
    try {
      const dbBooking = await UniversalBooking.findByPk(id);
      if (dbBooking) {
        if (status) dbBooking.status = status;
        if (consultationNotes !== undefined) dbBooking.consultationNotes = consultationNotes;
        if (paymentStatus) dbBooking.paymentStatus = paymentStatus;
        if (paymentMode) dbBooking.paymentMode = paymentMode;
        if (amountPaid !== undefined) dbBooking.amountPaid = Number(amountPaid);
        if (followUpRequired !== undefined) dbBooking.followUpRequired = Boolean(followUpRequired);
        if (followUpIntervalDays !== undefined) dbBooking.followUpIntervalDays = Number(followUpIntervalDays);
        if (followUpDate) dbBooking.followUpDate = followUpDate;
        if (followUpNotes !== undefined) dbBooking.followUpNotes = followUpNotes;
        if (followUpStatus) dbBooking.followUpStatus = followUpStatus;

        await dbBooking.save();
        return NextResponse.json({
          success: true,
          message: 'Booking updated in database.',
          booking: dbBooking,
        });
      }
    } catch (dbErr) {
      console.warn('DB update failed, modifying memory store:', (dbErr as Error).message);
    }

    // Memory fallback
    const idx = mockUniversalBookings.findIndex((b) => b.id === id);
    if (idx !== -1) {
      const b = mockUniversalBookings[idx];
      if (status) b.status = status;
      if (consultationNotes !== undefined) b.consultationNotes = consultationNotes;
      if (paymentStatus) b.paymentStatus = paymentStatus;
      if (paymentMode) b.paymentMode = paymentMode;
      if (amountPaid !== undefined) b.amountPaid = Number(amountPaid);
      if (followUpRequired !== undefined) b.followUpRequired = Boolean(followUpRequired);
      if (followUpIntervalDays !== undefined) b.followUpIntervalDays = Number(followUpIntervalDays);
      if (followUpDate) b.followUpDate = followUpDate;
      if (followUpNotes !== undefined) b.followUpNotes = followUpNotes;
      if (followUpStatus) b.followUpStatus = followUpStatus;
      if (followUpRequired && !b.followUpStatus) b.followUpStatus = 'PENDING';

      return NextResponse.json({
        success: true,
        message: 'Booking updated in memory state.',
        booking: b,
      });
    }

    return NextResponse.json({ error: 'BOOKING_NOT_FOUND', message: `No booking with ID ${id}` }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Update failed', details: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    try {
      const dbBooking = await UniversalBooking.findByPk(id);
      if (dbBooking) {
        dbBooking.status = 'CANCELLED';
        await dbBooking.save();
        return NextResponse.json({ success: true, message: 'Booking cancelled.' });
      }
    } catch {}

    const b = mockUniversalBookings.find((x) => x.id === id);
    if (b) {
      b.status = 'CANCELLED';
      return NextResponse.json({ success: true, message: 'Booking marked as CANCELLED in memory.' });
    }

    return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Cancellation failed', details: error.message }, { status: 500 });
  }
}
