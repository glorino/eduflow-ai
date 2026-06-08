'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-blue-600" /> Contact Us
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                Let&apos;s talk about<br /><span className="text-gradient">your school</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-10">
                Whether you&apos;re ready to get started or just have questions, we&apos;d love to hear from you. Our team typically responds within 2 hours.
              </p>

              {/* Contact Info — Colorful Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '📧', label: 'Email', value: 'hello@eduflow.ai', href: 'mailto:hello@eduflow.ai', color: 'card-gradient-blue' },
                  { icon: '📱', label: 'Phone', value: '+234 801 234 5678', href: 'tel:+2348012345678', color: 'card-gradient-violet' },
                  { icon: '📍', label: 'Office', value: 'Victoria Island, Lagos', color: 'card-gradient-emerald' },
                  { icon: '💬', label: 'WhatsApp', value: 'Chat with us', href: '#', color: 'card-gradient-amber' },
                ].map((item) => (
                  <div key={item.label} className={`${item.color} p-5`}>
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-semibold text-white hover:text-white/80 transition-colors">{item.value}</a>
                    ) : (
                      <div className="text-sm font-semibold text-white">{item.value}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Response time */}
              <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl p-5 border border-blue-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm shadow-lg">⚡</div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Average Response Time</div>
                    <div className="text-xs text-slate-500">Usually within 2 hours during business hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl shadow-slate-200/30">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-4xl mb-5 shadow-lg shadow-emerald-500/25">✓</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500">We&apos;ll get back to you within 2 hours. Check your email.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Send us a message</h3>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name <span className="text-rose-500">*</span></label>
                        <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name <span className="text-rose-500">*</span></label>
                        <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-rose-500">*</span></label>
                      <input type="email" required placeholder="you@school.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">School Name</label>
                      <input placeholder="e.g. Lagos Model School" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">I&apos;m interested in</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-600">
                        <option>Starting a free trial</option>
                        <option>Scheduling a demo</option>
                        <option>Enterprise plan</option>
                        <option>Partnership</option>
                        <option>General inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Message <span className="text-rose-500">*</span></label>
                      <textarea rows={4} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:text-slate-400" placeholder="Tell us about your school..." />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all active:scale-[0.98]">
                      Send Message →
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl h-64 flex items-center justify-center border border-slate-700 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
            </div>
            <div className="relative text-center">
              <span className="text-4xl mb-3 block">🗺️</span>
              <p className="text-sm text-slate-400 font-medium">12 Education Road, Victoria Island, Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
