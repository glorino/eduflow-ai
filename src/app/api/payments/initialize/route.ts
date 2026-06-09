import { NextRequest, NextResponse } from 'next/server';
import { initializePayment } from '@/lib/flutterwave';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, email, name, phone, description, metadata, redirectUrl } = body;

    if (!amount || !email) {
      return NextResponse.json(
        { success: false, error: 'Amount and email are required' },
        { status: 400 }
      );
    }

    if (amount < 100) {
      return NextResponse.json(
        { success: false, error: 'Minimum payment is ₦100' },
        { status: 400 }
      );
    }

    const result = await initializePayment({
      amount: Number(amount),
      email,
      name,
      phone,
      description,
      metadata,
      redirectUrl,
    });

    return NextResponse.json({
      success: true,
      data: {
        checkoutUrl: result.checkoutUrl,
        txRef: result.txRef,
        flwRef: result.flwRef,
      },
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}
