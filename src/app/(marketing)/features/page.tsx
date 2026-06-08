import Link from 'next/link';
import { MultiCampusIllustration, AIBrainIllustration, MobileAppIllustration } from '@/components/marketing/illustrations';

const featureGroups = [
  {
    id: 'ai',
    tag: 'Intelligence',
    title: '10 AI Agents that never sleep',
    description: 'Our AI agents work 24/7 to automate your school operations. They learn from your data and get smarter over time.',
    features: [
      { icon: '📝', name: 'Admission Agent', desc: 'Reviews applications, scores candidates, and recommends admissions.' },
      { icon: '📚', name: 'Academic Agent', desc: 'Analyzes performance, predicts risks, generates report cards.' },
      { icon: '📋', name: 'Attendance Agent', desc: 'Monitors patterns, flags risks, sends automated alerts.' },
      { icon: '💰', name: 'Finance Agent', desc: 'Manages invoicing, payments, and revenue forecasting.' },
      { icon: '💻', name: 'CBT Agent', desc: 'Creates exams, grades submissions, builds question banks.' },
      { icon: '👨‍👩‍👧', name: 'Parent Comms Agent', desc: 'Drafts personalized messages and manages engagement.' },
      { icon: '📖', name: 'Library Agent', desc: 'Manages circulation, calculates penalties, recommends books.' },
      { icon: '⚖️', name: 'Discipline Agent', desc: 'Records incidents, analyzes patterns, suggests interventions.' },
      { icon: '🏛️', name: 'Alumni Agent', desc: 'Handles WAEC migration and alumni network management.' },
      { icon: '📈', name: 'Reporting Agent', desc: 'Generates automated reports and predictive analytics.' },
    ],
  },
  {
    id: 'multi',
    tag: 'Scale',
    title: 'Multi-Campus, Multi-Term, Multi-Session',
    description: 'Manage unlimited campuses, academic sessions, and terms from a single centralized dashboard.',
    illustration: 'multiCampus',
  },
  {
    id: 'mobile',
    tag: 'Anywhere',
    title: 'Native mobile apps for everyone',
    description: 'Parents, students, and teachers each get their own mobile experience — attendance, CBT, messaging, and more on the go.',
    illustration: 'mobile',
  },
  {
    id: 'security',
    tag: 'Security',
    title: 'Enterprise-grade security built in',
    description: 'SOC2-ready with role-based access control, audit logging, encryption at rest, and complete tenant isolation.',
    securityFeatures: [
      { icon: '🔐', name: 'Role-Based Access', desc: 'Granular permissions for every user role.' },
      { icon: '📝', name: 'Audit Logging', desc: 'Every action tracked with full audit trail.' },
      { icon: '🔒', name: 'Encryption', desc: 'AES-256 encryption at rest and TLS 1.3 in transit.' },
      { icon: '🏢', name: 'Tenant Isolation', desc: 'Complete data isolation between organizations.' },
      { icon: '🛡️', name: 'SOC2 Ready', desc: 'Compliant with industry security standards.' },
      { icon: '🔑', name: '2FA Support', desc: 'Two-factor authentication for all admin accounts.' },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-blue-600" /> Features <span className="w-8 h-px bg-blue-600" />
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Built for the way<br /><span className="text-gradient">modern schools work</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Every feature is designed with input from school administrators, teachers, and parents across Nigeria.
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      {featureGroups.map((group, gi) => (
        <section key={group.id} className={`py-24 ${gi % 2 === 1 ? 'bg-slate-50/80 border-y border-slate-100' : ''}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${gi % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <div className={gi % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
                  <span className="w-6 h-px bg-blue-600" /> {group.tag}
                </span>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">{group.title}</h2>
                <p className="text-slate-500 leading-relaxed mb-8">{group.description}</p>

                {group.features && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.features.map(f => (
                      <div key={f.name} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all">
                        <span className="text-xl mt-0.5">{f.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{f.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{f.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {group.securityFeatures && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.securityFeatures.map(f => (
                      <div key={f.name} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all">
                        <span className="text-xl mt-0.5">{f.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{f.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{f.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={`${gi % 2 === 1 ? 'lg:order-1' : ''}`}>
                {group.illustration === 'multiCampus' && <MultiCampusIllustration className="w-full h-auto" />}
                {group.illustration === 'mobile' && <MobileAppIllustration className="w-full max-w-xs mx-auto h-auto" />}
                {group.id === 'ai' && <AIBrainIllustration className="w-full max-w-md mx-auto h-auto" />}
                {group.id === 'security' && (
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white">
                    <div className="text-5xl mb-4">🛡️</div>
                    <h3 className="text-xl font-bold mb-2">Bank-Level Security</h3>
                    <p className="text-white/60 text-sm mb-6">Your data is protected with the same security standards used by financial institutions.</p>
                    <div className="space-y-3">
                      {['AES-256 Encryption', 'SOC2 Compliant', 'GDPR Ready', 'Daily Backups', '99.9% Uptime SLA'].map(s => (
                        <div key={s} className="flex items-center gap-2 text-sm text-white/80">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">✓</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-5">Ready to see it in action?</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">Start your free 30-day trial or schedule a personalized demo.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-2xl transition-all">Start Free Trial →</Link>
            <Link href="/contact" className="border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">Schedule Demo</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
