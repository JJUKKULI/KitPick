'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { ToastContainer } from '@/components/ui/Toast';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const init = useAuthStore((s) => s.init);
  const user = useAuthStore((s) => s.user);
  const { isDark } = useThemeStore();
  const { fetch: fetchWishlist, clear: clearWishlist } = useWishlistStore();

  useEffect(() => { init(); }, [init]);

  // 로그인/로그아웃 시 Supabase wishlist 동기화
  useEffect(() => {
    if (user) {
      fetchWishlist(user.id);
    } else {
      clearWishlist();
    }
  }, [user, fetchWishlist, clearWishlist]);

  // 테마 적용
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
