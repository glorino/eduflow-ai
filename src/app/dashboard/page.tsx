import prisma from '@/lib/prisma';

export default async function DashboardPage() {
  const [totalStudents, totalTeachers, totalParents, pendingAdmissions, recentPayments] = await Promise.all([
    prisma.student.count({ where: { isActive: true } }),
    prisma.teacher.count({ where: { isActive: true } }),
    prisma.parent.count(),
    prisma.admission.count({ where: { status: 'APPLIED' } }),
    prisma.feePayment.aggregate({
      _sum: { paidAmount: true },
      where: { status: 'COMPLETED' },
    }),
  ]);

  const stats = [
    { label: 'Total Students', value: totalStudents, icon: '🎓', change: '+12%', positive: true },
    { label: 'Total Teachers', value: totalTeachers, icon: '👨‍🏫', change: '+5%', positive: true },
    { label: 'Total Parents', value: totalParents, icon: '👨‍👩‍👧', change: '+8%', positive: true },
    { label: 'Pending Admissions', value: pendingAdmissions, icon: '📝', change: '-3%', positive: false },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to EduFlow AI</h2>
        <p className="text-white/80">Enterprise Education ERP for smart school management</p>
        <div className="flex gap-3 mt-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Quick Actions
          </button>
          <button className="border border-white/30 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
            View Reports
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value.toLocaleString()}</p>
                <p className={`text-sm font-medium mt-2 ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Agents Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">AI Agents Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Admission Agent', status: 'Active', icon: '📝' },
            { name: 'Academic Agent', status: 'Active', icon: '📚' },
            { name: 'Attendance Agent', status: 'Active', icon: '📋' },
            { name: 'Finance Agent', status: 'Active', icon: '💰' },
            { name: 'CBT Agent', status: 'Active', icon: '💻' },
            { name: 'Parent Agent', status: 'Active', icon: '👨‍👩‍👧' },
            { name: 'Library Agent', status: 'Active', icon: '📖' },
            { name: 'Discipline Agent', status: 'Active', icon: '⚖️' },
            { name: 'Alumni Agent', status: 'Active', icon: '🏛️' },
            { name: 'Reporting Agent', status: 'Active', icon: '📈' },
          ].map((agent) => (
            <div key={agent.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">{agent.icon}</span>
              <div>
                <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span className="text-xs text-emerald-600">{agent.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Modules */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Admissions', icon: '📝', href: '/dashboard/admissions', count: pendingAdmissions },
          { name: 'Academics', icon: '📚', href: '/dashboard/academics', count: totalStudents },
          { name: 'CBT Exams', icon: '💻', href: '/dashboard/cbt', count: 0 },
          { name: 'Attendance', icon: '📋', href: '/dashboard/attendance', count: 0 },
          { name: 'Finance', icon: '💰', href: '/dashboard/finance', count: 0 },
          { name: 'Library', icon: '📖', href: '/dashboard/library', count: 0 },
          { name: 'Hostel', icon: '🏠', href: '/dashboard/hostel', count: 0 },
          { name: 'Transport', icon: '🚌', href: '/dashboard/transport', count: 0 },
        ].map((module) => (
          <a
            key={module.name}
            href={module.href}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">{module.icon}</div>
            <div className="font-medium text-gray-900">{module.name}</div>
            <div className="text-sm text-gray-500">{module.count} records</div>
          </a>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New admission application received', time: '2 minutes ago', icon: '📝', color: 'blue' },
            { action: 'AI Agent: Admission review completed', time: '5 minutes ago', icon: '🤖', color: 'purple' },
            { action: 'Fee payment received from John Doe', time: '10 minutes ago', icon: '💰', color: 'green' },
            { action: 'Attendance marked for Class SS2A', time: '15 minutes ago', icon: '📋', color: 'orange' },
            { action: 'Library book returned by Sarah Smith', time: '20 minutes ago', icon: '📖', color: 'indigo' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">{activity.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
