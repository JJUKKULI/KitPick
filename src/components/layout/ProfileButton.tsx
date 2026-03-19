'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, LogIn, ChevronDown, Settings, LogOut, Bookmark } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function ProfileButton() {
  const { user, signOut } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  // 바깥 클릭 닫기
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  function handleOpen() {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen((v) => !v);
  }

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    router.push('/');
    router.refresh();
  }

  if (!user) {
    return (
      <Link href="/login" className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 hover:bg-brand-400 text-white rounded-lg text-sm font-medium transition-colors">
        <LogIn className="w-3.5 h-3.5" />
        로그인
      </Link>
    );
  }

  const displayName = user.user_metadata?.username ?? user.email?.split('@')[0] ?? '유저';
  const initial = displayName[0].toUpperCase();

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-raised transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-xs font-bold text-brand-400 shrink-0">
          {initial}
        </div>
        <span className="text-sm hidden sm:block max-w-[80px] truncate" style={{ color: 'var(--color-text-secondary)' }}>
          {displayName}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} style={{ color: 'var(--color-text-muted)' }} />
      </button>

      {/* fixed 드롭다운 — overflow 클리핑 우회 */}
      {open && (
        <div
          style={{ position: 'fixed', top: pos.top, right: pos.right, zIndex: 9999 }}
          className="w-52 bg-surface-overlay border border-surface-border rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
        >
          {/* 유저 정보 */}
          <div className="px-4 py-3 border-b border-surface-border">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{displayName}</p>
            <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>
          </div>

          <div className="p-1.5">
            {[
              { href: '/profile', icon: User, label: '프로필' },
              { href: '/profile?tab=wishlist', icon: Bookmark, label: '관심 목록' },
              { href: '/settings', icon: Settings, label: '설정' },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-surface-raised transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}>
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="p-1.5 border-t border-surface-border">
            <button onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-brand-400 hover:bg-brand-500/10 transition-colors">
              <LogOut className="w-4 h-4 shrink-0" />
              로그아웃
            </button>
          </div>
        </div>
      )}
    </>
  );
}
