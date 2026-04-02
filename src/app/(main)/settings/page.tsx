'use client';

import { useEffect, useState } from 'react';
import {
  Bell, Moon, Shield, ChevronRight, ArrowLeft,
  Save, Loader2, Mail, Monitor, CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore, type NotificationSettings } from '@/store/settingsStore';
import { toast } from '@/components/ui/Toast';

// ─── Toggle 컴포넌트 ───────────────────────────────────────────────────────
function Toggle({ enabled, onChange, disabled }: { enabled: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 disabled:opacity-40 cursor-pointer ${
        enabled ? 'bg-brand-500' : 'bg-surface-raised border border-surface-border'
      }`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
        enabled ? 'translate-x-5' : 'translate-x-0'
      }`} />
    </button>
  );
}

// ─── 알림 항목 정의 ────────────────────────────────────────────────────────
const notifItems: { key: keyof NotificationSettings; label: string; desc: string }[] = [
  { key: 'price_drop_alert', label: '가격 하락 알림',   desc: '찜한 키트 가격이 내려가면 알림' },
  { key: 'reprint_alert',    label: '재판 알림',        desc: '찜한 키트 재판 소식' },
  { key: 'trending_alert',   label: '트렌딩 알림',      desc: '관심 시리즈 트렌딩 진입 시' },
  { key: 'popularity_alert', label: '인기도 변동 알림', desc: '찜한 키트 인기도 급변 시' },
];

const alertTypeMap: Record<keyof NotificationSettings, string> = {
  price_drop_alert: 'price_drop',
  reprint_alert:    'reprint',
  trending_alert:   'trending',
  popularity_alert: 'popularity',
};

// ─── 메인 페이지 ───────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { isDark, setDark } = useThemeStore();
  const { user } = useAuthStore();
  const { settings, loading, saving, dirty, lastError, fetch: fetchSettings, update, save } = useSettingsStore();
  const [testingKey, setTestingKey] = useState<string | null>(null);

  // 페이지 진입 시 Supabase에서 설정 로드
  useEffect(() => {
    if (user) fetchSettings(user.id);
  }, [user, fetchSettings]);

  // 저장 에러 토스트
  useEffect(() => {
    if (lastError) toast('error', '설정 저장 실패', lastError);
  }, [lastError]);

  // ── 저장 핸들러 ───────────────────────────────────────────────────────────
  async function handleSave() {
    if (!user) return;
    const ok = await save(user.id);
    if (ok) {
      toast('success', '설정 저장 완료', '알림 설정이 저장됐어요.');
      // 브라우저 알림 권한 요청
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') toast('info', '브라우저 알림 허용됨', '알림을 받을 수 있어요.');
      }
    }
  }

  // ── 브라우저 알림 테스트 ──────────────────────────────────────────────────
  function sendBrowserNotification(label: string) {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      toast('error', '브라우저가 알림을 지원하지 않아요');
      return;
    }
    if (Notification.permission === 'granted') {
      new Notification('KitPick 알림', {
        body: `[${label}] RX-78-2 건담 가격이 $15.99 → $12.99로 하락했습니다.`,
        icon: '/favicon.ico',
      });
      toast('success', '브라우저 알림 발송됨');
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then((p) => {
        if (p === 'granted') sendBrowserNotification(label);
        else toast('info', '알림 권한이 필요해요', '브라우저 설정에서 허용해주세요.');
      });
    } else {
      toast('error', '브라우저 알림이 차단됐어요', '브라우저 설정에서 권한을 허용해주세요.');
    }
  }

  // ── 이메일 알림 테스트 ────────────────────────────────────────────────────
  async function sendEmailNotification(key: keyof NotificationSettings, label: string) {
    if (!user?.email) { toast('error', '이메일 정보가 없어요'); return; }
    setTestingKey(key);
    try {
      const res = await window.fetch(`/api/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'email', alertType: alertTypeMap[key] }),
      });
      const data = await res.json();
      if (res.ok) {
        toast('success', '이메일 발송됨', `${user.email}으로 전송했어요.`);
      } else {
        toast('error', '이메일 발송 실패', data.error ?? '잠시 후 다시 시도해주세요.');
      }
    } catch {
      toast('error', '네트워크 오류');
    } finally {
      setTestingKey(null);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-2xl mx-auto w-full pb-24 md:pb-10">

      {/* ── 헤더 ── */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/profile" className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-surface-raised transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-white">설정</h1>
        </div>
        {dirty && user && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {saving
              ? <><Loader2 className="w-4 h-4 animate-spin" />저장 중...</>
              : <><Save className="w-4 h-4" />저장</>}
          </button>
        )}
        {!dirty && !loading && user && (
          <span className="flex items-center gap-1.5 text-xs text-zinc-600">
            <CheckCircle className="w-3.5 h-3.5 text-decision-buy" />저장됨
          </span>
        )}
      </div>

      <div className="space-y-4">

        {/* ── 알림 설정 ── */}
        <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-zinc-400" />
              <h2 className="text-sm font-semibold text-white">알림 설정</h2>
            </div>
            {loading && <Loader2 className="w-3.5 h-3.5 text-zinc-500 animate-spin" />}
            {!user && <span className="text-xs text-zinc-600">로그인 후 설정 가능</span>}
          </div>

          <div className="divide-y divide-surface-border">
            {notifItems.map((item) => {
              const isOn = settings[item.key];
              const isTesting = testingKey === item.key;
              return (
                <div key={item.key} className="px-4 py-4">
                  {/* 토글 행 */}
                  <div className="flex items-center justify-between mb-0">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-sm text-white">{item.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle
                      enabled={isOn}
                      onChange={(v) => {
                        if (!user) { toast('info', '로그인이 필요합니다'); return; }
                        update(item.key, v);
                      }}
                      disabled={loading}
                    />
                  </div>

                  {/* 테스트 버튼 — 저장 완료 + ON 상태만 표시 */}
                  {isOn && !dirty && user && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-surface-border/60">
                      <span className="text-xs text-zinc-600 mr-1">테스트 발송:</span>
                      {/* 브라우저 알림 */}
                      <button
                        onClick={() => sendBrowserNotification(item.label)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-raised border border-surface-border text-xs text-zinc-400 hover:text-zinc-200 hover:border-surface-border-light transition-colors"
                      >
                        <Monitor className="w-3 h-3" />브라우저
                      </button>
                      {/* 이메일 */}
                      <button
                        onClick={() => sendEmailNotification(item.key, item.label)}
                        disabled={isTesting}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-raised border border-surface-border text-xs text-zinc-400 hover:text-zinc-200 hover:border-surface-border-light transition-colors disabled:opacity-50"
                      >
                        {isTesting
                          ? <Loader2 className="w-3 h-3 animate-spin" />
                          : <Mail className="w-3 h-3" />}
                        이메일 ({user.email})
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 앱 설정 ── */}
        <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border">
            <Moon className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold text-white">앱 설정</h2>
          </div>
          <div className="px-4 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white">다크 모드</p>
              <p className="text-xs text-zinc-500 mt-0.5">{isDark ? '현재: 다크 테마' : '현재: 라이트 테마'}</p>
            </div>
            <Toggle enabled={isDark} onChange={setDark} />
          </div>
        </div>

        {/* ── 개인정보 ── */}
        <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border">
            <Shield className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold text-white">개인정보 설정</h2>
          </div>
          <div className="px-4 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white">AI 모델 학습 허용</p>
              <p className="text-xs text-zinc-500 mt-0.5">내 찜·검색 데이터를 AI 개선에 활용 (익명 처리)</p>
            </div>
            <Toggle enabled={true} onChange={() => {}} />
          </div>
        </div>

        {/* ── 앱 정보 ── */}
        <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-surface-border">
            <h2 className="text-sm font-semibold text-white">앱 정보</h2>
          </div>
          <div className="divide-y divide-surface-border">
            {[
              { label: '버전', value: 'v0.2.0' },
              { label: '서비스 이용약관', value: '' },
              { label: '개인정보 처리방침', value: '' },
              { label: '문의하기', value: 'kitpick@email.com' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between px-4 py-3.5">
                <p className="text-sm text-zinc-300">{item.label}</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm text-zinc-500">{item.value}</p>
                  {!item.value && <ChevronRight className="w-4 h-4 text-zinc-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
