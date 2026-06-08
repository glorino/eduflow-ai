'use client';

import { useState } from 'react';
import { PageHeader, Button } from '@/components/ui';
import { Toast } from '@/components/interactive';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'academic', label: 'Academic', icon: '📚' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Configure your school and platform settings"
        icon="⚙️"
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]}
      />

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-2 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">General Settings</h3>
              <div className="space-y-5 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">School Name</label>
                  <input defaultValue="EduFlow Academy" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">School Email</label>
                  <input defaultValue="admin@eduflow.edu.ng" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                  <input defaultValue="+234 801 234 5678" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                  <textarea defaultValue="12 Education Road, Victoria Island, Lagos, Nigeria" rows={3} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Timezone</label>
                  <select defaultValue="Africa/Lagos" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                    <option value="Africa/Accra">Africa/Accra (GMT)</option>
                    <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={() => setToast({ message: 'Settings saved', type: 'success' })}>Save Changes</Button>
                  <Button variant="secondary">Cancel</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Academic Settings</h3>
              <div className="space-y-5 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Session</label>
                    <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                      <option>2025/2026</option>
                      <option>2024/2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Term</label>
                    <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                      <option>Second Term</option>
                      <option>First Term</option>
                      <option>Third Term</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Grading System</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option>WAEC Standard (A1-F9)</option>
                    <option>Percentage (0-100)</option>
                    <option>Letter Grade (A-F)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Pass Mark (%)</label>
                  <input type="number" defaultValue={50} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={() => setToast({ message: 'Academic settings saved', type: 'success' })}>Save Changes</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Notification Settings</h3>
              <div className="space-y-4 max-w-2xl">
                {[
                  { label: 'Email Notifications', desc: 'Receive email for important alerts', enabled: true },
                  { label: 'SMS Notifications', desc: 'Send SMS to parents for attendance alerts', enabled: true },
                  { label: 'Push Notifications', desc: 'Mobile push notifications for app users', enabled: false },
                  { label: 'WhatsApp Notifications', desc: 'Send WhatsApp messages for fee reminders', enabled: false },
                  { label: 'AI Agent Alerts', desc: 'Get notified when AI agents flag issues', enabled: true },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                    </label>
                  </div>
                ))}
                <div className="pt-4">
                  <Button onClick={() => setToast({ message: 'Notification settings saved', type: 'success' })}>Save Changes</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Security Settings</h3>
              <div className="space-y-5 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                  <input type="password" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                  <input type="password" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                  <input type="password" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={() => setToast({ message: 'Password updated', type: 'success' })}>Update Password</Button>
                </div>
                <hr className="border-slate-200" />
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Two-Factor Authentication</div>
                    <div className="text-xs text-slate-500">Add an extra layer of security</div>
                  </div>
                  <Button variant="secondary" size="sm">Enable 2FA</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Billing & Subscription</h3>
              <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/70">Current Plan</div>
                    <div className="text-2xl font-bold mt-1">Professional</div>
                    <div className="text-sm text-white/70 mt-1">₦450,000/year — Renews Dec 2026</div>
                  </div>
                  <Button variant="secondary">Upgrade Plan</Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900">5</div>
                  <div className="text-xs text-slate-500">Campuses</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900">5,000</div>
                  <div className="text-xs text-slate-500">Students</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900">10</div>
                  <div className="text-xs text-slate-500">AI Agents</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Paystack', desc: 'Payment processing', icon: '💳', connected: true },
                  { name: 'Twilio', desc: 'SMS notifications', icon: '📱', connected: true },
                  { name: 'SendGrid', desc: 'Email delivery', icon: '📧', connected: false },
                  { name: 'Google Classroom', desc: 'Sync assignments', icon: '📚', connected: false },
                  { name: 'WAEC', desc: 'Exam results import', icon: '🏛️', connected: false },
                  { name: 'AWS S3', desc: 'File storage', icon: '☁️', connected: true },
                ].map(integration => (
                  <div key={integration.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{integration.name}</div>
                        <div className="text-xs text-slate-500">{integration.desc}</div>
                      </div>
                    </div>
                    <Badge variant={integration.connected ? 'green' : 'slate'} dot>
                      {integration.connected ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// Badge used in integrations
function Badge({ variant, dot, children }: { variant: string; dot?: boolean; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
    slate: 'bg-slate-100 text-slate-600 ring-slate-500/10',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ring-1 ring-inset ${colors[variant] || colors.slate}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${variant === 'green' ? 'bg-emerald-500' : 'bg-slate-500'}`} />}
      {children}
    </span>
  );
}
