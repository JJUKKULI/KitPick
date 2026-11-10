'use client';

import { useEffect, useState } from 'react';
import { Bell, Moon, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore } from '@/store/themeStore';

const STORAGE_KEY = 'kitpick-settings';
const CONTACT_EMAIL = 'wlrn0078@gmail.com';

interface Prefs {
  priceDrop: boolean;
  reprint: boolean;
  trending: boolean;
  popularity: boolean;
  haptic: boolean;
}
const DEFAULT_PREFS: Prefs = { priceDrop: true, reprint: true, trending: false, popularity: false, haptic: true };

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : DEFAULT_PREFS;
  } catch { return DEFAULT_PREFS; }
}

function vibrate(enabled: boolean) {
  try { if (enabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(15); } catch { /* 미지원 기기 */ }
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${enabled ? 'bg-brand-500' : 'bg-surface-raised border border-surface-border'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { isDark, setDark } = useThemeStore();
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  useEffect(() => { setPrefs(loadPrefs()); }, []);

  const update = (key: keyof Prefs, value: boolean) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* 저장 불가 환경 */ }
    vibrate(key === 'haptic' ? value : next.haptic);
  };

  const sections = [
    {
      title: '알림 설정',
      icon: Bell,
      note: '알림 발송은 준비 중이며, 설정은 미리 저장됩니다',
      items: [
        { label: '가격 하락 알림', desc: '찜한 키트 가격이 내려가면 알림', value: prefs.priceDrop, onChange: (v: boolean) => update('priceDrop', v), soon: true },
        { label: '재판 알림', desc: '찜한 키트 재판 소식', value: prefs.reprint, onChange: (v: boolean) => update('reprint', v), soon: true },
        { label: '트렌딩 알림', desc: '관심 시리즈 트렌딩 진입 시', value: prefs.trending, onChange: (v: boolean) => update('trending', v), soon: true },
        { label: '인기도 변동 알림', desc: '찜한 키트 인기도 급변 시', value: prefs.popularity, onChange: (v: boolean) => update('popularity', v), soon: true },
      ],
    },
    {
      title: '앱 설정',
      icon: Moon,
      note: '',
      items: [
        { label: '다크 모드', desc: isDark ? '현재: 다크 테마' : '현재: 라이트 테마', value: isDark, onChange: (v: boolean) => { setDark(v); vibrate(prefs.haptic); }, soon: false },
        { label: '햅틱 피드백', desc: '버튼 클릭 시 진동 (지원 기기 한정)', value: prefs.haptic, onChange: (v: boolean) => update('haptic', v), soon: false },
      ],
    },
  ];

  const infoRows = [
    { label: '버전', value: 'v0.5.0', href: '' },
    { label: '서비스 이용약관', value: '', href: '/terms' },
    { label: '개인정보 처리방침', value: '', href: '/privacy' },
    { label: '문의하기', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('[KitPick] 문의')}` },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/profile" className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-surface-raised transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-bold text-white">설정</h1>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="bg-surface border border-surface-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border">
              <section.icon className="w-4 h-4 text-zinc-400 shrink-0" />
              <h2 className="text-sm font-semibold text-white">{section.title}</h2>
              {section.note && <span className="ml-auto text-[10px] text-zinc-600">{section.note}</span>}
            </div>
            <div className="divide-y divide-surface-border">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-4 py-4">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-sm text-white flex items-center gap-2">
                      {item.label}
                      {item.soon && <span className="text-[10px] px-1.5 py-0.5 rounded border border-surface-border text-zinc-500">곧 지원</span>}
                    </p>
                    {item.desc && <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>}
                  </div>
                  <Toggle enabled={item.value} onChange={item.onChange} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-surface-border">
            <h2 className="text-sm font-semibold text-white">앱 정보</h2>
          </div>
          <div className="divide-y divide-surface-border">
            {infoRows.map((item) => {
              const inner = (
                <>
                  <p className="text-sm text-zinc-300">{item.label}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-zinc-500">{item.value}</p>
                    {item.href && !item.value && <ChevronRight className="w-4 h-4 text-zinc-600" />}
                  </div>
                </>
              );
              const cls = 'flex items-center justify-between px-4 py-3.5';
              if (!item.href) return <div key={item.label} className={cls}>{inner}</div>;
              if (item.href.startsWith('mailto:')) return <a key={item.label} href={item.href} className={`${cls} hover:bg-surface-raised transition-colors`}>{inner}</a>;
              return <Link key={item.label} href={item.href} className={`${cls} hover:bg-surface-raised transition-colors`}>{inner}</Link>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
