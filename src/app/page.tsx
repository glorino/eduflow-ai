import Link from 'next/link';

const features = [
  {
    icon: '🤖',
    title: '10 AI Agents',
    description: 'Autonomous agents handle admissions, attendance, finance, and more — reducing staff workload by 60%.',
    gradient: 'from-blue-500 to-blue-600',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: '🏫',
    title: 'Multi-Campus',
    description: 'Manage unlimited campuses from a single dashboard with cross-campus analytics.',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/20',
  },
  {
    icon: '📅',
    title: 'Multi-Term',
    description: 'Flexible academic calendar supporting terms, sessions, and custom grading periods.',
    gradient: 'from-emerald-500 to-emerald-600',
    glow: 'shadow-emerald-500/20',
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description: 'Native mobile apps for parents, students, and teachers with offline support.',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/20',
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Live dashboards, predictive analytics, and AI-powered insights for decisions.',
    gradient: 'from-rose-500 to-pink-500',
    glow: 'shadow-rose-500/20',
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'SOC2-ready with RBAC, audit logging, encryption at rest, and tenant isolation.',
    gradient: 'from-cyan-500 to-teal-500',
    glow: 'shadow-cyan-500/20',
  },
];

const modules = [
  { icon: '📝', name: 'Admissions' },
  { icon: '📊', name: 'Academics' },
  { icon: '💻', name: 'CBT' },
  { icon: '📋', name: 'Attendance' },
  { icon: '💰', name: 'Finance' },
  { icon: '📖', name: 'Library' },
  { icon: '🏠', name: 'Hostel' },
  { icon: '🚌', name: 'Transport' },
  { icon: '📦', name: 'Inventory' },
  { icon: '👨‍👩‍👧', name: 'Parents' },
  { icon: '👩‍🏫', name: 'Teachers' },
  { icon: '🎓', name: 'Alumni' },
];

const stats = [
  { value: '5,000+', label: 'Schools', icon: '🏫' },
  { value: '5M+', label: 'Students', icon: '🎓' },
  { value: '10', label: 'AI Agents', icon: '🤖' },
  { value: '99.9%', label: 'Uptime', icon: '⚡' },
];

const testimonials = [
  {
    quote: 'EduFlow AI transformed how we manage 3 campuses. The AI agents handle 70% of administrative work.',
    name: 'Dr. Adebayo Johnson',
    role: 'Principal, Lagos Model Schools',
    initials: 'DJ',
    rating: 5,
  },
  {
    quote: 'The CBT module alone saved us ₦2M annually in exam materials. Parents love the mobile app.',
    name: 'Mrs. Fatima Al-Hassan',
    role: 'Head of School, Unity Academy',
    initials: 'FA',
    rating: 5,
  },
  {
    quote: 'Multi-term support and the finance module gave us visibility we never had before. Game changer.',
    name: 'Mr. Chukwuemeka Obi',
    role: 'Director, Crown International Schools',
    initials: 'CO',
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '₦150,000',
    period: '/year',
    description: 'For single-campus schools',
    features: ['1 Campus', 'Up to 500 Students', '5 AI Agents', 'Basic Analytics', 'Email Support'],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₦450,000',
    period: '/year',
    description: 'For growing multi-campus schools',
    features: ['Up to 5 Campuses', 'Up to 5,000 Students', '10 AI Agents', 'Advanced Analytics', 'Priority Support', 'Mobile Apps', 'API Access'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large school networks',
    features: ['Unlimited Campuses', 'Unlimited Students', '10 AI Agents + Custom', 'White-label', 'Dedicated Support', 'Custom Integrations', 'SLA Guarantee'],
    cta: 'Contact Sales',
    popular: false,
  },
];

const steps = [
  { step: '01', title: 'Sign Up', description: 'Create your school account in 2 minutes' },
  { step: '02', title: 'Configure', description: 'Set up campuses, classes, and fee structures' },
  { step: '03', title: 'Import', description: 'Bulk import students, teachers, and data' },
  { step: '04', title: 'Go Live', description: 'Start using AI agents and all 13 modules' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">EduFlow AI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#modules" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Modules</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Testimonials</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2">Login</Link>
              <Link href="/register" className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-[0.98]">Get Started Free</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-floatSlow" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-cyan-400/8 rounded-full blur-3xl animate-floatSlow" style={{ animationDelay: '4s' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur border border-blue-100 rounded-full px-5 py-2 mb-8 animate-fadeInUp">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-dotPulse" />
              <span className="text-sm font-medium text-blue-700">Now serving 5,000+ schools across Nigeria</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-8 animate-fadeInUp stagger-1">
              The AI-Powered
              <br />
              <span className="text-gradient animate-gradientShift">
                School Operating System
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-fadeInUp stagger-2">
              Enterprise Education ERP for Nursery, Primary, Secondary & Colleges.
              10 AI agents automate your workflows — so your staff focuses on teaching.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fadeInUp stagger-3">
              <Link href="/register" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-[0.98] glow-blue">
                Start Free Trial →
              </Link>
              <Link href="/login" className="w-full sm:w-auto border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all">
                View Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fadeInUp stagger-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">{stat.icon}</span>
                  <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* School Levels */}
      <section className="py-16 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">Built for Every Level</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {[
              { icon: '🎓', label: 'Nursery', desc: 'Early childhood', gradient: 'from-pink-500 to-rose-500' },
              { icon: '📚', label: 'Primary', desc: 'Foundation years', gradient: 'from-blue-500 to-blue-600' },
              { icon: '🏫', label: 'Secondary', desc: 'Senior education', gradient: 'from-violet-500 to-purple-600' },
              { icon: '🏛️', label: 'College', desc: 'Higher learning', gradient: 'from-emerald-500 to-emerald-600' },
            ].map((level, i) => (
              <div key={level.label} className={`bg-white rounded-2xl p-6 text-center border border-slate-200/80 hover:border-transparent hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer group animate-fadeInUp stagger-${i + 1}`}>
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg`}>
                  {level.icon}
                </div>
                <div className="font-bold text-slate-900 text-lg">{level.label}</div>
                <div className="text-sm text-slate-500 mt-1">{level.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-blue-600" /> Features <span className="w-8 h-px bg-blue-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Everything you need to run
              <br />
              <span className="text-gradient">a world-class school</span>
            </h2>
            <p className="text-lg text-slate-500 mt-5 max-w-2xl mx-auto leading-relaxed">
              From AI-powered admissions to real-time analytics, EduFlow AI covers every aspect of school management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={feature.title} className={`group bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer animate-fadeInUp stagger-${i + 1}`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg ${feature.glow}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4 block">How It Works</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              Up and running in <span className="text-gradient">4 simple steps</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < steps.length - 1 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-transparent" />}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xl font-bold mb-5 shadow-lg shadow-blue-500/30">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                <p className="text-sm text-white/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-blue-600" /> Modules <span className="w-8 h-px bg-blue-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight">13 integrated modules</h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">Each module is powered by AI agents that learn from your data.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modules.map((mod, i) => (
              <div key={mod.name} className={`bg-white rounded-2xl border border-slate-200/80 p-6 text-center hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all cursor-pointer group animate-fadeInUp stagger-${(i % 8) + 1}`}>
                <span className="text-4xl block mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform">{mod.icon}</span>
                <div className="font-bold text-slate-900">{mod.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-blue-600" /> Testimonials <span className="w-8 h-px bg-blue-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight">Trusted by school leaders</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`bg-white rounded-2xl border border-slate-200/80 p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 animate-fadeInUp stagger-${i + 1}`}>
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20">
                    {t.initials}
                  </div>
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

      {/* Pricing */}
      <section id="pricing" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-blue-600" /> Pricing <span className="w-8 h-px bg-blue-600" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">Start free for 30 days. No credit card required.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`relative bg-white rounded-3xl border p-8 transition-all duration-300 ${plan.popular ? 'border-blue-500 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500 scale-[1.02]' : 'border-slate-200/80 hover:shadow-xl'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
                <div className="mt-6 mb-8">
                  <span className="text-5xl font-extrabold text-slate-900 tracking-tight">{plan.price}</span>
                  <span className="text-slate-500 font-medium">{plan.period}</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-600 text-xs">✓</span>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block w-full text-center py-3.5 rounded-2xl font-semibold transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl glow-blue' : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'}`}>
                  {plan.cta}
                </Link>
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
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
                Ready to transform your school?
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
                Join 5,000+ schools already using EduFlow AI. Start your free 30-day trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="w-full sm:w-auto bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-2xl">
                  Start Free Trial →
                </Link>
                <Link href="/login" className="w-full sm:w-auto border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-colors">
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">E</span>
                </div>
                <span className="font-bold">EduFlow AI</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Enterprise Education ERP for the modern school.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#modules" className="hover:text-white transition-colors">Modules</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">&copy; 2026 EduFlow AI. Built for 5,000 schools and 5 million students.</p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>Made in Nigeria 🇳🇬</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
