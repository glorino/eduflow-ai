import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-900">E</span>
          </div>
          <span className="text-2xl font-bold text-white">EduFlow AI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-white hover:text-blue-200 transition-colors">
            Login
          </Link>
          <Link href="/register" className="bg-white text-blue-900 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-white/80 text-sm">AI-Powered Education Management</span>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Smart School<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Management System
            </span>
          </h1>
          
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Enterprise Education ERP for Nursery, Primary, Secondary & Colleges. 
            Multi-campus, Multi-session, Multi-term support with 10 AI Agents.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <Link href="/dashboard" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Dashboard
            </Link>
            <Link href="/docs" className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Documentation
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: '🎓', label: 'Nursery', desc: 'Early childhood' },
              { icon: '📚', label: 'Primary', desc: 'Foundation years' },
              { icon: '🏫', label: 'Secondary', desc: 'Senior education' },
              { icon: '🏛️', label: 'College', desc: 'Higher learning' },
            ].map((level) => (
              <div key={level.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{level.icon}</div>
                <div className="text-white font-semibold">{level.label}</div>
                <div className="text-white/60 text-sm">{level.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto pb-12">
          {[
            { icon: '📝', name: 'Admissions', desc: 'AI-powered review' },
            { icon: '📊', name: 'Academics', desc: 'Performance tracking' },
            { icon: '💻', name: 'CBT', desc: 'Computer-based testing' },
            { icon: '📋', name: 'Attendance', desc: 'Pattern analysis' },
            { icon: '💰', name: 'Finance', desc: 'Fee management' },
            { icon: '📖', name: 'Library', desc: 'Book management' },
            { icon: '🏠', name: 'Hostel', desc: 'Accommodation' },
            { icon: '🚌', name: 'Transport', desc: 'Route tracking' },
            { icon: '📦', name: 'Inventory', desc: 'Asset tracking' },
            { icon: '👨‍👩‍👧', name: 'Parents', desc: 'Communication' },
          ].map((module) => (
            <div key={module.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-colors cursor-pointer">
              <div className="text-2xl mb-2">{module.icon}</div>
              <div className="text-white font-medium text-sm">{module.name}</div>
              <div className="text-white/50 text-xs">{module.desc}</div>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 text-center py-8 text-white/40 text-sm">
        <p>&copy; 2026 EduFlow AI. Built for 5,000 schools and 5 million students.</p>
      </footer>
    </div>
  );
}
