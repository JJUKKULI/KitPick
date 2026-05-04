'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Zap, TrendingUp, Bookmark, Settings,
  Hexagon, PanelLeftClose, PanelLeftOpen,
  LogIn, LogOut, BookOpen, LayoutDashboard
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { icon: Zap,           label: '결정 피드',  path: '/feed' },
  { icon: TrendingUp,    label: '트렌드',     path: '/trends' },
  { icon: BookOpen,      label: '저널',       path: '/journal' },
  { icon: Bookmark,      label: '관심 목록',  path: '/wishlist' },
];

const accountItems = [
  { icon: LayoutDashboard, label: '프로필', path: '/profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { user, signOut } = useAuthStore();

  async function handleSignOut() {
    await signOut();
    router.push('/');
    router.refresh();
  }

  function isActive(path: string) {
    return pathname === path.split('?')[0];
  }

  return (
    <aside className={`h-screen sticky top-0 bg-surface-base border-r border-surface-border flex-col hidden md:flex transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>

      {/* 로고 + 토글 */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-surface-border shrink-0">
        <Link href="/" className={`flex items-center gap-2 text-white font-bold tracking-wider hover:opacity-80 transition-opacity ${collapsed ? 'justify-center w-full' : ''}`}>
          <Hexagon className="w-6 h-6 text-brand-500 fill-brand-500/20 shrink-0" />
          {!collapsed && <span>KITPICK</span>}
        </Link>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-surface-raised transition-colors">
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center pt-3 px-2">
          <button onClick={() => setCollapsed(false)} className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-surface-raised transition-colors">
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 메인 네비 */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        {!collapsed && <div className="px-3 mb-2 text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">탐색</div>}
        {navItems.map((item) => (
          <Link key={item.path} href={item.path} title={collapsed ? item.label : undefined}
            className={`flex items-center rounded-lg text-sm font-medium transition-colors ${collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'} ${isActive(item.path) ? 'bg-brand-500/10 text-brand-500' : 'text-zinc-400 hover:text-zinc-100 hover:bg-surface-raised'}`}>
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && item.label}
          </Link>
        ))}

        {!collapsed && <div className="px-3 pt-5 pb-2 text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">계정</div>}
        {collapsed && <div className="my-3 border-t border-surface-border" />}
        {accountItems.map((item) => (
          <Link key={item.path} href={item.path} title={collapsed ? item.label : undefined}
            className={`flex items-center rounded-lg text-sm font-medium transition-colors ${collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'} ${isActive(item.path) ? 'bg-brand-500/10 text-brand-500' : 'text-zinc-400 hover:text-zinc-100 hover:bg-surface-raised'}`}>
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && item.label}
          </Link>
        ))}
      </nav>

      {/* 하단 — 로그인/로그아웃만 심플하게 */}
      <div className="p-3 border-t border-surface-border">
        {/* 설정 — 로그아웃 위 */}
        <Link href="/settings" title={collapsed ? '설정' : undefined}
          className={`flex items-center rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-surface-raised transition-colors w-full mb-1 ${collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'} ${isActive('/settings') ? 'bg-brand-500/10 text-brand-500' : ''}`}>
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && '설정'}
        </Link>
        {user ? (
          <button onClick={handleSignOut} title={collapsed ? '로그아웃' : undefined}
            className={`flex items-center rounded-lg text-sm font-medium text-zinc-500 hover:text-brand-400 hover:bg-brand-500/5 transition-colors w-full ${collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'}`}>
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && '로그아웃'}
          </button>
        ) : (
          <Link href="/login" title={collapsed ? '로그인' : undefined}
            className={`flex items-center rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-surface-raised transition-colors w-full ${collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'}`}>
            <LogIn className="w-4 h-4 shrink-0" />
            {!collapsed && '로그인'}
          </Link>
        )}
      </div>
    </aside>
  );
}
