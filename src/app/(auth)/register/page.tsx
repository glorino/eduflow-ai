'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [schoolType, setSchoolType] = useState('');

  const schoolTypes = [
    { value: 'nursery', label: 'Nursery', icon: '👶', color: 'from-pink-400 to-rose-500' },
    { value: 'primary', label: 'Primary', icon: '📚', color: 'from-amber-400 to-orange-500' },
    { value: 'secondary', label: 'Secondary', icon: '🎓', color: 'from-blue-400 to-indigo-500' },
    { value: 'college', label: 'College', icon: '🏛️', color: 'from-emerald-400 to-teal-500' },
    { value: 'mixed', label: 'Mixed (K-12)', icon: '🏫', color: 'from-violet-400 to-purple-500' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-floatSlow" />
          <div className="absolute bottom-16 left-16 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
            <span className="text-2xl font-extrabold">E</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight mb-4">Start managing your<br />school in minutes</h1>
          <p className="text-lg text-white/70 max-w-md leading-relaxed">Free 30-day trial. No credit card required. Full access to all 13 modules and AI agents.</p>

          <div className="mt-12 space-y-4">
            {[
              { text: 'Setup in under 5 minutes', icon: '⚡' },
              { text: 'Import students from Excel/CSV', icon: '📋' },
              { text: 'Dedicated onboarding specialist', icon: '🧑‍💼' },
              { text: 'Free data migration from your old system', icon: '🔄' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-sm">{item.icon}</span>
                <span className="text-sm text-white/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-lg">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-extrabold text-slate-900">EduFlow AI</span>
          </Link>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25' : 'bg-slate-100 text-slate-400'}`}>{s}</div>
                <span className={`text-sm font-semibold hidden sm:block ${step >= s ? 'text-slate-900' : 'text-slate-400'}`}>{s === 1 ? 'School Info' : 'Your Account'}</span>
                {s < 2 && <div className={`flex-1 h-0.5 rounded-full ${step > 1 ? 'bg-gradient-to-r from-blue-500 to-violet-500' : 'bg-slate-100'}`} />}
              </div>
            ))}
          </div>

          {step === 1 ? (
            <>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Tell us about your school</h2>
              <p className="text-sm text-slate-500 mb-8">Choose your school type to get started with the right template.</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {schoolTypes.map(type => (
                  <button key={type.value} onClick={() => setSchoolType(type.value)} className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${schoolType === type.value ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                    <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-xl text-white shadow-lg`}>{type.icon}</span>
                    <span className="text-sm font-bold text-slate-900">{type.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">School name</label>
                  <input placeholder="e.g. Lagos Model School" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Number of students</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-600">
                    <option>Select range</option>
                    <option>Under 100</option>
                    <option>100 - 500</option>
                    <option>500 - 2,000</option>
                    <option>2,000 - 5,000</option>
                    <option>5,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Number of campuses</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-600">
                    <option>1 Campus</option>
                    <option>2 - 5 Campuses</option>
                    <option>5 - 10 Campuses</option>
                    <option>10+ Campuses</option>
                  </select>
                </div>
              </div>

              <button onClick={() => setStep(2)} disabled={!schoolType} className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
                Continue →
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Create your account</h2>
              <p className="text-sm text-slate-500 mb-8">You&apos;ll be the admin for your school.</p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">First name</label>
                    <input placeholder="John" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last name</label>
                    <input placeholder="Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                  <input type="email" placeholder="admin@school.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone number</label>
                  <input type="tel" placeholder="+234 801 234 5678" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                  <input type="password" placeholder="Min. 8 characters" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all active:scale-[0.98]">
                  Create Account →
                </button>
              </form>

              <p className="text-center text-xs text-slate-400 mt-6">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-slate-500 underline">Terms</Link> and{' '}
                <Link href="/privacy" className="text-slate-500 underline">Privacy Policy</Link>.
              </p>

              <div className="text-center mt-6">
                <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-slate-700 font-medium">← Back</button>
              </div>
            </>
          )}

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
