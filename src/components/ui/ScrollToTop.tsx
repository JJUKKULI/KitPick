'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById('main-scroll');

    function check() {
      // main-scroll 있으면 그걸로, 없으면 window (랜딩페이지)
      const scrollY = el ? el.scrollTop : window.scrollY;
      setVisible(scrollY > 300);
    }

    if (el) {
      el.addEventListener('scroll', check, { passive: true });
    }
    // 랜딩처럼 main-scroll 없는 페이지 대비해 window도 항상 감지
    window.addEventListener('scroll', check, { passive: true });

    // 마운트 시 즉시 한 번 체크 (새로고침 후 이미 스크롤된 경우 대비)
    check();

    return () => {
      el?.removeEventListener('scroll', check);
      window.removeEventListener('scroll', check);
    };
  }, []);

  function scrollTop() {
    const el = document.getElementById('main-scroll');
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      className="fixed bottom-24 right-5 z-50 md:bottom-8 md:right-8 w-11 h-11 rounded-full bg-surface-overlay border border-surface-border-light text-zinc-300 hover:text-white hover:bg-brand-500 hover:border-brand-500 shadow-lg shadow-black/30 flex items-center justify-center transition-all duration-200 animate-fade-in"
      aria-label="맨 위로"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
