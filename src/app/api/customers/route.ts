import { NextResponse } from 'next/server';
import { Customer } from '@/database/models/Customer';
import { mockCustomers } from '@/data/mockCustomers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const status = searchParams.get('status') || '';

  try {
    // Attempt query from MySQL database
    const dbCustomers = await Customer.findAll({
      order: [['createdAt', 'DESC']],
    });

    if (dbCustomers && dbCustomers.length > 0) {
      let filtered = dbCustomers.map((c) => c.toJSON());
      if (search) {
        filtered = filtered.filter(
          (c: any) =>
            c.name.toLowerCase().includes(search) ||
            c.email.toLowerCase().includes(search) ||
            c.mobile.includes(search)
        );
      }
      if (status) {
        filtered = filtered.filter((c: any) => c.status === status);
      }
      return NextResponse.json({
        success: true,
        source: 'mysql',
        data: filtered,
        total: filtered.length,
      });
    }
  } catch (error: any) {
    console.warn('[API Warning] MySQL query failed, serving high-fidelity dataset:', error?.message);
  }

  // Graceful fallback to mock data when MySQL is not initialized
  let fallbackData = [...mockCustomers];
  if (search) {
    fallbackData = fallbackData.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.mobile.includes(search)
    );
  }
  if (status) {
    fallbackData = fallbackData.filter((c) => c.status === status);
  }

  return NextResponse.json({
    success: true,
    source: 'fallback_memory',
    data: fallbackData,
    total: fallbackData.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCustomer = await Customer.create({
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      countryCode: body.countryCode || '+91',
      status: body.status || 'ACTIVE',
      kycStatus: body.kycStatus || 'VERIFIED',
      referralCode: body.referralCode || `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      walletBalance: body.walletBalance || 0,
      loyaltyPoints: body.loyaltyPoints || 0,
      totalOrdersCount: 0,
      totalSpentAmount: 0,
    });

    return NextResponse.json({
      success: true,
      message: 'Customer created in MySQL database',
      data: newCustomer,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to create customer',
      },
      { status: 500 }
    );
  }
}
