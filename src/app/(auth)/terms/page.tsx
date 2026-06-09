import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">← Back to Home</Link>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: January 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">By accessing or using EduFlow AI (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. The Service is operated by EduFlow AI Limited, registered in Nigeria.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
            <p className="text-slate-600 leading-relaxed">EduFlow AI provides a cloud-based school management platform including student information systems, computer-based testing, attendance tracking, finance management, library management, and AI-powered analytics for educational institutions.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. User Accounts</h2>
            <p className="text-slate-600 leading-relaxed">You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use. Each school is responsible for all activity under its account.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Ownership</h2>
            <p className="text-slate-600 leading-relaxed">All data entered into the Service by your institution remains your property. We will not share, sell, or distribute your data to third parties without your explicit consent. You may export your data at any time.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. AI Services</h2>
            <p className="text-slate-600 leading-relaxed">Our AI agents provide automated analysis and recommendations. AI outputs are for informational purposes and should be reviewed by qualified staff before being acted upon. We do not guarantee the accuracy of AI-generated content.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Payment Terms</h2>
            <p className="text-slate-600 leading-relaxed">Paid plans are billed annually in advance. All fees are non-refundable except as required by law. We reserve the right to change pricing with 30 days notice.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">EduFlow AI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Termination</h2>
            <p className="text-slate-600 leading-relaxed">Either party may terminate this agreement with 30 days written notice. We may suspend or terminate your access immediately for violation of these terms.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">We may update these terms from time to time. Material changes will be communicated via email or in-app notification at least 30 days before they take effect.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact</h2>
            <p className="text-slate-600 leading-relaxed">For questions about these Terms, contact us at <a href="mailto:legal@eduflow.ai" className="text-blue-600 hover:text-blue-700">legal@eduflow.ai</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
