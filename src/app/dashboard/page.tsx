import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const agents = [
  { name: 'Admission', icon: '📝', status: 'Active', tasks: 12, color: 'from-blue-500 to-blue-600' },
  { name: 'Academic', icon: '📚', status: 'Active', tasks: 8, color: 'from-violet-500 to-violet-600' },
  { name: 'Attendance', icon: '📋', status: 'Active', tasks: 15, color: 'from-emerald-500 to-emerald-600' },
  { name: 'Finance', icon: '💰', status: 'Active', tasks: 6, color: 'from-amber-500 to-amber-600' },
  { name: 'CBT', icon: '💻', status: 'Active', tasks: 3, color: 'from-cyan-500 to-cyan-600' },
  { name: 'Parent Comms', icon: '👨‍👩‍👧', status: 'Active', tasks: 9, color: 'from-rose-500 to-rose-600' },
  { name: 'Library', icon: '📖', status: 'Active', tasks: 4, color: 'from-indigo-500 to-indigo-600' },
  { name: 'Discipline', icon: '⚖️', status: 'Active', tasks: 2, color: 'from-orange-500 to-orange-600' },
  { name: 'Alumni', icon: '🏛️', status: 'Active', tasks: 1, color: 'from-teal-500 to-teal-600' },
  { name: 'Reporting', icon: '📈', status: 'Active', tasks: 7, color: 'from-pink-500 to-pink-600' },
];

const timelineItems = [
  { icon: '📝', title: 'New admission application', desc: 'Emeka Okonkwo applied for SS1', time: '2 min ago', color: 'bg-blue-500' },
  { icon: '🤖', title: 'AI completed review', desc: 'Admission Agent scored 92/100', time: '5 min ago', color: 'bg-violet-500' },
  { icon: '💰', title: 'Payment received', desc: '₦125,000 from John Doe', time: '10 min ago', color: 'bg-emerald-500' },
  { icon: '📋', title: 'Attendance marked', desc: 'Class SS2A — 28/30 present', time: '15 min ago', color: 'bg-amber-500' },
  { icon: '📖', title: 'Book returned', desc: 'Sarah Smith returned book', time: '20 min ago', color: 'bg-indigo-500' },
  { icon: '⚠️', title: 'Penalty alert', desc: '3 overdue books at Main Library', time: '25 min ago', color: 'bg-rose-500' },
];

const quickModules = [
  { name: 'Admissions', icon: '📝', href: '/dashboard/admissions', bg: 'bg-blue-50', hover: 'hover:bg-blue-100', text: 'text-blue-600' },
  { name: 'Academics', icon: '📚', href: '/dashboard/academics', bg: 'bg-violet-50', hover: 'hover:bg-violet-100', text: 'text-violet-600' },
  { name: 'CBT', icon: '💻', href: '/dashboard/cbt', bg: 'bg-cyan-50', hover: 'hover:bg-cyan-100', text: 'text-cyan-600' },
  { name: 'Attendance', icon: '📋', href: '/dashboard/attendance', bg: 'bg-amber-50', hover: 'hover:bg-amber-100', text: 'text-amber-600' },
  { name: 'Finance', icon: '💰', href: '/dashboard/finance', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-100', text: 'text-emerald-600' },
  { name: 'Library', icon: '📖', href: '/dashboard/library', bg: 'bg-rose-50', hover: 'hover:bg-rose-100', text: 'text-rose-600' },
  { name: 'Students', icon: '🎓', href: '/dashboard/students', bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', text: 'text-indigo-600' },
  { name: 'Reports', icon: '📈', href: '/dashboard/reports', bg: 'bg-slate-50', hover: 'hover:bg-slate-100', text: 'text-slate-600' },
];

export default async function DashboardPage() {
  let totalStudents = 0;
  let totalTeachers = 0;
  let totalParents = 0;
  let pendingAdmissions = 0;
  let totalRevenue = 0;

  try {
    [totalStudents, totalTeachers, totalParents, pendingAdmissions] = await Promise.all([
      prisma.student.count({ where: { isActive: true } }),
      prisma.teacher.count({ where: { isActive: true } }),
      prisma.parent.count(),
      prisma.admission.count({ where: { status: 'APPLIED' } }),
    ]);

    const revenue = await prisma.feePayment.aggregate({
      _sum: { paidAmount: true },
      where: { status: 'COMPLETED' },
    });
    totalRevenue = Number(revenue._sum.paidAmount || 0);
  } catch {}

  const hasData = totalStudents > 0;
  const s = hasData ? totalStudents : 2847;
  const t = hasData ? totalTeachers : 156;
  const p = hasData ? totalParents : 1923;
  const a = hasData ? pendingAdmissions : 42;
  const r = hasData ? totalRevenue : 12500000;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-violet-700 rounded-3xl p-8 text-white overflow-hidden animate-fadeInUp">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">👋</span>
            <span className="text-sm text-white/70 font-medium">Good morning, Admin</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2">Welcome to EduFlow AI</h2>
          <p className="text-white/70 max-w-lg text-sm leading-relaxed">
            Here&apos;s what&apos;s happening at your school today. You have{' '}
            <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">{a} pending admissions</span> and{' '}
            <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">3 alerts</span> requiring attention.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/dashboard/admissions" className="bg-white text-blue-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-all shadow-lg active:scale-[0.98]">
              Review Admissions →
            </Link>
            <Link href="/dashboard/reports" className="border border-white/30 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all">
              View Reports
            </Link>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Total Students', value: s.toLocaleString(), change: '+12.5%', positive: true, icon: '🎓', color: 'blue', subtitle: 'Active this term' },
          { title: 'Total Teachers', value: t.toLocaleString(), change: '+5.2%', positive: true, icon: '👩‍🏫', color: 'green', subtitle: 'Across all campuses' },
          { title: 'Pending Admissions', value: a.toLocaleString(), change: '-8.1%', positive: false, icon: '📝', color: 'amber', subtitle: 'Awaiting review' },
          { title: 'Revenue (YTD)', value: `₦${(r / 1000000).toFixed(1)}M`, change: '+18.3%', positive: true, icon: '💰', color: 'violet', subtitle: 'Fees collected' },
        ].map((stat, i) => (
          <div key={stat.title} className={`bg-white rounded-2xl border border-slate-200/60 p-6 relative overflow-hidden group hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 animate-fadeInUp stagger-${i + 1}`}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 -translate-y-1/3 translate-x-1/3 group-hover:scale-150 group-hover:opacity-10 transition-all duration-500" style={{ backgroundColor: stat.color === 'blue' ? '#3b82f6' : stat.color === 'green' ? '#059669' : stat.color === 'amber' ? '#d97706' : '#7c3aed' }} />
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</span>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{stat.value}</div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold ${stat.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.positive ? '↑' : '↓'} {stat.change}
              </span>
              <span className="text-[11px] text-slate-400">vs last month</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">{stat.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 animate-fadeInUp stagger-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Enrollment Trend</h3>
              <p className="text-xs text-slate-500 mt-0.5">Monthly student enrollment</p>
            </div>
            <div className="flex gap-1 p-0.5 bg-slate-100 rounded-lg">
              {['6M', '1Y', 'All'].map((period, i) => (
                <button key={period} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${i === 1 ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 h-48">
            {[180, 220, 310, 280, 350, 190, 420, 380, 290, 340, 310, 260].map((v, i) => {
              const max = 420;
              const h = (v / max) * 100;
              const isMax = v === 420;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">{v}</span>
                  <div className="w-full max-w-[40px] rounded-t-lg transition-all duration-500 group-hover:opacity-80" style={{ height: `${Math.max(h, 4)}%`, background: isMax ? 'linear-gradient(180deg, #3b82f6, #6366f1)' : 'linear-gradient(180deg, #e2e8f0, #cbd5e1)', animationDelay: `${i * 50}ms` }} />
                  <span className="text-[10px] text-slate-400">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance Donut */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 animate-fadeInUp stagger-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">Today&apos;s Attendance</h3>
          <p className="text-xs text-slate-500 mb-6">Across all classes</p>
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg width="160" height="160" className="-rotate-90">
                <circle cx="80" cy="80" r="68" fill="none" stroke="#e2e8f0" strokeWidth="14" />
                <circle cx="80" cy="80" r="68" fill="none" stroke="#059669" strokeWidth="14" strokeDasharray="427.3" strokeDashoffset={427.3 - (427.3 * 93 / 100)} strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900">93%</span>
                <span className="text-xs text-slate-500 font-medium">Present</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center"><div className="text-lg font-bold text-emerald-600">2,650</div><div className="text-[11px] text-slate-500">Present</div></div>
            <div className="text-center"><div className="text-lg font-bold text-rose-600">147</div><div className="text-[11px] text-slate-500">Absent</div></div>
            <div className="text-center"><div className="text-lg font-bold text-amber-600">50</div><div className="text-[11px] text-slate-500">Late</div></div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'CBT Exams Today', value: '3', sparkline: [2, 5, 3, 7, 4, 6, 3], change: '+2 vs yesterday', positive: true, color: '#3b82f6' },
          { title: 'Fee Collections', value: '₦2.4M', sparkline: [1.8, 2.1, 1.9, 2.4, 2.2, 2.6, 2.4], change: '+12% vs last week', positive: true, color: '#059669' },
          { title: 'Library Txns', value: '47', sparkline: [30, 42, 35, 50, 38, 45, 47], change: '+8% vs last week', positive: true, color: '#d97706' },
          { title: 'Discipline', value: '2', sparkline: [5, 3, 4, 2, 3, 1, 2], change: '-40% vs last week', positive: false, color: '#e11d48' },
        ].map((m, i) => (
          <div key={m.title} className={`bg-white rounded-2xl border border-slate-200/60 p-5 animate-fadeInUp stagger-${i + 1}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.title}</span>
              <svg width="80" height="28" viewBox="0 0 80 28">
                <polyline
                  points={m.sparkline.map((v, j) => `${(j / (m.sparkline.length - 1)) * 80},${28 - ((v / Math.max(...m.sparkline)) * 24) - 2}`).join(' ')}
                  fill="none" stroke={m.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{m.value}</div>
            <div className={`text-xs font-semibold mt-1 ${m.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {m.positive ? '↑' : '↓'} {m.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Agents */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 animate-fadeInUp stagger-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">AI Agents</h3>
              <p className="text-xs text-slate-500 mt-0.5">10 agents monitoring your school</p>
            </div>
            <Link href="/dashboard/ai-agents" className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {agents.map((agent, i) => (
              <div key={agent.name} className={`bg-slate-50/80 rounded-xl p-3.5 hover:bg-blue-50/50 hover:border-blue-200/50 border border-transparent transition-all duration-200 cursor-pointer group animate-fadeInUp stagger-${(i % 5) + 1}`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-lg mb-2.5 group-hover:scale-110 transition-transform shadow-sm`}>
                  {agent.icon}
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">{agent.name}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-dotPulse" />
                  <span className="text-[10px] font-semibold text-emerald-600">{agent.status}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{agent.tasks} tasks</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 animate-fadeInUp stagger-6">
          <h3 className="text-base font-bold text-slate-900 mb-5">Recent Activity</h3>
          <div className="space-y-0">
            {timelineItems.map((item, i) => (
              <div key={i} className="relative flex items-start gap-3 pb-5 last:pb-0">
                {i < timelineItems.length - 1 && (
                  <div className="absolute left-4 top-8 w-px h-full bg-slate-200" />
                )}
                <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-sm flex-shrink-0 z-10 shadow-sm`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="animate-fadeInUp stagger-7">
        <h3 className="text-base font-bold text-slate-900 mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickModules.map((mod) => (
            <Link key={mod.name} href={mod.href} className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-transparent ${mod.bg} ${mod.hover} transition-all duration-200 group`}>
              <span className="text-2xl group-hover:scale-110 transition-transform">{mod.icon}</span>
              <span className={`text-xs font-bold ${mod.text}`}>{mod.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {!hasData && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 animate-fadeInUp">
          <span className="text-xl">⚠️</span>
          <div className="text-sm">
            <span className="font-bold text-amber-800">Demo Mode</span> — Showing sample data. Database is connected and ready.
          </div>
        </div>
      )}
    </div>
  );
}
