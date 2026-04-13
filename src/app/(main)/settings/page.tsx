'use client';

import { Bell, Moon, Shield, Vibrate, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore } from '@/store/themeStore';

interface ToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${enabled ? 'bg-brand-500' : 'bg-surface-raised border border-surface-border'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { isDark, setDark } = useThemeStore();

  const sections = [
    {
      title: '알림 설정',
      icon: Bell,
      items: [
        { label: '가격 하락 알림', desc: '찜한 키트 가격이 내려가면 알림', value: true, onChange: (_v: boolean) => {} },
        { label: '재판 알림', desc: '찜한 키트 재판 소식', value: true, onChange: (_v: boolean) => {} },
        { label: '트렌딩 알림', desc: '관심 시리즈 트렌딩 진입 시', value: false, onChange: (_v: boolean) => {} },
        { label: '인기도 변동 알림', desc: '찜한 키트 인기도 급변 시', value: false, onChange: (_v: boolean) => {} },
      ],
    },
    {
      title: '앱 설정',
      icon: Moon,
      items: [
        {
          label: '다크 모드',
          desc: isDark ? '현재: 다크 테마' : '현재: 라이트 테마',
          value: isDark,
          onChange: setDark,
        },
        {
          label: '햅틱 피드백',
          desc: '버튼 클릭 시 진동',
          value: true,
          onChange: (_v: boolean) => {},
        },
      ],
    },
    {
      title: '개인정보 설정',
      icon: Shield,
      items: [
        {
          label: 'AI 모델 학습 허용',
          desc: '내 찜·검색 데이터를 AI 개선에 활용 (익명 처리)',
          value: true,
          onChange: (_v: boolean) => {},
        },
      ],
    },
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
            </div>
            <div className="divide-y divide-surface-border">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-4 py-4">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-sm text-white">{item.label}</p>
                    {item.desc && <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>}
                  </div>
                  <Toggle enabled={item.value} onChange={item.onChange} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 앱 정보 */}
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
