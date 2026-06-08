import Link from 'next/link';

const modules = [
  { icon: '📝', name: 'Admissions', desc: 'AI-powered application review, scoring, and bulk processing. Parents apply online, AI scores instantly.', gradient: 'from-blue-500 to-blue-600', features: ['Online Applications', 'AI Scoring', 'Bulk Review', 'Parent Notifications', 'Document Management'] },
  { icon: '📊', name: 'Academics', desc: 'Curriculum management, subject assignments, and comprehensive student performance tracking.', gradient: 'from-violet-500 to-purple-600', features: ['Curriculum Planning', 'Subject Assignment', 'Grade Tracking', 'Report Cards', 'Performance Analytics'] },
  { icon: '💻', name: 'CBT', desc: 'Full computer-based testing with auto-grading, question bank, and anti-cheat measures.', gradient: 'from-cyan-500 to-cyan-600', features: ['Exam Creation', 'Auto-Grading', 'Question Bank', 'Anti-Cheat', 'Result Analytics'] },
  { icon: '📋', name: 'Attendance', desc: 'Daily attendance with pattern analysis, risk detection, and automated parent alerts.', gradient: 'from-amber-500 to-amber-600', features: ['Daily Marking', 'Pattern Analysis', 'Risk Detection', 'Parent Alerts', 'Class Reports'] },
  { icon: '💰', name: 'Finance', desc: 'Complete fee management with invoicing, payment tracking, and revenue forecasting.', gradient: 'from-emerald-500 to-emerald-600', features: ['Fee Structures', 'Invoicing', 'Payment Tracking', 'Revenue Reports', 'Forecasting'] },
  { icon: '📖', name: 'Library', desc: 'Book management, circulation tracking, penalty calculation, and reading recommendations.', gradient: 'from-rose-500 to-rose-600', features: ['Book Catalog', 'Borrow/Return', 'Penalty System', 'Recommendations', 'Inventory'] },
  { icon: '🏠', name: 'Hostel', desc: 'Accommodation management with room allocation, occupancy tracking, and warden tools.', gradient: 'from-indigo-500 to-indigo-600', features: ['Room Allocation', 'Occupancy Tracking', 'Warden Dashboard', 'Fee Management', 'Maintenance'] },
  { icon: '🚌', name: 'Transport', desc: 'Bus route management, driver assignments, GPS tracking, and parent notifications.', gradient: 'from-teal-500 to-teal-600', features: ['Route Management', 'GPS Tracking', 'Driver Assignment', 'Parent Alerts', 'Fuel Reports'] },
  { icon: '📦', name: 'Inventory', desc: 'Asset tracking, stock management, reorder alerts, and procurement workflows.', gradient: 'from-orange-500 to-orange-600', features: ['Asset Tracking', 'Stock Management', 'Reorder Alerts', 'Procurement', 'Audit Trail'] },
  { icon: '👨‍👩‍👧', name: 'Parents', desc: 'Parent communication hub with messaging, progress reports, and meeting scheduling.', gradient: 'from-pink-500 to-pink-600', features: ['Messaging Hub', 'Progress Reports', 'Meeting Scheduling', 'Fee Notifications', 'Mobile App'] },
  { icon: '👩‍🏫', name: 'Teachers', desc: 'Staff management with schedules, workload tracking, performance ratings, and payroll.', gradient: 'from-blue-500 to-indigo-500', features: ['Staff Records', 'Schedule Management', 'Workload Tracking', 'Performance Ratings', 'Payroll'] },
  { icon: '🎓', name: 'Students', desc: 'Complete student lifecycle from enrollment to graduation with health and discipline records.', gradient: 'from-violet-500 to-pink-500', features: ['Student Profiles', 'Enrollment', 'Health Records', 'Discipline', 'Graduation'] },
  { icon: '🏛️', name: 'Alumni', desc: 'Alumni network management with WAEC migration and alumni engagement tools.', gradient: 'from-amber-500 to-rose-500', features: ['Alumni Directory', 'WAEC Migration', 'Engagement', 'Events', 'Donations'] },
];

export default function ModulesPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-blue-600" /> Modules <span className="w-8 h-px bg-blue-600" />
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            13 modules that cover<br /><span className="text-gradient">every aspect of school management</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Each module is standalone yet deeply integrated. Start with what you need, add more as you grow.
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <div key={mod.name} className={`group bg-white rounded-2xl border border-slate-200/80 p-7 hover:border-transparent hover:shadow-xl transition-all duration-300 animate-fadeInUp stagger-${(i % 6) + 1}`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  {mod.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{mod.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{mod.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {mod.features.map(f => (
                    <span key={f} className="px-2.5 py-1 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-5">All modules included in every plan</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">No hidden fees. No per-module pricing. Everything is included.</p>
          <Link href="/pricing" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-2xl transition-all inline-block">View Pricing →</Link>
        </div>
      </section>
    </div>
  );
}
