import { create } from 'zustand';

interface WishlistStore {
  wishlist: string[];
  loading: boolean;
  // Supabase에서 찜 목록 불러오기
  fetch: () => Promise<void>;
  // 찜 토글 — 로그인 상태면 Supabase, 비로그인이면 로컬
  toggle: (productId: string, isLoggedIn: boolean) => Promise<void>;
  isWished: (id: string) => boolean;
  // 로컬 전용 (비로그인)
  _localToggle: (id: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/wishlist');
      if (!res.ok) throw new Error();
      const { wishlist } = await res.json();
      set({ wishlist });
    } catch {
      // 비로그인이면 무시
    } finally {
      set({ loading: false });
    }
  },

  toggle: async (productId, isLoggedIn) => {
    const { wishlist } = get();
    const wished = wishlist.includes(productId);

    // 낙관적 업데이트 (UI 즉시 반영)
    set({
      wishlist: wished
        ? wishlist.filter((id) => id !== productId)
        : [...wishlist, productId],
    });

    if (!isLoggedIn) return;

    try {
      const res = await fetch('/api/wishlist', {
        method: wished ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // 실패 시 롤백
      set({ wishlist });
    }
  },

  isWished: (id) => get().wishlist.includes(id),

  _localToggle: (id) => {
    const { wishlist } = get();
    set({
      wishlist: wishlist.includes(id)
        ? wishlist.filter((wid) => wid !== id)
        : [...wishlist, id],
    });
  },

  clear: () => set({ wishlist: [] }),
}));
