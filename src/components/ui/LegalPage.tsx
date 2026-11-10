import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string }[] }) {
  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/settings" className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-surface-raised transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
      <p className="text-xs text-zinc-600 mb-6 ml-11">시행일 {updated} · 졸업프로젝트 시범 서비스</p>
      <div className="bg-surface border border-surface-border rounded-xl divide-y divide-surface-border">
        {sections.map((s, i) => (
          <div key={s.h} className="px-5 py-4">
            <h2 className="text-sm font-semibold text-white mb-1.5">제{i + 1}조 {s.h}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
