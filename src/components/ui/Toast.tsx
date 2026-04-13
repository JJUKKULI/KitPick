'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  desc?: string;
}

type ToastListener = (msg: ToastMessage) => void;
const listeners: ToastListener[] = [];

export function toast(type: ToastType, title: string, desc?: string) {
  const msg: ToastMessage = { id: Date.now().toString(), type, title, desc };
  listeners.forEach((fn) => fn(msg));
}

const iconMap = { success: CheckCircle, error: XCircle, info: Info };
const colorMap = {
  success: 'border-green-500/30 bg-green-500/10 text-green-400',
  error:   'border-red-500/30   bg-red-500/10   text-red-400',
  info:    'border-blue-500/30  bg-blue-500/10  text-blue-400',
};

function ToastItem({ msg, onRemove }: { msg: ToastMessage; onRemove: (id: string) => void }) {
  const Icon = iconMap[msg.type];
  useEffect(() => {
    const t = setTimeout(() => onRemove(msg.id), 4000);
    return () => clearTimeout(t);
  }, [msg.id, onRemove]);

  return (
    <div className={`flex items-start gap-3 w-80 p-4 rounded-xl border shadow-lg backdrop-blur-sm ${colorMap[msg.type]}`}>
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

export function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const remove = useCallback((id: string) => setMessages((prev) => prev.filter((m) => m.id !== id)), []);

  useEffect(() => {
    const handler: ToastListener = (msg) => setMessages((prev) => [...prev, msg]);
    listeners.push(handler);
    return () => { const i = listeners.indexOf(handler); if (i > -1) listeners.splice(i, 1); };
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-[9999] flex flex-col gap-2 items-end">
      {messages.map((msg) => <ToastItem key={msg.id} msg={msg} onRemove={remove} />)}
    </div>
  );
}
