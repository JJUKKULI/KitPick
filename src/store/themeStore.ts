import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  setDark: (v: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDark: true,

      toggle: () => {
        const next = !get().isDark;
        set({ isDark: next });
        applyTheme(next);
      },

      setDark: (v: boolean) => {
        set({ isDark: v });
        applyTheme(v);
      },
    }),
    { name: 'kitpick-theme' }
  )
);

function applyTheme(isDark: boolean) {
  if (typeof document === 'undefined') return;
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
}
