import { create } from 'zustand';

interface ProfileData {
  username: string | null;
  avatar_url: string | null;
}

interface ProfileStore {
  profile: ProfileData | null;
  setProfile: (data: ProfileData) => void;
  updateUsername: (username: string) => void;
  updateAvatarUrl: (url: string | null) => void;
  clear: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,

  setProfile: (data) => set({ profile: data }),

  updateUsername: (username) =>
    set((s) => ({ profile: s.profile ? { ...s.profile, username } : { username, avatar_url: null } })),

  updateAvatarUrl: (avatar_url) =>
    set((s) => ({ profile: s.profile ? { ...s.profile, avatar_url } : { username: null, avatar_url } })),

  clear: () => set({ profile: null }),
}));
