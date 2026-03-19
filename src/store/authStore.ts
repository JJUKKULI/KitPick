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
    // 로그아웃 시 찜 목록은 localStorage에 유지 (선택사항)
    // useWishlistStore.getState().clear();
  },
}));
