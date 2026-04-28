# KitPick Cron & 크롤러 설정 가이드

## 1. Supabase SQL 실행 순서

```sql
-- SQL Editor에서 순서대로 실행
1. migration_v6.sql              -- 기존 건담 테이블
2. migration_v7.sql              -- price_history_daily + community_stats 추가
3. seed_gundam.sql               -- 기본 시드
4. seed_gundam_full.sql          -- 131개 기체
5. seed_grades_accurate.sql      -- 정가 수정
6. seed_releases_real.sql        -- 115개 기체 실제 발매 등급 217개
```

## 2. 환경변수 추가 (.env.local + Vercel Dashboard)

```bash
# 기존 환경변수 외 추가
CRON_SECRET=your-random-secret-string   # Cron 인증용 (openssl rand -hex 32)
```

## 3. Vercel 배포

```bash
git add .
git commit -m "feat: add Vercel Cron + community crawler"
git push
```

Vercel이 `vercel.json`을 읽어 자동으로 Cron 등록:
- **매일 03:00 KST** → `/api/cron/update-prices` (가격 자동 수집)
- **매주 월/목 04:00 KST** → `/api/cron/crawl-community` (루리웹 크롤링)

## 4. 수동 실행 (테스트)

### 가격 수집 (로컬)
```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
     http://localhost:3000/api/cron/update-prices
```

### 커뮤니티 크롤링 (로컬)
```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
     http://localhost:3000/api/cron/crawl-community
```

## 5. 동작 확인

Supabase SQL Editor에서:
```sql
-- 오늘 수집된 가격 데이터
SELECT g.name, gg.grade, phd.price, phd.mall_name, phd.recorded_at
FROM price_history_daily phd
JOIN gundam_grades gg ON gg.id = phd.grade_id
JOIN gundams g ON g.id = gg.gundam_id
WHERE phd.recorded_at = CURRENT_DATE
ORDER BY phd.created_at DESC;

-- 최근 커뮤니티 통계
SELECT g.name, cs.mention_count, 
       cs.sentiment_positive, cs.sentiment_negative,
       cs.collected_at
FROM community_stats cs
JOIN gundams g ON g.id = cs.gundam_id
ORDER BY cs.collected_at DESC
LIMIT 20;
```

## 6. Cron 스케줄 커스터마이징

`vercel.json` 수정:
```json
{
  "crons": [
    { "path": "/api/cron/update-prices", "schedule": "0 3 * * *" },        // 매일 03시
    { "path": "/api/cron/crawl-community", "schedule": "0 4 * * 1,4" }     // 월/목 04시
  ]
}
```

**Vercel Hobby 플랜 제한**: Cron은 일 2회까지 무료, 그 이상은 Pro 플랜 필요.

## 7. 페이지에 반영되는 내용

### 등급 상세 페이지 (`/gundam/[id]/[gradeId]`)
- **가격 추이 차트**: `price_history_daily` 2일 이상 쌓이면 실데이터로 자동 교체
- **커뮤니티 주요 의견**: 루리웹 상위 3개 게시물 링크 + 추천수 + 조회수
- **여론 분포**: 긍정/중립/부정 자동 계산값 반영
