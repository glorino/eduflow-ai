'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [details, setDetails] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const txRef = searchParams.get('tx_ref');
    const transactionId = searchParams.get('transaction_id');

    if (txRef || transactionId) {
      const verify = async () => {
        try {
          const res = await fetch(`/api/payments/verify?transaction_id=${transactionId || txRef}`);
          const data = await res.json();
          
          if (data.success && data.data.status === 'successful') {
            setStatus('success');
            setDetails(data.data);
          } else {
            setStatus('failed');
            setDetails(data.data);
          }
        } catch {
          setStatus('failed');
        }
      };
      verify();
    } else {
      setStatus('failed');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {status === 'verifying' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xl">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-4xl mb-6 shadow-lg animate-pulse">&#9203;</div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Verifying Payment</h2>
            <p className="text-slate-500">Please wait while we confirm your payment...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xl">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-emerald-500/25">&#10003;</div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Payment Successful!</h2>
            <p className="text-slate-500 mb-6">Your payment has been confirmed and recorded.</p>
            {details && (
              <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Amount</span>
                  <span className="font-bold text-slate-900">&#8358;{String(details.amount || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Reference</span>
                  <span className="font-mono text-xs text-slate-600">{String(details.txRef || '')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-600 font-semibold capitalize">{String(details.status || '')}</span>
                </div>
              </div>
            )}
            <Link href="/dashboard/finance" className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all text-center">
              Back to Finance &rarr;
            </Link>
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xl">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-rose-500/25">&#10005;</div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Payment Failed</h2>
            <p className="text-slate-500 mb-6">Your payment could not be verified. Please try again or contact support.</p>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/finance" className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all text-center">
                Try Again
              </Link>
              <Link href="/dashboard" className="block w-full border border-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold hover:bg-slate-50 transition-all text-center">
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentCallbackClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-3xl mb-4 animate-pulse">&#9203;</div>
          <p className="text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
