import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">← Back to Home</Link>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: January 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed">We collect information you provide directly: account registration details, school information, student records, attendance data, academic records, financial transactions, and communication content. We also collect usage data including device information, IP addresses, and browsing patterns within the Service.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed">We use your information to provide and improve the Service, process transactions, send administrative communications, provide customer support, generate AI-powered insights, and comply with legal obligations. We do not use student data for advertising or marketing purposes.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">We implement AES-256 encryption at rest, TLS 1.3 encryption in transit, SOC2-compliant controls, role-based access control, and regular security audits. We maintain complete tenant isolation between organizations.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Sharing</h2>
            <p className="text-slate-600 leading-relaxed">We do not sell your data. We may share information with service providers who assist in operating the Service (hosting, payment processing), when required by law, or with your explicit consent. All third-party providers are bound by data processing agreements.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Student Data Protection</h2>
            <p className="text-slate-600 leading-relaxed">We comply with applicable student data privacy laws. Student records are treated with the highest level of protection. We do not create student profiles for advertising, and we do not share student data with third-party marketers.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Retention</h2>
            <p className="text-slate-600 leading-relaxed">We retain your data for as long as your account is active or as needed to provide the Service. You may request data export or deletion at any time. Deleted data is purged within 30 days.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed">You have the right to access, correct, export, and delete your personal data. You may also object to or restrict certain processing activities. Contact us at privacy@eduflow.ai to exercise these rights.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Cookies</h2>
            <p className="text-slate-600 leading-relaxed">We use essential cookies for authentication and session management. We do not use third-party advertising cookies. You can manage cookie preferences in your browser settings.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. International Transfers</h2>
            <p className="text-slate-600 leading-relaxed">Your data is stored in secure cloud infrastructure with data centers in the United States and Europe. We ensure appropriate safeguards are in place for international data transfers.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact</h2>
            <p className="text-slate-600 leading-relaxed">For privacy-related inquiries, contact our Data Protection Officer at <a href="mailto:privacy@eduflow.ai" className="text-blue-600 hover:text-blue-700">privacy@eduflow.ai</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
