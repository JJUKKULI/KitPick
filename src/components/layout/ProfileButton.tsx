'use client';

import { useState, useRef, useEffect } from 'react';
import { LogIn, ChevronDown, Settings, LogOut, Bookmark, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function ProfileButton() {
  const { user, signOut } = useAuthStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    window.location.href = '/';
  }

  if (!user) {
    return (
      <a
        href="/login"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 hover:bg-brand-400 text-white rounded-lg text-sm font-medium transition-colors"
      >
        <LogIn className="w-3.5 h-3.5" />
        로그인
      </a>
    );
  }

  const displayName = user.user_metadata?.username ?? user.email?.split('@')[0] ?? '유저';

  const menuItems = [
    { icon: User,     label: '프로필',    href: '/profile' },
    { icon: Bookmark, label: '관심 목록', href: '/wishlist' },
    { icon: Settings, label: '설정',      href: '/settings' },
  ];

  return (
    // relative 컨테이너 — overflow 문제 없이 absolute 드롭다운 사용
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-raised transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-xs font-bold text-brand-400 shrink-0">
          {displayName[0].toUpperCase()}
        </div>
        <span className="text-sm text-zinc-300 hidden sm:block max-w-[80px] truncate">
          {displayName}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* 드롭다운 — position absolute, 헤더 내에서 overflow visible 처리됨 */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-surface-overlay border border-surface-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in"
          style={{ zIndex: 9999 }}>
          {/* 유저 정보 */}
          <div className="px-4 py-3 border-b border-surface-border">
            <p className="text-sm font-semibold text-white truncate">{displayName}</p>
            <p className="text-xs text-zinc-500 truncate mt-0.5">{user.email}</p>
          </div>

          <div className="p-1.5 space-y-0.5">
            {menuItems.map((item) => (
              // <a> 태그 직접 사용 — Next.js router 우회, 가장 확실한 방법
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-surface-raised transition-colors"
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </a>
            ))}
          </div>

          <div className="p-1.5 border-t border-surface-border">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-brand-400 hover:bg-brand-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
