import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/feed';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // OAuth 로그인(Google 등) 후 profiles 행 없으면 자동 생성
      const user = data.user;
      const username =
        user.user_metadata?.username ??
        user.user_metadata?.full_name ??
        user.email?.split('@')[0] ??
        '사용자';
      const avatar_url = user.user_metadata?.avatar_url ?? null;

      await supabase
        .from('profiles')
        .upsert(
          { id: user.id, username, avatar_url },
          { onConflict: 'id', ignoreDuplicates: true }
        );

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
