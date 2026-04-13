import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProfileButton } from '@/components/layout/ProfileButton';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-base">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">

        {/* 헤더 — overflow visible 유지해야 드롭다운 잘리지 않음 */}
        <div
          className="h-14 shrink-0 flex items-center justify-end px-4 border-b border-surface-border bg-surface-base"
          style={{ position: 'relative', zIndex: 100 }}
        >
          <ProfileButton />
        </div>

        {/* 콘텐츠 — isolation으로 내부 stacking context 격리 */}
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
