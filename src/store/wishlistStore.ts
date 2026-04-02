import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@/lib/supabase/client';

interface WishlistStore {
  wishlist: string[];
  loading: boolean;
  hydrated: boolean;
  fetch: (userId: string) => Promise<void>;
  toggle: (productId: string, userId?: string) => Promise<void>;
  isWished: (id: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      loading: false,
      hydrated: false,

      fetch: async (userId) => {
        set({ loading: true });
        const supabase = createClient();
        const { data, error } = await supabase
          .from('wishlists')
          .select('product_id')
          .eq('user_id', userId);

        if (!error && data) {
          set({ wishlist: data.map((w) => w.product_id), loading: false, hydrated: true });
        } else {
          // Supabase 실패 시 localStorage 유지 (error 무시 안 함)
          console.error('[wishlist fetch]', error?.message);
          set({ loading: false, hydrated: true });
        }
      },

      toggle: async (productId, userId) => {
        const { wishlist } = get();
        const isCurrentlyWished = wishlist.includes(productId);

        // 1) 낙관적 UI 업데이트 (localStorage persist 포함)
        set({
          wishlist: isCurrentlyWished
            ? wishlist.filter((id) => id !== productId)
            : [...wishlist, productId],
        });

        // 2) 로그인 상태면 Supabase 동기화
        if (userId) {
          const supabase = createClient();
          if (isCurrentlyWished) {
            const { error } = await supabase
              .from('wishlists')
              .delete()
              .eq('user_id', userId)
              .eq('product_id', productId);
            if (error) console.error('[wishlist delete]', error.message);
          } else {
            const { error } = await supabase
              .from('wishlists')
              .insert({ user_id: userId, product_id: productId });
            if (error) {
              console.error('[wishlist insert]', error.message);
              // insert 실패 시 낙관적 업데이트 롤백
              set({ wishlist: get().wishlist.filter((id) => id !== productId) });
            }
          }
        }
      },

      isWished: (id) => get().wishlist.includes(id),

      // 로그아웃 시 — localStorage 비우기
      clear: () => set({ wishlist: [], hydrated: false }),
    }),
    {
      name: 'kitpick-wishlist',  // localStorage 키 — 비로그인도 유지
      partialize: (state) => ({ wishlist: state.wishlist }), // wishlist만 persist
    }
  )
);
