'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

// ─── 타입 ──────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  desc?: string;
}

// ─── 전역 토스트 이벤트 버스 ───────────────────────────────────────────────
type ToastListener = (msg: ToastMessage) => void;
const listeners: ToastListener[] = [];

export function toast(type: ToastType, title: string, desc?: string) {
  const msg: ToastMessage = { id: Date.now().toString(), type, title, desc };
  listeners.forEach((fn) => fn(msg));
}

// ─── 토스트 단일 아이템 ───────────────────────────────────────────────────
const iconMap = {
  success: CheckCircle,
  error:   XCircle,
  info:    Info,
};

const colorMap = {
  success: 'border-decision-buy/30  bg-decision-buy/10  text-decision-buy',
  error:   'border-brand-500/30     bg-brand-500/10     text-brand-400',
  info:    'border-decision-watch/30 bg-decision-watch/10 text-decision-watch',
};

function ToastItem({ msg, onRemove }: { msg: ToastMessage; onRemove: (id: string) => void }) {
  const Icon = iconMap[msg.type];

  useEffect(() => {
    const t = setTimeout(() => onRemove(msg.id), 4000);
    return () => clearTimeout(t);
  }, [msg.id, onRemove]);

  return (
    <div className={`flex items-start gap-3 w-80 p-4 rounded-xl border shadow-lg backdrop-blur-sm animate-slide-up ${colorMap[msg.type]}`}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-100">{msg.title}</p>
        {msg.desc && <p className="text-xs text-zinc-400 mt-0.5">{msg.desc}</p>}
      </div>
      <button onClick={() => onRemove(msg.id)} className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── 토스트 컨테이너 (layout에 1번 추가) ──────────────────────────────────
export function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const remove = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  useEffect(() => {
    const handler: ToastListener = (msg) => setMessages((prev) => [...prev, msg]);
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-[9999] flex flex-col gap-2 items-end">
      {messages.map((msg) => (
        <ToastItem key={msg.id} msg={msg} onRemove={remove} />
      ))}
    </div>
  );
}
