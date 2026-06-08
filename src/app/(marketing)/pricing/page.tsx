import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '₦150,000',
    period: '/year',
    description: 'Perfect for single-campus schools getting started with digital management.',
    color: 'from-blue-500 to-blue-600',
    textColor: 'text-blue-600',
    bgLight: 'bg-blue-50',
    features: [
      { text: '1 Campus', included: true },
      { text: 'Up to 500 Students', included: true },
      { text: '5 AI Agents', included: true },
      { text: 'All 13 Modules', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Email Support', included: true },
      { text: 'Mobile Apps', included: false },
      { text: 'API Access', included: false },
      { text: 'Custom Integrations', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₦450,000',
    period: '/year',
    description: 'For growing schools that need multi-campus support and advanced features.',
    color: 'from-violet-500 to-purple-600',
    textColor: 'text-violet-600',
    bgLight: 'bg-violet-50',
    features: [
      { text: 'Up to 5 Campuses', included: true },
      { text: 'Up to 5,000 Students', included: true },
      { text: '10 AI Agents', included: true },
      { text: 'All 13 Modules', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Mobile Apps', included: true },
      { text: 'API Access', included: true },
      { text: 'Custom Integrations', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large school networks requiring white-label and custom solutions.',
    color: 'from-emerald-500 to-teal-600',
    textColor: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
    features: [
      { text: 'Unlimited Campuses', included: true },
      { text: 'Unlimited Students', included: true },
      { text: '10 AI Agents + Custom', included: true },
      { text: 'All 13 Modules', included: true },
      { text: 'Predictive Analytics', included: true },
      { text: 'Dedicated Support', included: true },
      { text: 'Mobile Apps (White-label)', included: true },
      { text: 'Full API Access', included: true },
      { text: 'Custom Integrations', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes! All plans come with a 30-day free trial. No credit card required.', icon: '🎁' },
  { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade at any time. We&apos;ll prorate the difference.', icon: '🔄' },
  { q: 'What payment methods do you accept?', a: 'Bank transfer, card payments, and USSD. For Enterprise, we also accept invoicing.', icon: '💳' },
  { q: 'Is my data secure?', a: 'Yes. We use AES-256 encryption, SOC2 compliance, and complete tenant isolation.', icon: '🔒' },
  { q: 'Do you offer training?', a: 'Yes! Professional and Enterprise plans include onboarding training and documentation.', icon: '📚' },
  { q: 'What happens after my trial?', a: 'You can choose a plan or your account will be paused. We never delete your data.', icon: '⏰' },
];

export default function PricingPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-blue-600" /> Pricing <span className="w-8 h-px bg-blue-600" />
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Simple, transparent<br /><span className="text-gradient">pricing for every school</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Start free for 30 days. No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Plans — Colorful Cards */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div key={plan.name} className={`relative rounded-3xl p-8 transition-all duration-300 animate-fadeInUp stagger-${i + 1} ${plan.popular ? `bg-gradient-to-br ${plan.color} text-white shadow-2xl shadow-violet-500/25 scale-[1.03]` : 'bg-white border border-slate-200/80 hover:shadow-xl hover:border-slate-300'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-violet-700 text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">Most Popular</div>
                )}
                <div className={`w-12 h-12 rounded-xl ${plan.popular ? 'bg-white/20' : plan.bgLight} flex items-center justify-center text-2xl mb-5 ${plan.popular ? '' : 'shadow-sm'}`}>
                  {i === 0 ? '🚀' : i === 1 ? '⚡' : '🏢'}
                </div>
                <h3 className={`text-xl font-bold ${plan.popular ? '' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`text-sm mt-1 mb-6 ${plan.popular ? 'text-white/70' : 'text-slate-500'}`}>{plan.description}</p>
                <div className="mb-8">
                  <span className={`text-5xl font-extrabold tracking-tight ${plan.popular ? '' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`font-medium ${plan.popular ? 'text-white/60' : 'text-slate-500'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className={`flex items-center gap-3 text-sm ${plan.popular ? (f.included ? 'text-white/90' : 'text-white/40') : (f.included ? 'text-slate-700' : 'text-slate-400')}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${plan.popular ? (f.included ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40') : (f.included ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400')}`}>
                        {f.included ? '✓' : '✕'}
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block w-full text-center py-3.5 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-white text-violet-700 shadow-lg hover:bg-white/90' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md transition-all animate-fadeInUp stagger-${(i % 6) + 1}`}>
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{faq.icon}</span>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
