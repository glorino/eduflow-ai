'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-xl font-extrabold text-slate-900">EduFlow AI</span>
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-emerald-500/25">📧</div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Check your email</h2>
            <p className="text-slate-500 mb-8">We&apos;ve sent a password reset link to your email address. It may take a minute to arrive.</p>
            <Link href="/login" className="inline-flex bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all">← Back to Sign In</Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Reset your password</h2>
            <p className="text-sm text-slate-500 mb-8">Enter your email address and we&apos;ll send you a link to reset your password.</p>

            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                <input type="email" placeholder="you@school.com" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all active:scale-[0.98]">
                Send Reset Link →
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Remember your password?{' '}
              <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700">Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
