import Link from 'next/link';
import { Hexagon } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProfileButton } from '@/components/layout/ProfileButton';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-base">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">

        {/* 헤더 */}
        <div
          className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-surface-border bg-surface-base"
          style={{ position: 'relative', zIndex: 100 }}
        >
          {/* 모바일 전용 로고 — md 이상에서 Sidebar가 있으므로 숨김 */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold tracking-wider md:hidden"
          >
            <Hexagon className="w-5 h-5 text-brand-500 fill-brand-500/20" />
            <span className="text-sm">KITPICK</span>
          </Link>

          {/* 데스크탑에서 좌측 공간 */}
          <div className="hidden md:block" />

          <ProfileButton />
        </div>

        <main
          id="main-scroll"
          className="flex-1 overflow-y-auto pb-20 md:pb-0"
          style={{ isolation: 'isolate' }}
        >
          {children}
        </main>
      </div>

      <BottomNav />
      <ScrollToTop />
    </div>
  );
}
