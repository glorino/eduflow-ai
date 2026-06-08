import Link from 'next/link';

const features = [
  {
    icon: '🤖',
    title: '10 AI Agents',
    description: 'Autonomous agents handle admissions, attendance, finance, CBT, and more — reducing staff workload by 60%.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: '🏫',
    title: 'Multi-Campus',
    description: 'Manage unlimited campuses from a single dashboard with cross-campus analytics and centralized control.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: '📅',
    title: 'Multi-Term & Session',
    description: 'Flexible academic calendar supporting terms, sessions, and custom grading periods per campus.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description: 'Native mobile apps for parents, students, and teachers — attendance, CBT, and messaging on the go.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Real-time dashboards, predictive analytics, and AI-powered insights for data-driven decisions.',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'SOC2-ready with RBAC, audit logging, encryption at rest, and tenant isolation per organization.',
    color: 'from-cyan-500 to-cyan-600',
  },
];

const modules = [
  { icon: '📝', name: 'Admissions', desc: 'AI-powered review & scoring' },
  { icon: '📊', name: 'Academics', desc: 'Curriculum & performance' },
  { icon: '💻', name: 'CBT', desc: 'Computer-based testing' },
  { icon: '📋', name: 'Attendance', desc: 'Pattern analysis' },
  { icon: '💰', name: 'Finance', desc: 'Fee & invoicing' },
  { icon: '📖', name: 'Library', desc: 'Book & penalty mgmt' },
  { icon: '🏠', name: 'Hostel', desc: 'Accommodation' },
  { icon: '🚌', name: 'Transport', desc: 'Route tracking' },
  { icon: '📦', name: 'Inventory', desc: 'Asset tracking' },
  { icon: '👨‍👩‍👧', name: 'Parents', desc: 'Communication hub' },
  { icon: '👩‍🏫', name: 'Teachers', desc: 'Staff management' },
  { icon: '🎓', name: 'Alumni', desc: 'WAEC migration' },
];

const stats = [
  { value: '5,000+', label: 'Schools' },
  { value: '5M+', label: 'Students' },
  { value: '10', label: 'AI Agents' },
  { value: '99.9%', label: 'Uptime' },
];

const testimonials = [
  {
    quote: 'EduFlow AI transformed how we manage 3 campuses. The AI agents handle 70% of administrative work.',
    name: 'Dr. Adebayo Johnson',
    role: 'Principal, Lagos Model Schools',
    avatar: 'DJ',
  },
  {
    quote: 'The CBT module alone saved us ₦2M annually in exam materials. Parents love the mobile app.',
    name: 'Mrs. Fatima Al-Hassan',
    role: 'Head of School, Unity Academy',
    avatar: 'FA',
  },
  {
    quote: 'Multi-term support and the finance module gave us visibility we never had before. Game changer.',
    name: 'Mr. Chukwuemeka Obi',
    role: 'Director, Crown International Schools',
    avatar: 'CO',
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
    features: ['Up to 5 Campuses', 'Up to 5,000 Students', '10 AI Agents', 'Advanced Analytics', 'Priority Support', 'Mobile Apps'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large school networks',
    features: ['Unlimited Campuses', 'Unlimited Students', '10 AI Agents + Custom', 'White-label Options', 'Dedicated Support', 'API Access', 'Custom Integrations'],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-lg font-bold text-white">E</span>
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
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2">
                Login
              </Link>
              <Link href="/register" className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-r from-blue-400/20 via-violet-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-700">Now serving 5,000+ schools across Nigeria</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              The AI-Powered
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600">
                School Operating System
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Enterprise Education ERP for Nursery, Primary, Secondary & Colleges. 
              10 AI agents automate your workflows — so your staff focuses on what matters: teaching.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.98]">
                Start Free Trial →
              </Link>
              <Link href="/login" className="w-full sm:w-auto border border-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all">
                View Demo
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Levels */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Built for Every Level</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: '🎓', label: 'Nursery', desc: 'Early childhood' },
              { icon: '📚', label: 'Primary', desc: 'Foundation years' },
              { icon: '🏫', label: 'Secondary', desc: 'Senior education' },
              { icon: '🏛️', label: 'College', desc: 'Higher learning' },
            ].map((level) => (
              <div key={level.label} className="bg-white rounded-2xl p-5 text-center border border-slate-200/80 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer">
                <div className="text-4xl mb-3">{level.icon}</div>
                <div className="font-semibold text-slate-900">{level.label}</div>
                <div className="text-sm text-slate-500 mt-0.5">{level.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              Everything you need to run
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">a world-class school</span>
            </h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
              From AI-powered admissions to real-time analytics, EduFlow AI covers every aspect of school management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="group bg-white rounded-2xl border border-slate-200/80 p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Modules</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              13 integrated modules
            </h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
              Each module is powered by AI agents that learn from your data and automate routine tasks.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modules.map((mod) => (
              <div key={mod.name} className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{mod.icon}</div>
                <div className="font-semibold text-slate-900">{mod.name}</div>
                <div className="text-sm text-slate-500 mt-0.5">{mod.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              Trusted by school leaders
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-8 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">
              Start free for 30 days. No credit card required.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`bg-white rounded-2xl border p-8 relative ${plan.popular ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500' : 'border-slate-200/80'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
                <div className="mt-6 mb-8">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className="text-emerald-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                >
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
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-violet-700 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                Ready to transform your school?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join 5,000+ schools already using EduFlow AI. Start your free 30-day trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="w-full sm:w-auto bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg">
                  Start Free Trial →
                </Link>
                <Link href="/login" className="w-full sm:w-auto border border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">E</span>
                </div>
                <span className="font-bold">EduFlow AI</span>
              </div>
              <p className="text-sm text-slate-400">Enterprise Education ERP for the modern school.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#modules" className="hover:text-white transition-colors">Modules</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">&copy; 2026 EduFlow AI. Built for 5,000 schools and 5 million students.</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">Made in Nigeria 🇳🇬</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
