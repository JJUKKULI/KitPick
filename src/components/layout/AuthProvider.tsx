'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useProfileStore } from '@/store/profileStore';
import { ToastContainer } from '@/components/ui/Toast';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const init = useAuthStore((s) => s.init);
  const user = useAuthStore((s) => s.user);
  const { isDark } = useThemeStore();
  const { fetch: fetchWishlist, clear: clearWishlist } = useWishlistStore();
  const { setProfile, clear: clearProfile } = useProfileStore();

  useEffect(() => { init(); }, [init]);

  // 로그인/로그아웃 시 wishlist + profile 동기화
  useEffect(() => {
    if (user) {
      fetchWishlist(user.id);
      // 프로필 API에서 닉네임/아바타 로드
      fetch('/api/profile')
        .then((r) => r.ok ? r.json() : null)
        .then((data) => {
          if (data?.profile) {
            setProfile({
              username: data.profile.username ?? null,
              avatar_url: data.profile.avatar_url ?? null,
            });
          }
        })
        .catch(() => {});
    } else {
      clearWishlist();
      clearProfile();
    }
  }, [user, fetchWishlist, clearWishlist, setProfile, clearProfile]);

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
