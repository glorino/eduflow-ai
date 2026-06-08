import prisma from '@/lib/prisma';
import { StatCard } from '@/components/ui';
import { BarChart, DonutChart, MetricCard, Timeline } from '@/components/charts';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const agents = [
  { name: 'Admission', icon: '📝', status: 'Active', tasks: 12 },
  { name: 'Academic', icon: '📚', status: 'Active', tasks: 8 },
  { name: 'Attendance', icon: '📋', status: 'Active', tasks: 15 },
  { name: 'Finance', icon: '💰', status: 'Active', tasks: 6 },
  { name: 'CBT', icon: '💻', status: 'Active', tasks: 3 },
  { name: 'Parent Comms', icon: '👨‍👩‍👧', status: 'Active', tasks: 9 },
  { name: 'Library', icon: '📖', status: 'Active', tasks: 4 },
  { name: 'Discipline', icon: '⚖️', status: 'Active', tasks: 2 },
  { name: 'Alumni', icon: '🏛️', status: 'Active', tasks: 1 },
  { name: 'Reporting', icon: '📈', status: 'Active', tasks: 7 },
];

const timelineItems = [
  { icon: '📝', title: 'New admission application', description: 'Emeka Okonkwo applied for SS1', time: '2 min ago', color: 'blue' as const },
  { icon: '🤖', title: 'AI completed review', description: 'Admission Agent scored 92/100', time: '5 min ago', color: 'violet' as const },
  { icon: '💰', title: 'Payment received', description: '₦125,000 from John Doe (Term 2)', time: '10 min ago', color: 'green' as const },
  { icon: '📋', title: 'Attendance marked', description: 'Class SS2A — 28/30 present', time: '15 min ago', color: 'amber' as const },
  { icon: '📖', title: 'Book returned', description: 'Sarah Smith returned "Mathematics for WAEC"', time: '20 min ago', color: 'blue' as const },
  { icon: '⚠️', title: 'Penalty alert', description: '3 overdue books at Main Library', time: '25 min ago', color: 'rose' as const },
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
  } catch {
    // Database not configured — show demo data
  }

  const hasData = totalStudents > 0;
  const displayStudents = hasData ? totalStudents : 2847;
  const displayTeachers = hasData ? totalTeachers : 156;
  const displayParents = hasData ? totalParents : 1923;
  const displayPending = hasData ? pendingAdmissions : 42;
  const displayRevenue = hasData ? totalRevenue : 12500000;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-violet-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative">
          <h2 className="text-2xl font-bold mb-1 tracking-tight">Good morning, Admin</h2>
          <p className="text-white/70 max-w-lg">
            Here&apos;s what&apos;s happening at your school today. You have{' '}
            <span className="font-semibold text-white">{displayPending} pending admissions</span> and{' '}
            <span className="font-semibold text-white">3 alerts</span> requiring attention.
          </p>
          <div className="flex gap-3 mt-5">
            <Link href="/dashboard/admissions" className="bg-white text-blue-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors shadow-lg">
              Review Admissions →
            </Link>
            <Link href="/dashboard/reports" className="border border-white/30 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">
              View Reports
            </Link>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Students"
          value={displayStudents.toLocaleString()}
          change="+12.5%"
          changeType="positive"
          icon="🎓"
          color="blue"
          subtitle="Active this term"
        />
        <StatCard
          title="Total Teachers"
          value={displayTeachers.toLocaleString()}
          change="+5.2%"
          changeType="positive"
          icon="👩‍🏫"
          color="green"
          subtitle="Across all campuses"
        />
        <StatCard
          title="Pending Admissions"
          value={displayPending.toLocaleString()}
          change="-8.1%"
          changeType="negative"
          icon="📝"
          color="amber"
          subtitle="Awaiting review"
        />
        <StatCard
          title="Revenue (YTD)"
          value={`₦${(displayRevenue / 1000000).toFixed(1)}M`}
          change="+18.3%"
          changeType="positive"
          icon="💰"
          color="violet"
          subtitle="Fees collected"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Enrollment Trend</h3>
              <p className="text-sm text-slate-500 mt-0.5">Monthly student enrollment</p>
            </div>
            <div className="flex gap-2">
              {['6M', '1Y', 'All'].map((period) => (
                <button key={period} className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                  {period}
                </button>
              ))}
            </div>
          </div>
          <BarChart
            data={[
              { label: 'Jul', value: 180 },
              { label: 'Aug', value: 220 },
              { label: 'Sep', value: 310 },
              { label: 'Oct', value: 280 },
              { label: 'Nov', value: 350 },
              { label: 'Dec', value: 190 },
              { label: 'Jan', value: 420 },
              { label: 'Feb', value: 380 },
              { label: 'Mar', value: 290 },
              { label: 'Apr', value: 340 },
              { label: 'May', value: 310 },
              { label: 'Jun', value: 260 },
            ]}
            height={200}
          />
        </div>

        {/* Attendance Donut */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">Today&apos;s Attendance</h3>
          <p className="text-sm text-slate-500 mb-6">Across all classes</p>
          <div className="flex justify-center">
            <DonutChart
              value={2650}
              max={2847}
              size={160}
              strokeWidth={14}
              color="#3b82f6"
              label="93%"
              sublabel="Present"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-600">2,650</div>
              <div className="text-xs text-slate-500">Present</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-rose-600">147</div>
              <div className="text-xs text-slate-500">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-amber-600">50</div>
              <div className="text-xs text-slate-500">Late</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="CBT Exams Today" value={3} sparklineData={[2, 5, 3, 7, 4, 6, 3]} change="2 more than yesterday" changeType="positive" color="#3b82f6" />
        <MetricCard title="Fee Collections" value="₦2.4M" sparklineData={[1.8, 2.1, 1.9, 2.4, 2.2, 2.6, 2.4]} change="+12% vs last week" changeType="positive" color="#059669" />
        <MetricCard title="Library Transactions" value={47} sparklineData={[30, 42, 35, 50, 38, 45, 47]} change="+8% vs last week" changeType="positive" color="#d97706" />
        <MetricCard title="Discipline Incidents" value={2} sparklineData={[5, 3, 4, 2, 3, 1, 2]} change="-40% vs last week" changeType="negative" color="#e11d48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Agents Status */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">AI Agents</h3>
              <p className="text-sm text-slate-500 mt-0.5">10 agents monitoring your school</p>
            </div>
            <Link href="/dashboard/ai-agents" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {agents.map((agent) => (
              <div key={agent.name} className="bg-slate-50 rounded-xl p-3.5 hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all cursor-pointer group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{agent.icon}</div>
                <div className="text-xs font-semibold text-slate-900 truncate">{agent.name}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[11px] font-medium text-emerald-600">{agent.status}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{agent.tasks} tasks today</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-5">Recent Activity</h3>
          <Timeline items={timelineItems} />
        </div>
      </div>

      {/* Quick Access Modules */}
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { name: 'Admissions', icon: '📝', href: '/dashboard/admissions', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
            { name: 'Academics', icon: '📚', href: '/dashboard/academics', color: 'bg-violet-50 hover:bg-violet-100 text-violet-700' },
            { name: 'CBT', icon: '💻', href: '/dashboard/cbt', color: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700' },
            { name: 'Attendance', icon: '📋', href: '/dashboard/attendance', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700' },
            { name: 'Finance', icon: '💰', href: '/dashboard/finance', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' },
            { name: 'Library', icon: '📖', href: '/dashboard/library', color: 'bg-rose-50 hover:bg-rose-100 text-rose-700' },
            { name: 'Students', icon: '🎓', href: '/dashboard/students', color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700' },
            { name: 'Reports', icon: '📈', href: '/dashboard/reports', color: 'bg-slate-50 hover:bg-slate-100 text-slate-700' },
          ].map((mod) => (
            <Link
              key={mod.name}
              href={mod.href}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-transparent transition-all ${mod.color}`}
            >
              <span className="text-2xl">{mod.icon}</span>
              <span className="text-xs font-semibold">{mod.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {!hasData && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <div className="text-sm">
            <span className="font-semibold text-amber-800">Demo Mode</span> — Database not configured. Showing sample data.{' '}
            <span className="text-amber-700 underline cursor-pointer">Configure DATABASE_URL</span> to connect to your Neon database.
          </div>
        </div>
      )}
    </div>
  );
}
