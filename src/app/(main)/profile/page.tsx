'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  User, Bookmark, Heart, Settings, Pencil,
  Check, X, Loader2, AlertTriangle, Camera, Trash2,
} from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { useProfileStore } from '@/store/profileStore';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/components/ui/Toast';
import Link from 'next/link';

interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
}

// ── 아바타 컴포넌트 ──────────────────────────────────────────────────────
function AvatarSection({
  profile, displayName, onAvatarChange,
}: {
  profile: Profile | null;
  displayName: string;
  onAvatarChange: (url: string | null) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imgError, setImgError] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const res = await fetch('/api/profile/avatar', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        toast('error', '업로드 실패', data.error ?? '다시 시도해주세요.');
      } else {
        onAvatarChange(data.avatar_url);
        setImgError(false);
        toast('success', '프로필 사진이 변경됐어요!');
      }
    } catch {
      toast('error', '업로드 중 오류가 발생했어요.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function handleDelete() {
    setUploading(true);
    try {
      const res = await fetch('/api/profile/avatar', { method: 'DELETE' });
      if (res.ok) {
        onAvatarChange(null);
        setImgError(false);
        toast('info', '프로필 사진이 삭제됐어요.');
      }
    } catch {
      toast('error', '삭제 중 오류가 발생했어요.');
    } finally {
      setUploading(false);
    }
  }

  const hasAvatar = !!profile?.avatar_url && !imgError;

  return (
    <div className="relative group w-16 h-16 sm:w-20 sm:h-20 shrink-0">
      {hasAvatar ? (
        <img
          src={profile!.avatar_url!}
          alt={displayName}
          onError={() => setImgError(true)}
          className="w-full h-full rounded-full object-cover border-2 border-brand-500/30"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-brand-500/20 border-2 border-brand-500/30 flex items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold text-brand-400">
            {displayName[0]?.toUpperCase() ?? 'U'}
          </span>
        </div>
      )}

      {/* 호버 오버레이 */}
      <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer">
        {uploading ? (
          <Loader2 className="w-5 h-5 text-white animate-spin" />
        ) : (
          <>
            <button onClick={() => fileRef.current?.click()} className="p-1 text-white hover:text-brand-300 transition-colors" title="사진 변경">
              <Camera className="w-4 h-4" />
            </button>
            {hasAvatar && (
              <button onClick={handleDelete} className="p-1 text-white hover:text-red-400 transition-colors" title="사진 삭제">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFileChange} />
    </div>
  );
}

// ── 메인 페이지 ──────────────────────────────────────────────────────────
export default function ProfilePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'wishlist';
  const { user, signOut } = useAuthStore();
  const { wishlist, toggle } = useWishlistStore();
  const { updateUsername, updateAvatarUrl } = useProfileStore();
  const wishedProducts = mockProducts.filter((p) => wishlist.includes(p.id));

  const [profile, setProfile] = useState<Profile | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameLoading, setNameLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setProfileLoading(true);
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const { profile: p } = await res.json();
          setProfile(p);
          setNewName(p?.username ?? '');
        }
      } catch { /* 조용히 처리 */ } finally {
        setProfileLoading(false);
      }
    }
    if (user) fetchProfile();
    else setProfileLoading(false);
  }, [user]);

  async function handleNameSave() {
    if (!newName.trim() || newName.trim() === profile?.username) { setEditingName(false); return; }
    setNameLoading(true); setNameError('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNameError(data.error);
      } else {
        setProfile((prev) => prev ? { ...prev, username: newName.trim() } : prev);
        updateUsername(newName.trim());
        setEditingName(false);
        toast('success', '닉네임이 변경됐어요!');
      }
    } catch { setNameError('저장 중 오류가 발생했어요.'); }
    finally { setNameLoading(false); }
  }

  async function handleDeleteAccount() {
    setDeleteLoading(true);
    try {
      const supabase = createClient();
      await supabase.rpc('delete_user');
      await signOut();
    } catch {
      toast('error', '탈퇴 중 오류가 발생했어요.');
      setDeleteLoading(false);
    }
  }

  const displayName = profile?.username ?? user?.email?.split('@')[0] ?? '유저';
  const memberYear = profile?.created_at ? new Date(profile.created_at).getFullYear() : new Date().getFullYear();

  const tabs = [
    { id: 'wishlist', label: '관심 목록', icon: Bookmark, count: wishedProducts.length },
    { id: 'settings', label: '설정',     icon: Settings,  count: null },
  ];

  if (!user) {
    return (
      <div className="p-6 lg:p-10 max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-surface-border rounded-2xl">
          <User className="w-10 h-10 text-zinc-700 mb-3" />
          <p className="text-sm font-medium text-zinc-400 mb-4">로그인이 필요합니다</p>
          <Link href="/login" className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg text-sm font-medium transition-colors">로그인하기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto w-full">

      {/* 프로필 헤더 */}
      <div className="bg-surface border border-surface-border rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4">
          {profileLoading ? (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-surface-raised border-2 border-surface-border shrink-0 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-zinc-600 animate-spin" />
            </div>
          ) : (
            <AvatarSection
              profile={profile}
              displayName={displayName}
              onAvatarChange={(url) => {
                setProfile((p) => p ? { ...p, avatar_url: url } : p);
                updateAvatarUrl(url);
              }}
            />
          )}

          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex items-center gap-2 mb-1">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNameSave();
                    if (e.key === 'Escape') { setEditingName(false); setNameError(''); setNewName(profile?.username ?? ''); }
                  }}
                  className="bg-surface-raised border border-brand-500/50 rounded-lg px-3 py-1 text-white text-lg font-bold focus:outline-none w-40"
                  autoFocus maxLength={20}
                />
                {nameLoading ? <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" /> : (
                  <>
                    <button onClick={handleNameSave} className="p-1 text-decision-buy hover:bg-decision-buy/10 rounded transition-colors"><Check className="w-4 h-4" /></button>
                    <button onClick={() => { setEditingName(false); setNameError(''); setNewName(profile?.username ?? ''); }} className="p-1 text-zinc-500 hover:bg-surface-raised rounded transition-colors"><X className="w-4 h-4" /></button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{displayName}</h2>
                <button onClick={() => setEditingName(true)} className="p-1 text-zinc-600 hover:text-zinc-300 transition-colors shrink-0">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {nameError && <p className="text-xs text-brand-400 mb-1">{nameError}</p>}
            <p className="text-sm text-zinc-500">{user.email}</p>
            <p className="text-xs text-zinc-600 mt-0.5">{memberYear}년부터 회원</p>
          </div>

          <Link href="/settings" className="shrink-0 p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-surface-raised transition-colors">
            <Settings className="w-5 h-5" />
          </Link>
        </div>

        <div className="flex gap-6 mt-5 pt-5 border-t border-surface-border">
          <div className="text-center"><div className="text-xl font-bold text-white">{wishedProducts.length}</div><div className="text-xs text-zinc-500 mt-0.5">찜한 키트</div></div>
          <div className="w-px bg-surface-border" />
          <div className="text-center"><div className="text-xl font-bold text-white">0</div><div className="text-xs text-zinc-500 mt-0.5">저장된 저널</div></div>
          <div className="w-px bg-surface-border" />
          <div className="text-center"><div className="text-xl font-bold text-brand-400">$0</div><div className="text-xs text-zinc-500 mt-0.5">예상 절약</div></div>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 bg-surface border border-surface-border rounded-xl p-1 mb-6">
        {tabs.map((tab) => (
          <Link key={tab.id} href={`/profile?tab=${tab.id}`}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-surface-raised text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.count !== null && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-brand-500/20 text-brand-400' : 'bg-surface-raised text-zinc-600'}`}>{tab.count}</span>
            )}
          </Link>
        ))}
      </div>

      {/* 관심 목록 */}
      {activeTab === 'wishlist' && (
        wishedProducts.length > 0 ? (
          <div className="space-y-3">
            {wishedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}
                className="flex items-center gap-3 p-4 bg-surface border border-surface-border rounded-xl hover:border-surface-border-light transition-colors">
                <div className="w-12 h-12 bg-surface-raised rounded-lg border border-surface-border shrink-0 flex items-center justify-center">
                  <User className="w-5 h-5 text-zinc-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate">{item.name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{item.grade} · {item.series}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-white text-sm hidden sm:block">${item.price.toFixed(2)}</span>
                  <DecisionBadge decision={item.decision} size="sm" />
                  <button onClick={(e) => { e.preventDefault(); toggle(item.id, user?.id); }}
                    className="p-1.5 rounded-full text-brand-400 hover:bg-brand-500/10 transition-colors">
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-surface-border rounded-2xl">
            <Heart className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
            <p className="text-sm font-medium text-zinc-400 mb-1">찜한 키트가 없습니다</p>
            <p className="text-xs text-zinc-600 mb-4">피드에서 마음에 드는 키트를 찜해보세요</p>
            <Link href="/feed" className="inline-block px-4 py-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors">피드 보러가기</Link>
          </div>
        )
      )}

      {/* 설정 탭 */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-surface-border"><h3 className="text-sm font-semibold text-white">계정 설정</h3></div>
            <div className="divide-y divide-surface-border">
              <div className="flex items-center justify-between px-4 py-3.5">
                <div><p className="text-sm text-white">이메일</p><p className="text-xs text-zinc-500 mt-0.5">{user.email}</p></div>
              </div>
              <div className="flex items-center justify-between px-4 py-3.5">
                <div><p className="text-sm text-white">닉네임</p><p className="text-xs text-zinc-500 mt-0.5">{displayName}</p></div>
                <button onClick={() => setEditingName(true)} className="text-xs text-brand-400 hover:text-brand-300 transition-colors">변경</button>
              </div>
            </div>
          </div>
          <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-surface-border"><h3 className="text-sm font-semibold text-white">앱 정보</h3></div>
            <div className="divide-y divide-surface-border">
              <div className="flex items-center justify-between px-4 py-3.5"><p className="text-sm text-zinc-300">버전</p><p className="text-sm text-zinc-500">v0.2.0</p></div>
              <div className="flex items-center justify-between px-4 py-3.5"><p className="text-sm text-zinc-300">문의하기</p><p className="text-sm text-zinc-500">kitpick@email.com</p></div>
            </div>
          </div>
          <div className="bg-brand-500/5 border border-brand-500/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-brand-400 mb-1">위험 구역</h3>
            <p className="text-xs text-zinc-500 mb-3">계정을 삭제하면 모든 데이터가 영구적으로 제거됩니다.</p>
            <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 border border-brand-500/30 text-brand-400 hover:bg-brand-500/10 rounded-lg text-sm font-medium transition-colors">계정 삭제</button>
          </div>
        </div>
      )}

      {/* 탈퇴 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-overlay border border-surface-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-500/10 border border-brand-500/20 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-brand-400" />
              </div>
              <h3 className="text-lg font-bold text-white">정말 탈퇴하시겠어요?</h3>
            </div>
            <p className="text-sm text-zinc-400 mb-6">찜 목록, 프로필 등 모든 데이터가 영구 삭제됩니다.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 bg-surface-raised border border-surface-border rounded-xl text-sm font-medium text-white hover:bg-surface-overlay transition-colors">취소</button>
              <button onClick={handleDeleteAccount} disabled={deleteLoading} className="flex-1 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 rounded-xl text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2">
                {deleteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '탈퇴하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
