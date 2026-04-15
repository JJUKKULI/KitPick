import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@/lib/supabase/client';

interface WishlistStore {
  wishlist: string[];
  loading: boolean;
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

      fetch: async (userId) => {
        set({ loading: true });
        try {
          const supabase = createClient();
          const { data, error } = await supabase
            .from('wishlists')
            .select('product_id')
            .eq('user_id', userId);
          if (!error && data) {
            set({ wishlist: data.map((w: { product_id: string }) => w.product_id) });
          }
        } catch (e) {
          console.error('[wishlist fetch]', e);
        } finally {
          set({ loading: false });
        }
      },

      toggle: async (productId, userId) => {
        const { wishlist } = get();
        const isCurrentlyWished = wishlist.includes(productId);

        // 낙관적 업데이트
        set({
          wishlist: isCurrentlyWished
            ? wishlist.filter((id) => id !== productId)
            : [...wishlist, productId],
        });

        // 로그인 상태면 Supabase 동기화
        if (userId) {
          try {
            const supabase = createClient();
            if (isCurrentlyWished) {
              const { error } = await supabase
                .from('wishlists')
                .delete()
                .eq('user_id', userId)
                .eq('product_id', productId);
              if (error) throw error;
            } else {
              const { error } = await supabase
                .from('wishlists')
                .insert({ user_id: userId, product_id: productId });
              if (error) {
                // 실패 시 롤백
                set({ wishlist: get().wishlist.filter((id) => id !== productId) });
                throw error;
              }
            }
          } catch (e) {
            console.error('[wishlist toggle]', e);
          }
        }
      },

      isWished: (id) => get().wishlist.includes(id),
      clear: () => set({ wishlist: [] }),
    }),
    {
      name: 'kitpick-wishlist',
      partialize: (s) => ({ wishlist: s.wishlist }),
    }
  )
);
