import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';

export interface NotificationSettings {
  price_drop_alert: boolean;
  reprint_alert:    boolean;
  trending_alert:   boolean;
  popularity_alert: boolean;
}

interface SettingsStore {
  settings: NotificationSettings;
  loading: boolean;
  saving: boolean;
  dirty: boolean;
  lastError: string | null;
  fetch: (userId: string) => Promise<void>;
  update: (key: keyof NotificationSettings, value: boolean) => void;
  save: (userId: string) => Promise<boolean>; // 성공 여부 반환
  reset: () => void;
}

export const defaults: NotificationSettings = {
  price_drop_alert: true,
  reprint_alert:    true,
  trending_alert:   false,
  popularity_alert: false,
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings:  { ...defaults },
  loading:   false,
  saving:    false,
  dirty:     false,
  lastError: null,

  fetch: async (userId) => {
    set({ loading: true, lastError: null });
    const supabase = createClient();

    const { data, error } = await supabase
      .from('user_settings')
      .select('price_drop_alert, reprint_alert, trending_alert, popularity_alert')
      .eq('user_id', userId)
      .single();

    if (!error && data) {
      set({ settings: { ...data }, loading: false, dirty: false });
    } else if (error?.code === 'PGRST116') {
      // row 없음 → upsert 기본값
      const { error: insertErr } = await supabase
        .from('user_settings')
        .upsert({ user_id: userId, ...defaults });
      if (insertErr) console.error('[settings insert]', insertErr.message);
      set({ settings: { ...defaults }, loading: false, dirty: false });
    } else {
      console.error('[settings fetch]', error?.message);
      set({ loading: false, lastError: error?.message ?? '불러오기 실패' });
    }
  },

  update: (key, value) => {
    set((s) => ({ settings: { ...s.settings, [key]: value }, dirty: true }));
  },

  save: async (userId) => {
    const { settings } = get();
    set({ saving: true, lastError: null });
    const supabase = createClient();

    const { error } = await supabase
      .from('user_settings')
      .upsert(
        { user_id: userId, ...settings, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );

    if (error) {
      console.error('[settings save]', error.message);
      set({ saving: false, lastError: error.message });
      return false;
    }

    set({ saving: false, dirty: false });
    return true;
  },

  reset: () => set({ settings: { ...defaults }, dirty: false }),
}));
