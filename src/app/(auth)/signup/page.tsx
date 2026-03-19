'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'verify'>('form');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [username, setUsername] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const pwStrength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : 3;

  const strengthLabel = ['', '약함', '보통', '강함'];
  const strengthColor = ['', 'bg-brand-500', 'bg-decision-wait', 'bg-decision-buy'];

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPw) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(
        error.message.includes('already registered')
          ? '이미 사용 중인 이메일입니다.'
          : error.message
      );
      setLoading(false);
      return;
    }

    setStep('verify');
    setLoading(false);
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  // ── 인증 메일 발송 완료 화면 ──
  if (step === 'verify') {
    return (
      <div className="w-full max-w-md">
        <div className="bg-surface border border-surface-border rounded-2xl p-8 shadow-2xl shadow-black/30 text-center">
          <div className="w-16 h-16 bg-decision-buy/10 border border-decision-buy/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-decision-buy" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">이메일을 확인해주세요</h2>
          <p className="text-sm text-zinc-400 mb-2">
            <span className="text-white font-medium">{email}</span>으로
          </p>
          <p className="text-sm text-zinc-400 mb-8">
            인증 링크를 보냈습니다. 링크를 클릭하면 로그인이 완료됩니다.
          </p>
          <Link
            href="/login"
            className="inline-block w-full bg-surface-raised hover:bg-surface-overlay border border-surface-border rounded-xl py-3 text-sm font-medium text-white transition-colors"
          >
            로그인 페이지로
          </Link>
          <p className="text-xs text-zinc-600 mt-4">
            메일이 오지 않으면 스팸함을 확인해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-surface border border-surface-border rounded-2xl p-8 shadow-2xl shadow-black/30">

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">회원가입</h1>
          <p className="text-sm text-zinc-400">프라모델 구매 결정, 더 스마트하게</p>
        </div>

        {/* 구글 회원가입 */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface-raised hover:bg-surface-overlay border border-surface-border hover:border-surface-border-light rounded-xl text-sm font-medium text-white transition-all mb-6 disabled:opacity-50"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          Google로 시작하기
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-surface-border" />
          <span className="text-xs text-zinc-600">또는 이메일로 가입</span>
          <div className="flex-1 h-px bg-surface-border" />
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* 닉네임 */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">닉네임</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="건담빌더"
              required
              className="w-full bg-surface-raised border border-surface-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-surface-raised border border-surface-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">비밀번호</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6자 이상"
                required
                className="w-full bg-surface-raised border border-surface-border rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* 비밀번호 강도 */}
            {password.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        pwStrength >= i ? strengthColor[pwStrength] : 'bg-surface-raised'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-zinc-500">
                  강도: <span className="text-white">{strengthLabel[pwStrength]}</span>
                </p>
              </div>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">비밀번호 확인</label>
            <input
              type={showPw ? 'text' : 'password'}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="••••••••"
              required
              className={`w-full bg-surface-raised border rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 transition-all ${
                confirmPw && confirmPw !== password
                  ? 'border-brand-500 focus:ring-brand-500/30'
                  : confirmPw && confirmPw === password
                  ? 'border-decision-buy focus:ring-decision-buy/20'
                  : 'border-surface-border focus:border-brand-500 focus:ring-brand-500/30'
              }`}
            />
          </div>

          {/* 에러 */}
          {error && (
            <div className="px-4 py-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-sm text-brand-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : '가입하기'}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
