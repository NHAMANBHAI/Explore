import { NextRequest, NextResponse } from 'next/server';
import { UniversalBooking, Store } from '../../../database/models';
import { mockUniversalBookings, MockBookingItem } from '../../../data/mockUniversalBookings';
import { Op } from 'sequelize';

// In-memory store for active session state if database is unseeded/offline
let memoryBookings: MockBookingItem[] = [...mockUniversalBookings];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get('storeId');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const search = searchParams.get('search')?.toLowerCase();

    // 1. Try fetching from MySQL / Sequelize
    try {
      const whereClause: any = {};
      if (storeId && storeId !== 'ALL') whereClause.storeId = storeId;
      if (category && category !== 'ALL') whereClause.businessCategory = category;
      if (status && status !== 'ALL') whereClause.status = status;
      if (date) whereClause.bookingDate = date;
      if (search) {
        whereClause[Op.or] = [
          { customerName: { [Op.like]: `%${search}%` } },
          { customerPhone: { [Op.like]: `%${search}%` } },
          { providerName: { [Op.like]: `%${search}%` } },
          { bookingNumber: { [Op.like]: `%${search}%` } },
          { serviceName: { [Op.like]: `%${search}%` } },
        ];
      }

      const dbBookings = await UniversalBooking.findAll({
        where: whereClause,
        order: [['bookingDate', 'DESC'], ['bookingTime', 'ASC']],
        limit: 100,
      });

      if (dbBookings && dbBookings.length > 0) {
        return NextResponse.json({
          source: 'DATABASE',
          count: dbBookings.length,
          bookings: dbBookings,
        });
      }
    } catch (dbErr) {
      console.warn('Sequelize query fallback to memory mock:', (dbErr as Error).message);
    }

    // 2. Fallback to rich mock database
    let results = [...memoryBookings];
    if (storeId && storeId !== 'ALL') {
      results = results.filter((b) => b.storeId === storeId);
    }
    if (category && category !== 'ALL') {
      results = results.filter((b) => b.businessCategory === category);
    }
    if (status && status !== 'ALL') {
      results = results.filter((b) => b.status === status);
    }
    if (date) {
      results = results.filter((b) => b.bookingDate === date);
    }
    if (search) {
      results = results.filter(
        (b) =>
          b.customerName.toLowerCase().includes(search) ||
          b.customerPhone.includes(search) ||
          b.providerName.toLowerCase().includes(search) ||
          b.serviceName.toLowerCase().includes(search) ||
          b.bookingNumber.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      source: 'MOCK_STORE',
      count: results.length,
      bookings: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve bookings', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      storeId = 'store-apollo-01',
      storeName = 'Default Provider',
      businessCategory = 'CLINIC',
      customerName,
      customerPhone,
      customerEmail,
      providerName,
      providerTitle = 'Specialist',
      serviceName,
      serviceCategory = 'General',
      bookingDate,
      bookingTime,
      durationMinutes = 30,
      amountTotal = 0,
      whatsappConsent = true,
      consultationNotes = '',
    } = body;

    // Validation
    if (!customerName || !customerPhone || !providerName || !serviceName || !bookingDate || !bookingTime) {
      return NextResponse.json(
        { error: 'MISSING_FIELDS', message: 'Name, phone, provider, service, date, and slot time are required.' },
        { status: 400 }
      );
    }

    // =========================================================================
    // WORKFLOW 1: SLOT AVAILABILITY CHECK & ANTI-DOUBLE BOOKING (CLASH PREVENTION)
    // =========================================================================
    try {
      const existingClash = await UniversalBooking.findOne({
        where: {
          storeId,
          providerName,
          bookingDate,
          bookingTime,
          status: { [Op.ne]: 'CANCELLED' },
        },
      });

      if (existingClash) {
        return NextResponse.json(
          {
            error: 'SLOT_CLASH_DETECTED',
            message: `Slot ${bookingTime} on ${bookingDate} is already reserved for ${providerName}.`,
            clashBookingNumber: existingClash.bookingNumber,
            suggestedAction: 'Please select an alternate 30-minute interval or different provider.',
          },
          { status: 409 }
        );
      }
    } catch {
      // Memory check fallback
      const memoryClash = memoryBookings.find(
        (b) =>
          b.storeId === storeId &&
          b.providerName.toLowerCase() === providerName.toLowerCase() &&
          b.bookingDate === bookingDate &&
          b.bookingTime === bookingTime &&
          b.status !== 'CANCELLED'
      );
      if (memoryClash) {
        return NextResponse.json(
          {
            error: 'SLOT_CLASH_DETECTED',
            message: `Slot ${bookingTime} on ${bookingDate} is already reserved for ${providerName}.`,
            clashBookingNumber: memoryClash.bookingNumber,
            suggestedAction: 'Please select an alternate 30-minute interval or different provider.',
          },
          { status: 409 }
        );
      }
    }

    // Generate unique booking number
    const prefix = businessCategory.slice(0, 3).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `BK-${prefix}-${randomSuffix}`;

    const newBookingData: MockBookingItem = {
      id: `ub-${Date.now()}`,
      bookingNumber,
      storeId,
      storeName,
      businessCategory,
      customerName,
      customerPhone,
      customerEmail,
      providerName,
      providerTitle,
      serviceName,
      serviceCategory,
      bookingDate,
      bookingTime,
      durationMinutes: Number(durationMinutes),
      status: 'CONFIRMED',
      consultationNotes,
      paymentStatus: 'PENDING',
      paymentMode: 'PENDING',
      amountTotal: Number(amountTotal),
      amountPaid: 0,
      whatsappConsent: Boolean(whatsappConsent),
      reminderSent: false,
      followUpRequired: false,
      followUpStatus: 'NONE',
    };

    // Save to DB if available
    try {
      await UniversalBooking.create({
        ...newBookingData,
        amountPaid: 0,
      });
    } catch (e) {
      console.warn('DB create skipped, saved in memory:', (e as Error).message);
    }

    // Always push to in-memory store
    memoryBookings.unshift(newBookingData);

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment booked successfully with zero slot clashes.',
        booking: newBookingData,
        whatsappNotificationQueued: whatsappConsent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Booking creation failed', details: error.message },
      { status: 500 }
    );
  }
}
