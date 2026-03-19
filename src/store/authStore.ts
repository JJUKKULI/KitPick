import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useWishlistStore } from './wishlistStore';

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

    // 로그인 상태면 찜 목록 불러오기
    if (user) {
      useWishlistStore.getState().fetch();
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user ?? null;
      set({ user: newUser });

      if (newUser) {
        useWishlistStore.getState().fetch();
      } else {
        useWishlistStore.getState().clear();
      }
    });
  },

  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null });
    useWishlistStore.getState().clear();
  },
}));
