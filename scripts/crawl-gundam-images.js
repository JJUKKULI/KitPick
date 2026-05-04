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
  'RX-78-2 건담':'건담',
  '샤아 전용 자쿠':'샤아 전용 자쿠II',
  '건담 G3':'RX-78-3 건담(G3 건담)',
  'RGM-79 짐':'짐(기동전사 건담)',
  'RX-77-2 건캐논':'건캐논',
  'RX-75-4 건탱크':'건탱크',
  'RB-79 볼':'볼(기동전사 건담)',
  '육전형 건담':'육전형 건담',
  'MS-06F 자쿠II':'자쿠II',
  'MS-07B 구프':'구프',
  'MS-09R 릭돔':'릭 돔',
  'MS-14A 겔구그':'겔구그',
  'MSM-07 제고크':'제고크',
  'MSN-02 지옹':'지옹',
  'MA-08 빅잠':'빅 잠',
  'Z건담':'Z건담',
  '건담 Mk-II':'건담 Mk-II',
  '백식':'백식',
  '더블 제타':'ZZ건담',
  'RMS-099 릭디아스':'릭 디아스',
  'MRX-009 사이코 건담':'사이코 건담',
  'MSA-003 네모':'네모(기동전사 Z건담)',
  'RMS-106 하이잭':'하이잭',
  'RMS-108 마라사이':'마라사이',
  'ORX-005 가프랑':'가프랑',
  'NRX-055 바운드독':'바운드 독',
  'ν건담':'뉴건담',
  '사자비':'사자비',
  '나이팅게일':'나이팅게일(기동전사 건담 역습의 샤아)',
  '리가지':'리가지',
  'RGM-89 제간':'제간',
  'AMS-119 기라 도가':'기라 도가',
  'AMX-014 도벤울프':'도벤 울프',
  'NZ-333 알파 아지엘':'알파 아지엘',
  'F91':'건담 F91',
  '크로스본 건담 X1':'크로스본 건담 X1',
  '크로스본 건담 X2':'크로스본 건담 X2',
  '크로스본 건담 X3':'크로스본 건담 X3',
  '유니콘 건담':'유니콘 건담',
  '밴시':'밴시 노른',
  '페넥스':'유니콘건담 03 페넥스',
  '풀 아머 유니콘':'풀 아머 유니콘건담',
  'MSN-065 시넨주':'시난주',
  'NZ-666 클시':'크샤트리아',
  'AMS-129 기라 즐루후':'기라 즐루후(기동전사 건담 UC)',
  'YAMS-132 로아잔':'로젠 줄루',
  'RGZ-95 리제일':'리제일',
  '프리덤 건담':'프리덤 건담',
  '스트라이크 건담':'스트라이크 건담',
  '저스티스 건담':'저스티스 건담',
  'GAT-X303 이지스':'이지스 건담',
  'GAT-X102 듀얼':'듀얼 건담',
  'GAT-X103 버스터':'버스터 건담',
  'GAT-X207 블리츠':'블리츠 건담',
  'ZGMF-X13A 프로비던스':'프로비던스 건담',
  'ZGMF-1017 모빌 진':'진(기동전사 건담 SEED)',
  'GAT-01 스트라이크 대거':'스트라이크 대거',
  '데스티니 건담':'데스티니 건담',
  '스트라이크 프리덤':'스트라이크 프리덤 건담',
  '인피니트 저스티스':'인피니트 저스티스 건담',
  '임펄스 건담':'임펄스 건담',
  'ZGMF-X88S 가이아':'가이아 건담',
  'ZGMF-1000 자쿠 워리어':'자쿠 워리어',
  'GAT-04 윈담':'윈담',
  '윙 건담':'윙 건담',
  '윙 건담 EW':'윙 건담',
  '윙 건담 제로':'윙 건담 제로',
  '건담 데스사이즈':'건담 데스사이즈',
  '건담 헤비암즈':'건담 헤비암즈',
  '건담 샌드록':'건담 샌드록',
  '나타쿠(샌롱 건담)':'알트론 건담',
  '툴기스':'톨기스',
  'OZ-06MS 리오':'리오(건담 W)',
  '건담 X':'건담 X(등장 메카)',
  '건담 더블X':'건담 더블 X',
  '건담 레오파르드':'건담 레오파르드',
  '건담 에어마스터':'건담 에어마스터',
  '건담 엑시아':'건담 엑시아',
  '더블오 건담':'더블오 건담',
  '더블오 라이저':'더블오 라이저',
  '건담 큐리오스':'건담 큐리오스',
  '건담 바체':'건담 버츄',
  '00 퀀타':'더블오 콴트(건담)',
  'GNX-603T 지린':'GN-X',
  'SVMS-01 유니온 플래그':'유니온 플래그',
  'AEU-09 에어리온':'이나쿠트',
  '빌드 스트라이크 건담':'빌드 스트라이크 건담',
  '스타 빌드 스트라이크':'스타 빌드 스트라이크 건담',
  '레이징 건담':'레이징 건담',
  '건담 엑시아 다크 매터':'건담 엑시아 다크 마터',
  '트라이 버닝 건담':'트라이 버닝 건담',
  '건담 바르바토스':'건담 바르바토스',
  '건담 바르바토스 루프스':'바르바토스 루프스',
  '건담 바르바토스 루프스 렉스':'바르바토스 루프스 렉스',
  '건담 킴바리스':'건담 킴바리스',
  '건담 구시온':'건담 구시온',
  '건담 플라우로스':'건담 플라우로스',
  'EB-06 그레이즈':'그레이즈',
  'EB-06r 그레이즈 리터':'그레이즈 리터',
  'V08-1228 슈발베 그레이즈':'슈발베 그레이즈',
  '건담 에어리얼':'건담 에어리얼',
  '건담 에어리얼 개수형':'건담 에어리얼 개수형',
  '건담 루브리스':'건담 루브리스',
  '건담 캘리번':'건담 캘리번',
  '건담 팔세토':'건담 팔세토',
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
  // Supabase Storage는 한글 파일명 거부 → UUID(id) 사용
  const path = `gundams/${id}.${ext}`;
  const { error } = await supabase.storage
    .from('gundam-images').upload(path, buf, { contentType: mime, upsert: true });
  if (error) { console.log(`  Storage오류: ${error.message}`); return null; }
  const { data: { publicUrl } } = supabase.storage.from('gundam-images').getPublicUrl(path);
  await supabase.from('gundams').update({ image_url: publicUrl }).eq('id', id);
  return publicUrl;
}

async function getOgImage(page, url) {
  // 1. load 이벤트까지 대기 (domcontentloaded보다 늦고 networkidle보다 빠름)
  await page.goto(url, { waitUntil: 'load', timeout: 25000 });
  // 2. JS 렌더링 여유 시간 (namu wiki SPA 메타태그 주입 대기)
  await page.waitForTimeout(3000);

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
      if (!buf || buf.length < 3000) {
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
