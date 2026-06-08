import Link from 'next/link';
import { HeroIllustration, DashboardPreview, AIBrainIllustration, StatsInfographic, WorkflowIllustration } from '@/components/marketing/illustrations';

const features = [
  { icon: '🤖', title: '10 AI Agents', description: 'Autonomous agents handle admissions, attendance, finance, and more.', gradient: 'card-gradient-blue' },
  { icon: '🏫', title: 'Multi-Campus', description: 'Manage unlimited campuses from a single dashboard.', gradient: 'card-gradient-violet' },
  { icon: '📱', title: 'Mobile First', description: 'Native apps for parents, students, and teachers.', gradient: 'card-gradient-amber' },
  { icon: '📊', title: 'Real-time Analytics', description: 'Live dashboards and AI-powered insights.', gradient: 'card-gradient-emerald' },
];

const aiAgents = [
  { name: 'Admission', icon: '📝', color: 'from-blue-500 to-blue-600' },
  { name: 'Academic', icon: '📊', color: 'from-violet-500 to-purple-600' },
  { name: 'Finance', icon: '💰', color: 'from-emerald-500 to-teal-600' },
  { name: 'Attendance', icon: '📋', color: 'from-amber-500 to-orange-500' },
  { name: 'CBT', icon: '💻', color: 'from-rose-500 to-pink-500' },
  { name: 'Library', icon: '📖', color: 'from-cyan-500 to-blue-500' },
  { name: 'Parents', icon: '👨‍👩‍👧', color: 'from-pink-500 to-rose-500' },
  { name: 'Discipline', icon: '⚖️', color: 'from-indigo-500 to-blue-600' },
  { name: 'Alumni', icon: '🎓', color: 'from-teal-500 to-emerald-500' },
  { name: 'Reports', icon: '📈', color: 'from-orange-500 to-amber-500' },
];

const stats = [
  { value: '5,000+', label: 'Schools', color: 'text-blue-600', bg: 'bg-blue-50' },
  { value: '5M+', label: 'Students', color: 'text-violet-600', bg: 'bg-violet-50' },
  { value: '99.9%', label: 'Uptime', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { value: '13', label: 'Modules', color: 'text-amber-600', bg: 'bg-amber-50' },
];

const testimonials = [
  { quote: 'EduFlow AI transformed how we manage 3 campuses. AI agents handle 70% of admin work.', name: 'Dr. Adebayo Johnson', role: 'Principal, Lagos Model Schools', initials: 'DJ', gradient: 'from-blue-500 to-violet-500' },
  { quote: 'The CBT module saved us ₦2M annually. Parents love the mobile app.', name: 'Mrs. Fatima Al-Hassan', role: 'Head of School, Unity Academy', initials: 'FA', gradient: 'from-emerald-500 to-teal-500' },
  { quote: 'Multi-term support gave us visibility we never had before. Game changer.', name: 'Mr. Chukwuemeka Obi', role: 'Director, Crown International', initials: 'CO', gradient: 'from-amber-500 to-orange-500' },
];

const pricing = [
  { name: 'Starter', price: '₦150K', period: '/year', description: 'Single campus, up to 500 students', color: 'from-blue-500 to-blue-600', features: ['1 Campus', '500 Students', '5 AI Agents', 'All 13 Modules'] },
  { name: 'Professional', price: '₦450K', period: '/year', description: 'Multi-campus, up to 5,000 students', color: 'from-violet-500 to-purple-600', features: ['5 Campuses', '5,000 Students', '10 AI Agents', 'Mobile Apps'], popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', description: 'Unlimited everything, white-label', color: 'from-emerald-500 to-teal-600', features: ['Unlimited', 'Unlimited Students', 'Custom Agents', 'Full API'] },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-floatSlow" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '4s' }} />

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

      {/* Stats Bar */}
      <section className="py-12 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-5 text-center animate-fadeInUp stagger-${i + 1}`}>
                <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-sm text-slate-600 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid — Colorful Cards */}
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
              <div key={f.title} className={`${f.gradient} p-7 hover:-translate-y-2 transition-all duration-300 animate-fadeInUp stagger-${i + 1} cursor-default`}>
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl mb-5 shadow-lg">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/features" className="text-sm font-bold text-blue-600 hover:text-blue-700">View All Features →</Link>
          </div>
        </div>
      </section>

      {/* AI Brain Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-blue-400" /> AI-Powered <span className="w-8 h-px bg-blue-400" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">10 AI Agents</h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto">Each agent specializes in one area of school management, working around the clock.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {aiAgents.map((agent, i) => (
              <div key={agent.name} className={`bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 animate-fadeInUp stagger-${Math.min(i + 1, 6)} cursor-default group`}>
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl mb-3 shadow-lg group-hover:scale-110 transition-transform`}>{agent.icon}</div>
                <div className="text-sm font-bold">{agent.name}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/features" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
              Meet all agents →
            </Link>
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
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your free account in 2 minutes.', color: 'from-blue-500 to-blue-600', icon: '✍️' },
              { step: '02', title: 'Import Data', desc: 'Upload students, teachers & subjects via CSV.', color: 'from-violet-500 to-purple-600', icon: '📤' },
              { step: '03', title: 'Configure', desc: 'Set up terms, sessions & campus settings.', color: 'from-emerald-500 to-teal-600', icon: '⚙️' },
              { step: '04', title: 'Go Live', desc: 'Start using AI agents on day one.', color: 'from-amber-500 to-orange-500', icon: '🚀' },
            ].map((item, i) => (
              <div key={item.step} className={`relative bg-white rounded-2xl border border-slate-200/80 p-7 hover:shadow-xl hover:border-transparent transition-all duration-300 animate-fadeInUp stagger-${i + 1}`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl text-white mb-5 shadow-lg`}>{item.icon}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Step {item.step}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
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
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>{t.initials}</div>
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

      {/* Pricing Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-blue-600" /> Pricing <span className="w-8 h-px bg-blue-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Simple, transparent <span className="text-gradient">pricing</span>
            </h2>
            <p className="text-lg text-slate-500 mt-3">Start free for 30 days. No credit card required.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((plan, i) => (
              <div key={plan.name} className={`relative rounded-2xl p-7 transition-all duration-300 animate-fadeInUp stagger-${i + 1} ${plan.popular ? 'bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-2xl shadow-violet-500/25 scale-[1.02]' : 'bg-white border border-slate-200/80 hover:shadow-xl'}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-violet-700 text-xs font-bold px-4 py-1 rounded-full shadow-lg">Most Popular</div>}
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-white/70' : 'text-slate-500'}`}>{plan.description}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-extrabold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-slate-500'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${plan.popular ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600'}`}>✓</span>
                      <span className={plan.popular ? 'text-white/90' : 'text-slate-700'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-white text-violet-700 hover:bg-white/90 shadow-lg' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'}`}>
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-sm font-bold text-blue-600 hover:text-blue-700">View Full Pricing Comparison →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-700 rounded-[2rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 mesh-bg opacity-20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
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
