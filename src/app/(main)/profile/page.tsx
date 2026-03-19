'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { User, Bookmark, Heart, Settings, Pencil, Check, X, Loader2, AlertTriangle } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'wishlist';
  const { user, signOut } = useAuthStore();
  const { wishlist, toggle } = useWishlistStore();
  const wishedProducts = mockProducts.filter((p) => wishlist.includes(p.id));
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameLoading, setNameLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const { profile } = await res.json();
        setProfile(profile);
        setNewName(profile.username ?? '');
      }
    }
    if (user) fetchProfile();
  }, [user]);

  async function handleNameSave() {
    if (!newName.trim() || newName === profile?.username) { setEditingName(false); return; }
    setNameLoading(true); setNameError('');
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: newName.trim() }),
    });
    const data = await res.json();
    if (!res.ok) { setNameError(data.error); }
    else { setProfile((prev) => prev ? { ...prev, username: newName.trim() } : prev); setEditingName(false); }
    setNameLoading(false);
  }

  async function handleDeleteAccount() {
    setDeleteLoading(true);
    const supabase = createClient();
    await supabase.rpc('delete_user');
    await signOut();
  }

  const displayName = profile?.username ?? user?.email?.split('@')[0] ?? '유저';
  const memberYear = profile?.created_at ? new Date(profile.created_at).getFullYear() : new Date().getFullYear();

  const tabs = [
    { id: 'wishlist', label: '찜한 목록', icon: Heart, count: wishedProducts.length },
    { id: 'settings', label: '설정', icon: Settings, count: null },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto w-full">
      {/* 프로필 헤더 */}
      <div className="bg-surface border border-surface-border rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-500/20 border-2 border-brand-500/30 flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-brand-400">{displayName[0].toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex items-center gap-2 mb-1">
                <input value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                  className="bg-surface-raised border border-brand-500/50 rounded-lg px-3 py-1 text-white text-lg font-bold focus:outline-none w-40" autoFocus maxLength={20} />
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
                <button onClick={() => setEditingName(true)} className="p-1 text-zinc-600 hover:text-zinc-300 transition-colors shrink-0"><Pencil className="w-3.5 h-3.5" /></button>
              </div>
            )}
            {nameError && <p className="text-xs text-brand-400 mb-1">{nameError}</p>}
            <p className="text-sm text-zinc-500">{user?.email}</p>
            <p className="text-xs text-zinc-600 mt-0.5">{memberYear}년부터 회원</p>
          </div>
          <Link href="/settings" className="shrink-0 p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-surface-raised transition-colors"><Settings className="w-5 h-5" /></Link>
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
            {tab.count !== null && <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-brand-500/20 text-brand-400' : 'bg-surface-raised text-zinc-600'}`}>{tab.count}</span>}
          </Link>
        ))}
      </div>

      {/* 찜한 목록 */}
      {activeTab === 'wishlist' && (
        wishedProducts.length > 0 ? (
          <div className="space-y-3">
            {wishedProducts.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-4 bg-surface border border-surface-border rounded-xl hover:border-surface-border-light transition-colors">
                <div className="w-12 h-12 bg-surface-raised rounded-lg border border-surface-border shrink-0 flex items-center justify-center"><User className="w-5 h-5 text-zinc-600" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate">{item.name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{item.grade} · {item.series}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-white text-sm hidden sm:block">${item.price.toFixed(2)}</span>
                  <DecisionBadge decision={item.decision} size="sm" />
                  <button onClick={() => toggle(item.id, !!user)} className="p-1.5 rounded-full text-brand-400 hover:bg-brand-500/10 transition-colors"><Heart className="w-4 h-4 fill-current" /></button>
                </div>
              </div>
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
                <div><p className="text-sm text-white">이메일</p><p className="text-xs text-zinc-500 mt-0.5">{user?.email}</p></div>
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
              <div className="w-10 h-10 bg-brand-500/10 border border-brand-500/20 rounded-full flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5 text-brand-400" /></div>
              <h3 className="text-lg font-bold text-white">정말 탈퇴하시겠어요?</h3>
            </div>
            <p className="text-sm text-zinc-400 mb-6">찜 목록, 프로필 등 모든 데이터가 영구 삭제됩니다. 이 작업은 되돌릴 수 없습니다.</p>
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
