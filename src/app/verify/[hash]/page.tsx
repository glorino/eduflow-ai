import { TranscriptService } from '@/lib/transcript';
import Link from 'next/link';

interface VerifyPageProps {
  params: Promise<{ hash: string }>;
}

export default async function VerifyTranscriptPage({ params }: VerifyPageProps) {
  const { hash } = await params;
  let result;

  try {
    result = await TranscriptService.verifyTranscript(hash);
  } catch {
    result = { status: 'error', transcript: null };
  }

  const statusConfig = {
    valid: { color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: '✅', label: 'Verified', textColor: 'text-emerald-700' },
    expired: { color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', border: 'border-amber-200', icon: '⏰', label: 'Expired', textColor: 'text-amber-700' },
    invalid: { color: 'from-rose-500 to-pink-500', bg: 'bg-rose-50', border: 'border-rose-200', icon: '❌', label: 'Invalid', textColor: 'text-rose-700' },
    error: { color: 'from-slate-500 to-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', icon: '⚠️', label: 'Error', textColor: 'text-slate-700' },
  };

  const config = statusConfig[result.status as keyof typeof statusConfig] || statusConfig.invalid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-sm block">EduFlow AI</span>
              <span className="text-[10px] text-slate-400 font-medium">Transcript Verification</span>
            </div>
          </Link>
          <div className="text-[11px] text-slate-400 font-medium">Secure Verification Portal</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Status Card */}
        <div className={`relative overflow-hidden rounded-3xl border ${config.border} bg-white shadow-xl shadow-slate-200/50`}>
          <div className={`h-1.5 bg-gradient-to-r ${config.color}`} />
          
          <div className="p-8">
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-3xl shadow-lg`}>
                {config.icon}
              </div>
            </div>

            {/* Status Label */}
            <div className="text-center mb-8">
              <h1 className={`text-2xl font-extrabold ${config.textColor} mb-2`}>
                Transcript {config.label}
              </h1>
              <p className="text-sm text-slate-500">
                {result.status === 'valid' && 'This transcript has been verified as authentic and valid.'}
                {result.status === 'expired' && 'This transcript has expired and is no longer valid for verification.'}
                {result.status === 'invalid' && 'No transcript found with this verification code. Please check and try again.'}
                {result.status === 'error' && 'An error occurred while verifying this transcript. Please try again later.'}
              </p>
            </div>

            {/* Transcript Details */}
            {result.transcript && (
              <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Transcript Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Student Name</span>
                    <span className="text-sm font-semibold text-slate-900">{result.transcript.studentName}</span>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Transcript ID</span>
                    <span className="text-sm font-mono font-semibold text-slate-900">{result.transcript.transcriptId}</span>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Generated</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {new Date(result.transcript.generatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {result.transcript.expiresAt && (
                    <>
                      <div className="h-px bg-slate-200" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Expires</span>
                        <span className="text-sm font-semibold text-slate-900">
                          {new Date(result.transcript.expiresAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Verification Hash */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Verification Code</div>
              <div className="text-xs font-mono text-slate-600 break-all leading-relaxed">{hash}</div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-lg flex-shrink-0">🔒</span>
              <div className="text-xs text-blue-700 leading-relaxed">
                <span className="font-bold">Security Notice:</span> This verification is cryptographically signed and tamper-proof. Each verification attempt is logged for audit purposes.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-slate-400">
            Powered by{' '}
            <Link href="/" className="font-semibold text-blue-600 hover:text-blue-700">
              EduFlow AI
            </Link>
            {' '}— Smart School Management System
          </p>
        </div>
      </div>
    </div>
  );
}
