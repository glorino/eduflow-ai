'use client';

import Link from 'next/link';
import { useSearchParams, Suspense } from 'next/navigation';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get('tx_ref');
  const amount = searchParams.get('amount');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xl">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-emerald-500/25 animate-bounce">&#10003;</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Payment Successful!</h2>
          <p className="text-slate-500 mb-6">Your school fee payment has been processed successfully.</p>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 mb-6 border border-emerald-100/50">
            <div className="text-3xl font-extrabold text-emerald-700">&#8358;{Number(amount || 0).toLocaleString()}</div>
            {txRef && <div className="text-xs font-mono text-emerald-600 mt-1">{txRef}</div>}
          </div>
          <div className="space-y-3">
            <Link href="/dashboard/finance" className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all text-center">
              View Receipt &rarr;
            </Link>
            <Link href="/dashboard" className="block w-full border border-slate-200 text-slate-700 py-3.5 rounded-2xl font-bold hover:bg-slate-50 transition-all text-center">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-3xl mb-4 animate-pulse">&#10003;</div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
