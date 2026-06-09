import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/flutterwave';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('transaction_id') || searchParams.get('tx_ref');

    if (!transactionId) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const result = await verifyPayment(transactionId);

    return NextResponse.json({
      success: true,
      data: {
        id: result.id,
        txRef: result.txRef,
        amount: result.amount,
        currency: result.currency,
        status: result.status,
        customer: result.customer,
        createdAt: result.created_at,
        paymentType: result.payment_type,
        flwRef: result.flw_ref,
      },
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
