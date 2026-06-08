import Link from 'next/link';

const team = [
  { name: 'Glorino', role: 'Founder & CEO', initials: 'GL', gradient: 'from-blue-500 to-violet-500' },
  { name: 'Adaeze Okolo', role: 'CTO', initials: 'AO', gradient: 'from-emerald-500 to-cyan-500' },
  { name: 'Tunde Balogun', role: 'Head of Product', initials: 'TB', gradient: 'from-amber-500 to-orange-500' },
  { name: 'Fatima Al-Hassan', role: 'Head of AI', initials: 'FA', gradient: 'from-rose-500 to-pink-500' },
  { name: 'Chidi Nwosu', role: 'Head of Design', initials: 'CN', gradient: 'from-violet-500 to-purple-500' },
  { name: 'Yusuf Abdullahi', role: 'Head of Engineering', initials: 'YA', gradient: 'from-cyan-500 to-blue-500' },
];

const values = [
  { icon: '🎯', title: 'Mission-Driven', desc: 'We believe every child deserves access to quality education, and great tools make it possible.', color: 'card-gradient-blue' },
  { icon: '🤝', title: 'School-First', desc: 'Everything we build starts with a conversation with school administrators and teachers.', color: 'card-gradient-violet' },
  { icon: '🚀', title: 'Innovation', desc: 'We push boundaries with AI to solve real problems schools face every day.', color: 'card-gradient-amber' },
  { icon: '🛡️', title: 'Trust & Security', desc: 'We treat student data with the same care as banks treat financial data.', color: 'card-gradient-emerald' },
  { icon: '🌍', title: 'African Focus', desc: 'Built in Nigeria, for Africa. We understand the unique challenges of our schools.', color: 'card-gradient-cyan' },
  { icon: '📈', title: 'Continuous Growth', desc: 'We ship updates weekly and continuously improve based on user feedback.', color: 'card-gradient-sunset' },
];

const milestones = [
  { year: '2024', title: 'Founded', desc: 'EduFlow AI was founded to solve school management challenges.', color: 'from-blue-500 to-blue-600' },
  { year: '2024', title: 'First 100 Schools', desc: 'Reached our first 100 schools within 6 months of launch.', color: 'from-violet-500 to-purple-600' },
  { year: '2025', title: 'AI Agents Launch', desc: 'Launched 10 AI agents for autonomous school management.', color: 'from-emerald-500 to-teal-600' },
  { year: '2025', title: '1,000 Schools', desc: 'Crossed 1,000 schools and 500,000 students on the platform.', color: 'from-amber-500 to-orange-500' },
  { year: '2026', title: '5,000 Schools', desc: 'Now serving 5,000+ schools and 5 million students across Nigeria.', color: 'from-rose-500 to-pink-500' },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-blue-600" /> About Us
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                We&apos;re on a mission to<br /><span className="text-gradient">transform African education</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-6">
                EduFlow AI was born from a simple observation: school administrators spend too much time on paperwork and not enough time on education. We built AI agents to handle the mundane so educators can focus on what matters.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Founded in Lagos, Nigeria, we now serve 5,000+ schools and 5 million students. Our team of educators, engineers, and AI researchers is passionate about building the future of school management.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '5,000+', label: 'Schools', color: 'card-gradient-blue' },
                { value: '5M+', label: 'Students', color: 'card-gradient-violet' },
                { value: '50+', label: 'Team Members', color: 'card-gradient-emerald' },
                { value: '99.9%', label: 'Uptime', color: 'card-gradient-amber' },
              ].map(s => (
                <div key={s.label} className={`${s.color} p-6 text-center`}>
                  <div className="text-3xl font-extrabold">{s.value}</div>
                  <div className="text-sm text-white/70 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-gradient-blue p-8">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl mb-5 shadow-lg">🎯</div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">To empower every school in Africa with intelligent, accessible, and affordable management tools that free educators to focus on teaching.</p>
            </div>
            <div className="card-gradient-violet p-8">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl mb-5 shadow-lg">🔭</div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">To become the operating system for every school in Africa — powering 1 million schools and 100 million students by 2030.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Colorful Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Our Values</h2>
            <p className="text-slate-500 mt-3">The principles that guide everything we build</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className={`${v.color} p-7 hover:-translate-y-1 transition-all duration-300 animate-fadeInUp stagger-${i + 1} cursor-default`}>
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl mb-5 shadow-lg">{v.icon}</div>
                <h4 className="text-lg font-bold mb-2">{v.title}</h4>
                <p className="text-sm text-white/80 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Our Journey</h2>
            <p className="text-white/50 mt-3">Key milestones in our mission to transform education</p>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="relative flex items-start gap-6 pb-10 last:pb-0">
                {i < milestones.length - 1 && <div className="absolute left-6 top-10 w-px h-full bg-white/10" />}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-sm font-bold flex-shrink-0 z-10 shadow-lg`}>
                  {m.year.slice(2)}
                </div>
                <div>
                  <div className="text-xs text-blue-400 font-semibold mb-1">{m.year}</div>
                  <h4 className="text-lg font-bold">{m.title}</h4>
                  <p className="text-sm text-white/50 mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Meet the Team</h2>
            <p className="text-slate-500 mt-3">The people building the future of school management</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((t, i) => (
              <div key={t.name} className={`text-center group animate-fadeInUp stagger-${i + 1}`}>
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xl font-bold mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                  {t.initials}
                </div>
                <div className="text-sm font-bold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-700 rounded-[2rem] p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 mesh-bg opacity-10" />
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-5">Join us on this journey</h2>
              <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto">We&apos;re always looking for passionate people to join our team.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:bg-blue-50 transition-all">Contact Us</Link>
                <a href="#" className="border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">View Careers</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
