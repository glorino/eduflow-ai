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

              {/* Contact Info */}
              <div className="space-y-6">
                {[
                  { icon: '📧', label: 'Email', value: 'hello@eduflow.ai', href: 'mailto:hello@eduflow.ai' },
                  { icon: '📱', label: 'Phone', value: '+234 801 234 5678', href: 'tel:+2348012345678' },
                  { icon: '📍', label: 'Office', value: '12 Education Road, Victoria Island, Lagos, Nigeria' },
                  { icon: '💬', label: 'WhatsApp', value: 'Chat with us on WhatsApp', href: '#' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">{item.value}</a>
                      ) : (
                        <div className="text-sm font-semibold text-slate-900">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl shadow-slate-200/30">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center text-4xl mb-5">✓</div>
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
                        <input required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name <span className="text-rose-500">*</span></label>
                        <input required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-rose-500">*</span></label>
                      <input type="email" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">School Name</label>
                      <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">I&apos;m interested in</label>
                      <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                        <option>Starting a free trial</option>
                        <option>Scheduling a demo</option>
                        <option>Enterprise plan</option>
                        <option>Partnership</option>
                        <option>General inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Message <span className="text-rose-500">*</span></label>
                      <textarea rows={4} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" placeholder="Tell us about your school..." />
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
          <div className="bg-slate-800 rounded-2xl h-64 flex items-center justify-center border border-slate-700">
            <div className="text-center">
              <span className="text-4xl">🗺️</span>
              <p className="text-sm text-slate-400 mt-3">12 Education Road, Victoria Island, Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
