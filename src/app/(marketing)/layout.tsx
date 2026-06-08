import { Navbar, Footer } from './layout';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
