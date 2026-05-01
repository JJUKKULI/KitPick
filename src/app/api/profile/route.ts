import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET — 프로필 조회 (없으면 자동 생성)
export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 프로필 조회 — 없으면 자동 upsert
  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    // profiles 행이 없는 경우 자동 생성
    const username =
      user.user_metadata?.username ??
      user.user_metadata?.full_name ??
      user.email?.split('@')[0] ??
      '사용자';

    const avatar_url = user.user_metadata?.avatar_url ?? null;

    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .upsert({ id: user.id, username, avatar_url }, { onConflict: 'id' })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    profile = newProfile;
  }

  return NextResponse.json({ profile, email: user.email });
}

// PATCH — 닉네임 변경
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { username } = await request.json();

  if (!username || username.trim().length < 2) {
    return NextResponse.json({ error: '닉네임은 2자 이상이어야 합니다.' }, { status: 400 });
  }

  // 중복 체크
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username.trim())
    .neq('id', user.id)
    .maybeSingle();   // .single() → .maybeSingle() 으로 변경 (결과 없어도 에러 안 남)

  if (existing) {
    return NextResponse.json({ error: '이미 사용 중인 닉네임입니다.' }, { status: 409 });
  }

  // upsert — profiles 행이 없는 경우도 처리
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: user.id, username: username.trim(), updated_at: new Date().toISOString() }, { onConflict: 'id' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
