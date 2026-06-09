import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/flutterwave';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('flutterwave-signature') || '';

    // Verify webhook signature
    if (signature && !verifyWebhookSignature(body, signature)) {
      console.error('Invalid Flutterwave webhook signature');
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    const { event, data } = payload;

    console.log('Flutterwave webhook received:', { event, txRef: data?.tx_ref, status: data?.status });

    // Handle different events
    switch (event) {
      case 'charge.completed':
        if (data.status === 'successful') {
          // Payment successful — update database
          console.log('Payment successful:', {
            txRef: data.tx_ref,
            amount: data.amount,
            customer: data.customer?.email,
          });
          // TODO: Update FeePayment record in database
        }
        break;

      case 'charge.failed':
        console.log('Payment failed:', {
          txRef: data.tx_ref,
          amount: data.amount,
        });
        break;

      case 'charge.pending':
        console.log('Payment pending:', {
          txRef: data.tx_ref,
        });
        break;

      default:
        console.log('Unhandled webhook event:', event);
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
