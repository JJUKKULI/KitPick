import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProfileButton } from '@/components/layout/ProfileButton';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-base">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 우측 상단 고정 헤더 */}
        <div className="h-14 shrink-0 flex items-center justify-end px-4 border-b border-surface-border bg-surface-base/80 backdrop-blur-md">
          <ProfileButton />
        </div>
        <main id="main-scroll" className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <BottomNav />
      <ScrollToTop />
    </div>
  );
}
