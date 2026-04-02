import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET — 설정 조회
export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ settings: data });
}

// PUT — 설정 저장
export async function PUT(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { price_drop_alert, reprint_alert, trending_alert, popularity_alert } = body;

  const { error } = await supabase
    .from('user_settings')
    .upsert({
      user_id: user.id,
      price_drop_alert,
      reprint_alert,
      trending_alert,
      popularity_alert,
      updated_at: new Date().toISOString(),
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
