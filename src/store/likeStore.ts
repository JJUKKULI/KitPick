import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LikeStore {
  likes: string[];  // product id 배열
  toggle: (productId: string) => void;
  isLiked: (id: string) => boolean;
  clear: () => void;
}

export const useLikeStore = create<LikeStore>()(
  persist(
    (set, get) => ({
      likes: [],

      toggle: (productId) => {
        const { likes } = get();
        set({
          likes: likes.includes(productId)
            ? likes.filter((id) => id !== productId)
            : [...likes, productId],
        });
      },

      isLiked: (id) => get().likes.includes(id),

      clear: () => set({ likes: [] }),
    }),
    {
      name: 'kitpick-likes', // localStorage 저장
    }
  )
);
