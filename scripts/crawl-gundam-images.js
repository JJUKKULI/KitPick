#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { chromium } = require('playwright');
const https = require('https');
const http  = require('http');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const NAMU_MAP = {
  'RX-78-2 건담':'건담','샤아 전용 자쿠':'샤아 전용 자쿠','건담 G3':'RX-78-3 건담',
  'RGM-79 짐':'RGM-79 짐','RX-77-2 건캐논':'건캐논','RX-75-4 건탱크':'건탱크',
  'RB-79 볼':'RB-79 볼','육전형 건담':'육전형 건담','MS-06F 자쿠II':'MS-06F 자쿠 II',
  'MS-07B 구프':'구프','MS-09R 릭돔':'릭 돔','MS-14A 겔구그':'겔구그',
  'MSM-07 제고크':'제고크','MSN-02 지옹':'지옹','MA-08 빅잠':'빅 잠',
  'Z건담':'MSZ-006 Z 건담','건담 Mk-II':'건담 Mk-II','백식':'백식(건담 시리즈)',
  '더블 제타':'MSZ-010 ZZ건담','RMS-099 릭디아스':'릭 디아스',
  'MRX-009 사이코 건담':'사이코 건담','ν건담':'RX-93 ν건담','사자비':'MSN-04 사자비',
  '나이팅게일':'나이팅게일(건담 시리즈)','AMS-119 기라 도가':'기라 도가',
  '리가지':'리-GZ','RGM-89 제간':'제간','AMX-014 도벤울프':'도벤 울프',
  'NZ-333 알파 아지엘':'알파 아지엘','AMS-129 기라 즐루후':'기라 즐루후',
  'MSN-065 시넨주':'MSN-06S 시난주','NZ-666 클시':'NZ-666 크샤트리아',
  'YAMS-132 로아잔':'로젠 쥴루','RGZ-95 리제일':'RGZ-95 리제일',
  'F91':'건담 F91','크로스본 건담 X1':'XM-X1 크로스본 건담 X-1',
  '크로스본 건담 X2':'XM-X2 크로스본 건담 X-2','크로스본 건담 X3':'XM-X3 크로스본 건담 X-3',
  '유니콘 건담':'RX-0 유니콘 건담','밴시':'RX-0 유니콘 건담 02 밴시',
  '페넥스':'RX-0 유니콘 건담 03 페넥스','풀 아머 유니콘':'풀 아머 유니콘 건담',
  '프리덤 건담':'ZGMF-X10A 프리덤 건담','스트라이크 건담':'GAT-X105 스트라이크 건담',
  '저스티스 건담':'ZGMF-X09A 저스티스 건담','GAT-X303 이지스':'GAT-X303 이지스 건담',
  'GAT-X102 듀얼':'GAT-X102 듀얼 건담','GAT-X103 버스터':'GAT-X103 버스터 건담',
  'GAT-X207 블리츠':'GAT-X207 블리츠 건담',
  'ZGMF-X13A 프로비던스':'ZGMF-X13A 프로비던스 건담',
  'ZGMF-1017 모빌 진':'ZGMF-1017 진','데스티니 건담':'ZGMF-X42S 데스티니 건담',
  '스트라이크 프리덤':'ZGMF-X20A 스트라이크 프리덤 건담',
  '인피니트 저스티스':'ZGMF-X19A 인피니트 저스티스 건담',
  '임펄스 건담':'ZGMF-X56S 임펄스 건담','ZGMF-X88S 가이아':'ZGMF-X88S 가이아 건담',
  'ZGMF-1000 자쿠 워리어':'ZGMF-1000 자쿠 워리어','GAT-04 윈담':'GAT-04 윈담',
  'GAT-01 스트라이크 대거':'GAT-01 스트라이크 대거',
  '윙 건담':'XXXG-01W 윙 건담','윙 건담 EW':'XXXG-01W 윙 건담',
  '윙 건담 제로':'XXXG-00W0 윙 건담 제로','건담 데스사이즈':'XXXG-01D 건담 데스사이즈',
  '건담 헤비암즈':'XXXG-01H 건담 헤비암즈','건담 샌드록':'XXXG-01SR 건담 샌드록',
  '나타쿠(샌롱 건담)':'XXXG-01S2 나타쿠','툴기스':'OZ-00MS 톨기스',
  'OZ-06MS 리오':'OZ-06MS 리오','건담 X':'GX-9900 건담 X',
  '건담 더블X':'GX-9901-DX 건담 더블X','건담 레오파르드':'GT-9600 건담 레오파르드',
  '건담 에어마스터':'GW-9800 건담 에어마스터',
  '건담 엑시아':'GN-001 건담 엑시아','더블오 건담':'GN-0000 더블오 건담',
  '더블오 라이저':'더블오 라이저','건담 큐리오스':'GN-003 건담 큐리오스',
  '건담 바체':'GN-005 건담 버츄','00 퀀타':'GNT-0000 더블오 콴트',
  'GNX-603T 지린':'GNX-603T GN-X','SVMS-01 유니온 플래그':'SVMS-01 유니온 플래그',
  'AEU-09 에어리온':'AEU-09 에나쿠트',
  'EB-06 그레이즈':'EB-06 그레이즈','EB-06r 그레이즈 리터':'EB-06r 그레이즈 리터',
  'V08-1228 슈발베 그레이즈':'슈발베 그레이즈',
  '건담 바르바토스':'ASW-G-08 건담 바르바토스',
  '건담 바르바토스 루프스':'건담 바르바토스 루프스',
  '건담 바르바토스 루프스 렉스':'건담 바르바토스 루프스 렉스',
  '건담 킴바리스':'ASW-G-66 건담 킴바리스','건담 구시온':'ASW-G-11 건담 구션',
  '건담 플라우로스':'ASW-G-64 건담 플라우로스',
  '건담 에어리얼':'건담 에어리얼','건담 에어리얼 개수형':'건담 에어리얼 개수형',
  '건담 루브리스':'건담 류브리스','건담 캘리번':'건담 칼리번','건담 팔세토':'건담 팔세토',
  '빌드 스트라이크 건담':'빌드 스트라이크 건담',
  '스타 빌드 스트라이크':'스타 빌드 스트라이크 건담',
  '트라이 버닝 건담':'트라이 버닝 건담','레이징 건담':'레이징 건담',
  '건담 엑시아 다크 매터':'건담 엑시아 다크 마터',
};

function normalizeUrl(url) {
  if (!url) return null;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return 'https://namu.wiki' + url;
  if (!url.startsWith('http')) return null;
  return url;
}

function downloadImage(rawUrl) {
  const url = normalizeUrl(rawUrl);
  if (!url) return Promise.resolve(null);
  return new Promise((resolve) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://namu.wiki/',
        'Accept': 'image/*,*/*',
      },
      timeout: 20000,
    }, (res) => {
      if (res.statusCode >= 300 && res.headers.location) {
        downloadImage(res.headers.location).then(resolve); return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', () => resolve(null)).on('timeout', () => resolve(null));
  });
}

async function uploadAndSave(id, name, buf, ext) {
  const mime = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  const safeName = name
    .replace(/[^a-zA-Z0-9가-힣]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  const path = `gundams/${safeName}.${ext}`;
  const { error } = await supabase.storage
    .from('gundam-images').upload(path, buf, { contentType: mime, upsert: true });
  if (error) { console.log(`  Storage오류: ${error.message}`); return null; }
  const { data: { publicUrl } } = supabase.storage.from('gundam-images').getPublicUrl(path);
  await supabase.from('gundams').update({ image_url: publicUrl }).eq('id', id);
  return publicUrl;
}

async function getOgImage(page, url) {
  // 1. domcontentloaded로 빠르게 로드 (networkidle은 나무위키에서 타임아웃 남)
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

  // 2. og:image 메타태그가 생길 때까지 최대 8초 대기
  try {
    await page.waitForFunction(
      () => {
        const el = document.querySelector('meta[property="og:image"]');
        return el && el.getAttribute('content') && el.getAttribute('content').length > 10;
      },
      { timeout: 8000 }
    );
  } catch { /* 8초 내 안 나타나면 그냥 진행 */ }

  // 3. 여러 방법으로 이미지 URL 추출
  return page.evaluate(() => {
    // og:image 우선
    const og = document.querySelector('meta[property="og:image"]');
    const ogVal = og?.getAttribute('content');
    if (ogVal && ogVal.length > 10) return ogVal;

    // twitter:image
    const tw = document.querySelector('meta[name="twitter:image"], meta[property="twitter:image"]');
    const twVal = tw?.getAttribute('content');
    if (twVal && twVal.length > 10) return twVal;

    // i.namu.wiki 이미지 직접 탐색 (인포박스 영역 우선)
    const namuImgs = [...document.querySelectorAll('img')]
      .filter(img => img.src && img.src.includes('i.namu.wiki') && !img.src.includes('favicon'))
      .sort((a, b) => (b.naturalWidth || 0) - (a.naturalWidth || 0)); // 큰 이미지 우선
    if (namuImgs.length > 0) return namuImgs[0].src;

    return null;
  });
}

async function main() {
  console.log('🚀 KitPick 이미지 수집 (Playwright + 나무위키)\n');
  await supabase.storage.createBucket('gundam-images', { public: true }).catch(() => {});
  console.log('✅ 버킷 준비\n');

  const { data: gundams } = await supabase
    .from('gundams').select('id, name, image_url').is('image_url', null);

  if (!gundams?.length) { console.log('처리할 기체 없음'); return; }
  console.log(`${gundams.length}개 기체 처리 시작\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'ko-KR',
    extraHTTPHeaders: { 'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8' },
  });
  const page = await context.newPage();

  let ok = 0, skip = 0, fail = 0;

  for (const g of gundams) {
    const namuTitle = NAMU_MAP[g.name];
    if (!namuTitle) { console.log(`⚠️  매핑 없음: ${g.name}`); skip++; continue; }

    process.stdout.write(`⏳ ${g.name} ... `);
    try {
      const namuUrl = `https://namu.wiki/w/${encodeURIComponent(namuTitle)}`;
      const imgUrl  = await getOgImage(page, namuUrl);

      if (!imgUrl) { console.log('이미지 없음'); fail++; continue; }

      const finalUrl = normalizeUrl(imgUrl);
      if (!finalUrl) { console.log('URL 변환 실패'); fail++; continue; }

      const buf = await downloadImage(finalUrl);
      if (!buf || buf.length < 500) {
        console.log(`다운로드 실패 (${buf?.length || 0}B)`); fail++; continue;
      }

      const rawExt = (finalUrl.split('.').pop()?.split(/[?#]/)[0] || 'jpg').toLowerCase();
      const ext = ['jpg','jpeg','png','webp'].includes(rawExt)
        ? (rawExt === 'jpeg' ? 'jpg' : rawExt) : 'jpg';

      const pubUrl = await uploadAndSave(g.id, g.name, buf, ext);
      if (pubUrl) { console.log(`✅ (${(buf.length/1024).toFixed(0)}KB)`); ok++; }
      else { fail++; }

    } catch (e) {
      console.log(`❌ ${String(e.message).slice(0, 80)}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 1200));
  }

  await browser.close();
  console.log(`\n완료: ✅${ok} / ⚠️${skip}스킵 / ❌${fail}실패`);
}
main().catch(console.error);
