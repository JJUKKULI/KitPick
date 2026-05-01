import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface AuthStore {
  user: User | null;
  loading: boolean;
  init: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  init: async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    set({ user, loading: false });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },

  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null });

    // 로그아웃 시 모든 사용자 데이터 즉시 초기화
    // (동적 import로 순환참조 방지)
    const { useWishlistStore } = await import('./wishlistStore');
    const { useProfileStore }  = await import('./profileStore');
    useWishlistStore.getState().clear();
    useProfileStore.getState().clear();

    // localStorage의 persist 데이터도 제거
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kitpick-wishlist');
    }
  },
}));
