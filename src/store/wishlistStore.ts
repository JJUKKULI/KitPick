import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  wishlist: string[];
  toggle: (productId: string) => void;
  isWished: (id: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggle: (productId) => {
        const { wishlist } = get();
        set({
          wishlist: wishlist.includes(productId)
            ? wishlist.filter((id) => id !== productId)
            : [...wishlist, productId],
        });
      },

      isWished: (id) => get().wishlist.includes(id),

      clear: () => set({ wishlist: [] }),
    }),
    { name: 'kitpick-wishlist' }
  )
);
