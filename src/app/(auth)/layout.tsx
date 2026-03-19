import Link from 'next/link';
import { Hexagon } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      {/* 상단 로고 */}
      <header className="h-14 flex items-center px-6 border-b border-surface-border">
        <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-wider hover:opacity-80 transition-opacity">
          <Hexagon className="w-5 h-5 text-brand-500 fill-brand-500/20" />
          <span>KITPICK</span>
        </Link>
      </header>

      {/* 중앙 카드 */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="py-4 text-center text-xs text-zinc-600">
        © 2024 KitPick. All rights reserved.
      </footer>
    </div>
  );
}
