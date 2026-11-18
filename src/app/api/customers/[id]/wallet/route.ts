import { NextResponse } from 'next/server';
import { Customer } from '@/database/models/Customer';
import { WalletTransaction } from '@/database/models/WalletTransaction';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { amount, type, note } = await request.json();
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return NextResponse.json(
        { success: false, error: `Customer with ID ${id} not found.` },
        { status: 404 }
      );
    }

    const currentBalance = Number(customer.walletBalance);
    const adjustAmount = Number(amount);

    if (type === 'DEBIT' && currentBalance < adjustAmount) {
      return NextResponse.json(
        {
          success: false,
          error: `Insufficient balance (₹${currentBalance}). Cannot debit ₹${adjustAmount}.`,
        },
        { status: 422 }
      );
    }

    const newBalance = type === 'CREDIT' ? currentBalance + adjustAmount : currentBalance - adjustAmount;

    // Update customer wallet balance
    customer.walletBalance = newBalance;
    await customer.save();

    // Create audit transaction record
    const transaction = await WalletTransaction.create({
      customerId: id,
      amount: adjustAmount,
      type,
      balanceAfter: newBalance,
      referenceType: 'ADMIN_ADJUSTMENT',
      remarks: note || 'Manual adjustment via Hyperlocal Admin Panel',
      performedBy: 'ADMIN',
    });

    return NextResponse.json({
      success: true,
      message: `Wallet ${type === 'CREDIT' ? 'credited' : 'debited'} successfully.`,
      data: {
        customer,
        transaction,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Wallet transaction failed',
      },
      { status: 500 }
    );
  }
}
