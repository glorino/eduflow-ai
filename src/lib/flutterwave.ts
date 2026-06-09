const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY!;
const FLW_PUBLIC_KEY = process.env.FLW_PUBLIC_KEY!;
const FLW_ENCRYPTION_KEY = process.env.FLW_ENCRYPTION_KEY!;
const FLW_BASE_URL = process.env.FLW_BASE_URL || 'https://api.flutterwave.com/v3';

// ============================================================
// Initialize a Flutterwave payment
// ============================================================
export async function initializePayment({
  amount,
  email,
  name,
  phone,
  description,
  metadata,
  redirectUrl,
}: {
  amount: number;
  email: string;
  name?: string;
  phone?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  redirectUrl?: string;
}) {
  const txRef = `eduflow-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const body = {
    tx_ref: txRef,
    amount: amount.toString(),
    currency: 'NGN',
    redirect_url: redirectUrl || `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard/finance/payment/callback`,
    meta: metadata || {},
    customer: {
      email,
      name: name || '',
      phone_number: phone || '',
    },
    customizations: {
      title: 'EduFlow AI',
      description: description || 'School Fee Payment',
      logo: '',
    },
  };

  const res = await fetch(`${FLW_BASE_URL}/payments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FLW_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (data.status !== 'success') {
    throw new Error(data.message || 'Payment initialization failed');
  }

  return {
    txRef,
    checkoutUrl: data.data.link,
    flwRef: data.data.id,
  };
}

// ============================================================
// Verify a Flutterwave transaction
// ============================================================
export async function verifyPayment(transactionId: string | number) {
  const res = await fetch(`${FLW_BASE_URL}/transactions/${transactionId}/verify`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${FLW_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (data.status !== 'success') {
    throw new Error(data.message || 'Transaction verification failed');
  }

  return {
    id: data.data.id,
    txRef: data.data.tx_ref,
    amount: data.data.amount,
    currency: data.data.currency,
    status: data.data.status,
    customer: data.data.customer,
    created_at: data.data.created_at,
    payment_type: data.data.payment_type,
    flw_ref: data.data.flw_ref,
  };
}

// ============================================================
// Verify Flutterwave webhook signature
// ============================================================
export function verifyWebhookSignature(
  payload: string,
  signature: string,
): boolean {
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha256', FLW_SECRET_KEY)
    .update(payload)
    .digest('hex');
  return hash === signature;
}

// ============================================================
// Create payment record in DB
// ============================================================
export async function recordPayment({
  studentId,
  structureId,
  amount,
  paidAmount,
  status,
  paymentMethod,
  transactionRef,
  txRef,
}: {
  studentId: string;
  structureId: string;
  amount: number;
  paidAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'PARTIAL';
  paymentMethod?: string;
  transactionRef?: string;
  txRef?: string;
}) {
  const { default: prisma } = await import('@/lib/prisma');
  
  return prisma.feePayment.create({
    data: {
      studentId,
      structureId,
      amount,
      paidAmount,
      status,
      paymentMethod: paymentMethod || 'flutterwave',
      transactionRef: transactionRef || txRef,
      paidAt: status === 'COMPLETED' ? new Date() : null,
    },
  });
}

// ============================================================
// Types
// ============================================================
export interface FlutterwaveTransaction {
  id: number;
  tx_ref: string;
  amount: number;
  currency: string;
  status: 'successful' | 'failed' | 'pending';
  customer: {
    email: string;
    name?: string;
    phone_number?: string;
  };
  created_at: string;
  payment_type: string;
  flw_ref: string;
}

export interface PaymentRecord {
  id: string;
  studentId: string;
  structureId: string;
  amount: number;
  paidAmount: number;
  status: string;
  paymentMethod: string | null;
  transactionRef: string | null;
  paidAt: Date | null;
  createdAt: Date;
}
