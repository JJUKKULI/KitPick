import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST — 알림 테스트 발송
// body: { type: 'email' | 'browser', alertType: 'price_drop' | 'reprint' | 'trending' | 'popularity' }
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { type, alertType } = await request.json();

  const alertLabels: Record<string, string> = {
    price_drop:  '가격 하락 알림',
    reprint:     '재판 알림',
    trending:    '트렌딩 알림',
    popularity:  '인기도 변동 알림',
  };

  const label = alertLabels[alertType] ?? '알림';

  if (type === 'email') {
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 500 });
    }

    const userEmail = user.email;
    if (!userEmail) return NextResponse.json({ error: 'No email' }, { status: 400 });

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'KitPick <noreply@kitpick.kr>',
        to: [userEmail],
        subject: `[KitPick] ${label} 테스트`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#09090B;color:#F4F4F5;border-radius:12px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:24px;">
              <span style="font-size:20px;font-weight:700;letter-spacing:2px;color:#BE1F35;">KITPICK</span>
            </div>
            <h2 style="font-size:18px;font-weight:600;margin-bottom:8px;">${label} 테스트 이메일</h2>
            <p style="color:#A1A1AA;font-size:14px;line-height:1.6;">
              이 이메일은 <strong style="color:#F4F4F5;">${label}</strong>이 정상적으로 작동하는지 확인하는 테스트 메시지입니다.
            </p>
            <div style="margin:24px 0;padding:16px;background:#16161A;border-radius:8px;border-left:3px solid #BE1F35;">
              <p style="margin:0;font-size:13px;color:#A1A1AA;">
                📦 <strong style="color:#F4F4F5;">RX-78-2 건담 (Revive)</strong> 가격이<br/>
                <span style="color:#22C55E;font-weight:600;">$15.99 → $12.99 (-18.8%)</span> 로 하락했습니다.
              </p>
            </div>
            <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/feed"
               style="display:inline-block;padding:12px 24px;background:#BE1F35;color:white;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
              KitPick에서 확인하기
            </a>
            <p style="margin-top:24px;font-size:12px;color:#52525B;">
              알림 설정은 KitPick 설정 페이지에서 변경할 수 있습니다.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.message ?? 'Resend error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, sent_to: userEmail });
  }

  // browser 타입은 클라이언트에서 직접 처리
  return NextResponse.json({ success: true });
}
