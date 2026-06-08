import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '₦150,000',
    period: '/year',
    description: 'Perfect for single-campus schools getting started with digital management.',
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
  { q: 'Is there a free trial?', a: 'Yes! All plans come with a 30-day free trial. No credit card required.' },
  { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade at any time. We&apos;ll prorate the difference.' },
  { q: 'What payment methods do you accept?', a: 'Bank transfer, card payments, and USSD. For Enterprise, we also accept invoicing.' },
  { q: 'Is my data secure?', a: 'Yes. We use AES-256 encryption, SOC2 compliance, and complete tenant isolation.' },
  { q: 'Do you offer training?', a: 'Yes! Professional and Enterprise plans include onboarding training and documentation.' },
  { q: 'What happens after my trial?', a: 'You can choose a plan or your account will be paused. We never delete your data.' },
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

      {/* Plans */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative bg-white rounded-3xl border p-8 transition-all duration-300 ${plan.popular ? 'border-blue-500 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500 scale-[1.02]' : 'border-slate-200/80 hover:shadow-xl'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-blue-500/30">Most Popular</div>
                )}
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1 mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-slate-900 tracking-tight">{plan.price}</span>
                  <span className="text-slate-500 font-medium">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className={`flex items-center gap-3 text-sm ${f.included ? 'text-slate-700' : 'text-slate-400'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${f.included ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        {f.included ? '✓' : '✕'}
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block w-full text-center py-3.5 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl glow-blue' : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'}`}>
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
              <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-6">
                <h4 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
