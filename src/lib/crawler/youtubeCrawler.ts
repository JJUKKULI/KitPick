import type { CrawledArticle } from '@/lib/crawler/types';
import { extractTags, extractProductName, isRecent } from '@/lib/crawler/utils';

// ── 건프라/피규어 유튜버 채널 ID ─────────────────────────────────────────
// 채널명으로 검색하거나 직접 채널 ID 입력
const CHANNELS = [
  { name: '지식공장장',  handle: '지식공장장',  searchQuery: '건프라 지식공장장' },
  { name: '후디덕덕',    handle: '후디덕덕',    searchQuery: '건프라 후디덕덕' },
  { name: '동찌',        handle: '동찌',        searchQuery: '건프라 동찌' },
  { name: '애니캐스트',  handle: '애니캐스트',  searchQuery: '건프라 피규어 애니캐스트' },
  { name: '위키피규어',  handle: '위키피규어',  searchQuery: '피규어 위키피규어' },
  { name: 'SD HOBBY',    handle: 'SDHOBBY',     searchQuery: '건프라 SDHOBBY' },
];

const YT_API_BASE = 'https://www.googleapis.com/youtube/v3';

// ── YouTube API: 채널 최신 영상 검색 ─────────────────────────────────────
async function fetchChannelVideos(
  apiKey: string,
  channelName: string,
  searchQuery: string,
  maxResults = 5,
): Promise<{ videoId: string; title: string; description: string; publishedAt: string }[]> {
  const params = new URLSearchParams({
    part:       'snippet',
    type:       'video',
    q:          searchQuery,
    maxResults: String(maxResults),
    order:      'date',
    key:        apiKey,
    regionCode: 'KR',
    relevanceLanguage: 'ko',
  });
  try {
    const res = await fetch(`${YT_API_BASE}/search?${params}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items ?? []).map((item: any) => ({
      videoId:     item.id?.videoId ?? '',
      title:       item.snippet?.title ?? '',
      description: item.snippet?.description ?? '',
      publishedAt: item.snippet?.publishedAt ?? '',
    })).filter((v: any) => v.videoId);
  } catch { return []; }
}

// ── YouTube 자막 추출 (자동 자막 timedtext API) ───────────────────────────
async function fetchTranscript(videoId: string): Promise<string> {
  try {
    // 자동 자막 URL (한국어 우선)
    const urls = [
      `https://www.youtube.com/api/timedtext?lang=ko&v=${videoId}&fmt=json3`,
      `https://www.youtube.com/api/timedtext?lang=ko-KR&v=${videoId}&fmt=json3`,
    ];
    for (const url of urls) {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.events?.length) continue;
      // 텍스트 추출 및 합치기
      const text = data.events
        .flatMap((e: any) => e.segs?.map((s: any) => s.utf8) ?? [])
        .join(' ')
        .replace(/\n/g, ' ')
        .trim()
        .slice(0, 2000); // 최대 2000자 (GPT 토큰 절약)
      if (text.length > 50) return text;
    }
    // 자막 없으면 description 사용
    return '';
  } catch { return ''; }
}

// ── GPT로 영상 내용 요약 + 제품 정보 추출 ─────────────────────────────────
async function summarizeWithGPT(
  openaiKey: string,
  title: string,
  description: string,
  transcript: string,
): Promise<{ summary: string; product: string | null; price: string | null; tags: string[] }> {
  const content = transcript || description;
  if (!content || content.length < 30) {
    return { summary: description.slice(0, 200) || title, product: extractProductName(title), price: null, tags: extractTags(title) };
  }

  const prompt = `다음은 건프라/피규어 유튜브 영상 제목과 내용이다.
제목: ${title}
내용: ${content.slice(0, 1500)}

아래 JSON 형식으로만 응답해:
{
  "summary": "영상 핵심 내용 2~3문장 요약 (한국어)",
  "product": "언급된 주요 제품명 (없으면 null)",
  "price": "언급된 가격 (없으면 null)",
  "tags": ["관련 태그 최대 5개"]
}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 300,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: '건프라/피규어 전문 분석기. JSON만 출력.' },
          { role: 'user', content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error('GPT error');
    const data = await res.json();
    const result = JSON.parse(data.choices?.[0]?.message?.content ?? '{}');
    return {
      summary: result.summary || description.slice(0, 200),
      product: result.product || extractProductName(title),
      price:   result.price || null,
      tags:    Array.isArray(result.tags) ? result.tags : extractTags(title),
    };
  } catch {
    return { summary: description.slice(0, 200) || title, product: extractProductName(title), price: null, tags: extractTags(title) };
  }
}

// ── 메인 YouTube 크롤러 ───────────────────────────────────────────────────
export async function crawlYoutube(recentDays = 30): Promise<CrawledArticle[]> {
  const ytApiKey  = process.env.YOUTUBE_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!ytApiKey) {
    console.warn('[youtube] YOUTUBE_API_KEY 없음 — YouTube 크롤링 스킵');
    return [];
  }

  const results: CrawledArticle[] = [];

  for (const channel of CHANNELS) {
    try {
      const videos = await fetchChannelVideos(ytApiKey, channel.name, channel.searchQuery, 5);

      for (const video of videos) {
        if (!isRecent(video.publishedAt, recentDays)) continue;

        // 건프라/피규어 관련 영상만 필터
        const relevant = ['건프라', '건담', '프라모델', '피규어', 'HG', 'MG', 'RG', 'PG', '조립', '리뷰'].some(
          k => video.title.includes(k) || video.description.includes(k)
        );
        if (!relevant) continue;

        // 자막 추출 (가능한 경우)
        const transcript = await fetchTranscript(video.videoId);

        // GPT 요약 (API 키 있는 경우)
        const analyzed = openaiKey
          ? await summarizeWithGPT(openaiKey, video.title, video.description, transcript)
          : { summary: video.description.slice(0, 200) || video.title, product: extractProductName(video.title), price: null, tags: extractTags(video.title) };

        // 게시일 포맷
        const d = new Date(video.publishedAt);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
        const postedAt = diffDays === 0 ? '오늘' : diffDays === 1 ? '어제' : `${diffDays}일 전`;

        results.push({
          source:        'youtube',
          source_name:   channel.name,
          category:      'review',
          title:         video.title,
          product:       analyzed.product,
          release_date:  null,
          price:         analyzed.price,
          summary:       analyzed.summary,
          source_url:    `https://www.youtube.com/watch?v=${video.videoId}`,
          tags:          ['유튜브', channel.name, ...analyzed.tags],
          posted_at:     postedAt,
          is_hot:        diffDays <= 3,  // 3일 이내는 HOT
          comment_count: 0,
        });
      }

      // YouTube API 할당량 보호 (채널 간 딜레이)
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`[youtube:${channel.name}]`, e);
    }
  }

  return results;
}
