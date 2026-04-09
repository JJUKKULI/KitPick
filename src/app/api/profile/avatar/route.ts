import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST — 아바타 이미지 업로드
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('avatar') as File | null;

  if (!file) {
    return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
  }

  // 파일 타입 검증
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'JPG, PNG, WEBP, GIF만 업로드 가능합니다.' }, { status: 400 });
  }

  // 파일 크기 제한 (2MB)
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: '파일 크기는 2MB 이하여야 합니다.' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${user.id}/avatar.${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  // Supabase Storage에 업로드 (upsert로 덮어쓰기)
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Public URL 가져오기
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(path);

  // 캐시 버스팅을 위해 타임스탬프 추가
  const avatarUrl = `${publicUrl}?t=${Date.now()}`;

  // profiles 테이블 업데이트
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: avatarUrl })
    .eq('id', user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ avatar_url: avatarUrl });
}

// DELETE — 아바타 삭제 (기본 이니셜로 되돌리기)
export async function DELETE() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Storage에서 삭제 시도 (없어도 에러 무시)
  await supabase.storage.from('avatars').remove([`${user.id}/avatar.jpg`, `${user.id}/avatar.png`, `${user.id}/avatar.webp`]);

  // profiles 테이블 avatar_url null로
  await supabase.from('profiles').update({ avatar_url: null }).eq('id', user.id);

  return NextResponse.json({ success: true });
}
