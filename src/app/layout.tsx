import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduFlow AI - Smart School Management System',
  description: 'Enterprise Education ERP powered by AI for multi-campus, multi-session, multi-term school management',
  keywords: ['school management', 'education ERP', 'AI', 'student management', 'CBT'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
