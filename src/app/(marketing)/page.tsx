import Link from 'next/link';
import { HeroIllustration, DashboardPreview, AIBrainIllustration, StatsInfographic, WorkflowIllustration } from '@/components/marketing/illustrations';

const features = [
  { icon: '🤖', title: '10 AI Agents', description: 'Autonomous agents handle admissions, attendance, finance, and more.', gradient: 'from-blue-500 to-blue-600' },
  { icon: '🏫', title: 'Multi-Campus', description: 'Manage unlimited campuses from a single dashboard.', gradient: 'from-violet-500 to-purple-600' },
  { icon: '📱', title: 'Mobile First', description: 'Native apps for parents, students, and teachers.', gradient: 'from-amber-500 to-orange-500' },
  { icon: '📊', title: 'Real-time Analytics', description: 'Live dashboards and AI-powered insights.', gradient: 'from-rose-500 to-pink-500' },
];

const testimonials = [
  { quote: 'EduFlow AI transformed how we manage 3 campuses. AI agents handle 70% of admin work.', name: 'Dr. Adebayo Johnson', role: 'Principal, Lagos Model Schools', initials: 'DJ' },
  { quote: 'The CBT module saved us ₦2M annually. Parents love the mobile app.', name: 'Mrs. Fatima Al-Hassan', role: 'Head of School, Unity Academy', initials: 'FA' },
  { quote: 'Multi-term support gave us visibility we never had before. Game changer.', name: 'Mr. Chukwuemeka Obi', role: 'Director, Crown International', initials: 'CO' },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-floatSlow" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur border border-blue-100 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-dotPulse" />
                <span className="text-sm font-medium text-blue-700">Now serving 5,000+ schools</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
                The AI-Powered
                <br />
                <span className="text-gradient animate-gradientShift">School Operating System</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-lg mb-8 leading-relaxed">
                Enterprise Education ERP for Nursery, Primary, Secondary & Colleges. 10 AI agents automate your workflows.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href="/register" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-2xl transition-all active:scale-[0.97] glow-blue text-center">
                  Start Free Trial →
                </Link>
                <Link href="/features" className="border border-slate-200 text-slate-700 px-7 py-3.5 rounded-2xl font-bold text-base hover:bg-slate-50 hover:shadow-md transition-all text-center">
                  Explore Features
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['DJ', 'FA', 'CO', 'SA', 'TO'].map((n, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm">{n}</div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">5,000+ Schools</div>
                  <div className="text-xs text-slate-500">trust EduFlow AI</div>
                </div>
              </div>
            </div>
            <div className="animate-fadeInUp stagger-2">
              <DashboardPreview className="w-full h-auto drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Infographic */}
      <section className="py-12 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <StatsInfographic className="w-full h-auto" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-blue-600" /> Features <span className="w-8 h-px bg-blue-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Everything you need,<br /><span className="text-gradient">nothing you don&apos;t</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`group bg-white rounded-2xl border border-slate-200/80 p-7 hover:border-transparent hover:shadow-xl transition-all duration-300 animate-fadeInUp stagger-${i + 1}`}>
                <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/features" className="text-sm font-bold text-blue-600 hover:text-blue-700">View All Features →</Link>
          </div>
        </div>
      </section>

      {/* AI Brain Section */}
      <section className="py-24 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fadeInUp">
              <AIBrainIllustration className="w-full max-w-md mx-auto h-auto" />
            </div>
            <div className="animate-fadeInUp stagger-2">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-blue-600" /> AI-Powered
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
                10 AI agents working<br />around the clock
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Our AI agents learn from your school&apos;s data to automate routine tasks, predict risks, and provide actionable insights — so your staff can focus on what matters.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['📝 Admission', '📊 Academic', '💰 Finance', '📋 Attendance', '💻 CBT', '📖 Library'].map(a => (
                  <div key={a} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-dotPulse" />
                    {a}
                  </div>
                ))}
              </div>
              <Link href="/features" className="inline-flex mt-8 text-sm font-bold text-blue-600 hover:text-blue-700">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-blue-600" /> How It Works <span className="w-8 h-px bg-blue-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Up and running in <span className="text-gradient">4 simple steps</span>
            </h2>
          </div>
          <WorkflowIllustration className="w-full max-w-4xl mx-auto h-auto" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-blue-600" /> Testimonials <span className="w-8 h-px bg-blue-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Trusted by school leaders</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`bg-white rounded-2xl border border-slate-200/80 p-8 hover:shadow-xl transition-all duration-300 animate-fadeInUp stagger-${i + 1}`}>
                <div className="flex gap-1 mb-5">{[...Array(5)].map((_, j) => <span key={j} className="text-amber-400 text-lg">★</span>)}</div>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20">{t.initials}</div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-violet-700 rounded-[2rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 mesh-bg opacity-20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">Ready to transform your school?</h2>
              <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">Join 5,000+ schools already using EduFlow AI. Free 30-day trial.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="w-full sm:w-auto bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-2xl">Start Free Trial →</Link>
                <Link href="/contact" className="w-full sm:w-auto border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors">Schedule Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
