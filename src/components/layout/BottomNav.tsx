'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, TrendingUp, Heart, LogIn, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const navItems = [
    { icon: Zap,        label: '피드',   path: '/feed' },
    { icon: TrendingUp, label: '트렌드', path: '/trends' },
    { icon: Heart,      label: '찜',     path: '/profile?tab=wishlist' },
    user
      ? { icon: User,  label: '프로필', path: '/profile' }
      : { icon: LogIn, label: '로그인', path: '/login' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface-base/95 backdrop-blur-md border-t border-surface-border">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path.split('?')[0];
          return (
            <Link key={item.path} href={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-colors ${isActive ? 'text-brand-500' : 'text-zinc-500 hover:text-zinc-200'}`}>
              <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
