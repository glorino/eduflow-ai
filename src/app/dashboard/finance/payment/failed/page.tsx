'use client';

import Link from 'next/link';

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xl">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-rose-500/25">✕</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Payment Failed</h2>
          <p className="text-slate-500 mb-6">Something went wrong with your payment. Please try again.</p>
          <div className="bg-rose-50 rounded-2xl p-5 mb-6 border border-rose-100/50">
            <p className="text-sm text-rose-700">Common reasons: Insufficient funds, card declined, or network timeout.</p>
          </div>
          <div className="space-y-3">
            <Link href="/dashboard/finance" className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all text-center">
              Try Again →
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
