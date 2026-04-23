-- =====================================================
-- KitPick 전체 기체 데이터 추가 (표 기반)
-- seed_gundam.sql 실행 후 이 파일 실행
-- =====================================================

-- ─── 누락 시리즈 추가 ─────────────────────────────────────────────────────

INSERT INTO public.gundam_series (name, short_name, description, year, display_order) VALUES
('기동전사 크로스본 건담', '크로스본 건담', '우주세기 0133년. 크로스본 뱅가드와 목성제국의 전쟁. 킨케두 나우와 크로스본 건담의 이야기.', 1994, 35),
('기동신세기 건담 X', '건담 X', '애프터워 시대. 뉴타입과 가로드 란, 그리고 건담 X의 이야기.', 1996, 40),
('기동전사 건담 빌드 파이터즈', '빌드 파이터즈', '건담 플라모델로 대전하는 미래. 이오리 세이와 레이지의 열정 스토리.', 2013, 85)
ON CONFLICT (name) DO NOTHING;

-- ─── 퍼스트 건담 기체 추가 ───────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='퍼스트 건담')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), 'RGM-79 짐', 'RGM-79 짐', '지구연방군 병사', '지구연방군의 주력 양산형 MS. RX-78을 바탕으로 생산성을 높인 보급형 기체.', false),
((SELECT id FROM s), 'RX-77-2 건캐논', 'RX-77-2 건캐논', '카이 시덴', '중거리 지원용 건담. 어깨의 캐논포가 특징.', false),
((SELECT id FROM s), 'RX-75-4 건탱크', 'RX-75-4 건탱크', '하야토 코바야시', '장거리 포격형 MS. 하반신이 탱크 구조.', false),
((SELECT id FROM s), 'RB-79 볼', 'RB-79 볼', '지구연방군 병사', '구형 작업용 포드를 개조한 소형 MS. 내구도가 낮아 소모품 취급.', false),
((SELECT id FROM s), '육전형 건담', 'RX-79[G] 육전형 건담', '여러 파일럿', '지상전 전용으로 개발된 건담 바리에이션. 08MS소대에 등장.', false),
((SELECT id FROM s), '샤아 전용 자쿠', 'MS-06S 자쿠II 지휘관용', '샤아 아즈나블', '붉은 혜성 샤아가 탑승한 3배 속도의 자쿠. 건담 시리즈 최대 라이벌.', true),
((SELECT id FROM s), 'MS-06F 자쿠II', 'MS-06F 자쿠II', '지온 공국군 병사', '지온의 주력 양산형 MS. 건담 시리즈에서 가장 유명한 적군 기체.', false),
((SELECT id FROM s), 'MS-07B 구프', 'MS-07B 구프', '가이아', '자쿠의 후속 지상전 특화 MS. 핑거 기관총이 특징.', false),
((SELECT id FROM s), 'MS-09R 릭돔', 'MS-09R 릭돔', '지온군 엘리트', '도밍의 우주전 특화 개량형. 빔 바즈카를 장비.', false),
((SELECT id FROM s), 'MS-14A 겔구그', 'MS-14A 양산형 겔구그', '지온군 베테랑', '건담에 필적하는 성능의 지온 최강 양산기. 빔 라이플 장비.', false),
((SELECT id FROM s), 'MSM-07 제고크', 'MSM-07 제고크', '아카하나', '수륙양용 MS. 상체만으로 전투 가능한 특수 구조.', false),
((SELECT id FROM s), 'MSN-02 지옹', 'MSN-02 지옹', '샤아 아즈나블', '뉴타입 전용 모빌아머. 원격 무기 사이코뮤 탑재. 제타 직전 최강 적군.', true),
((SELECT id FROM s), 'MA-08 빅잠', 'MA-08 빅잠', '지온군 파일럿', '솔로몬 공방전의 대형 모빌아머. 강력한 인판넬 무장.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── Z건담 기체 추가 ─────────────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='Z건담')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '건담 Mk-II', 'RX-178 건담 Mk-II', '카미유 비단 / 에마 신', '티탄즈가 개발한 건담 후계기. 에우고가 탈취해 카미유가 탑승.', true),
((SELECT id FROM s), '백식', 'MSN-00100 백식', '클와트로 바지나(샤아)', '클와트로 바지나(샤아)가 탑승한 금색 MS. 빔 코팅이 특징.', true),
((SELECT id FROM s), 'RMS-099 릭디아스', 'RMS-099 릭디아스', '에마 신 외', '에우고의 주력 MS. 다양한 바리에이션이 존재.', false),
((SELECT id FROM s), 'MSA-003 네모', 'MSA-003 네모', '에우고 병사', '에우고의 양산형 MS. 짐의 후계기.', false),
((SELECT id FROM s), 'MSA-005 메타스', 'MSA-005 메타스', '파이브 스타 외', '변형 가능한 에우고 소속 가변 MS.', false),
((SELECT id FROM s), 'RMS-106 하이잭', 'RMS-106 하이잭', '티탄즈 병사', '티탄즈의 주력 양산기.', false),
((SELECT id FROM s), 'RMS-108 마라사이', 'RMS-108 마라사이', '야잔 게이블 외', '티탄즈의 고성능 양산MS. 빔 라이플 장비.', false),
((SELECT id FROM s), 'ORX-005 가프랑', 'ORX-005 가프랑', '고울 외', '티탄즈의 가변 MS. 비행 형태로 변형 가능.', false),
((SELECT id FROM s), 'NRX-055 바운드독', 'NRX-055 바운드독', '야잔 게이블', '야잔 게이블의 전용 MA겸 MS. 강력한 화력 보유.', false),
((SELECT id FROM s), 'MRX-009 사이코 건담', 'MRX-009 사이코 건담', '포 무라사메', '티탄즈의 뉴타입 전용 대형 변형 MS. 거대한 체구가 특징.', true)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 역습의 샤아 기체 추가 ───────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='역습의 샤아')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '리가지', 'ReZEL / 리가지', '아무로 레이', '아무로의 초기 탑승기. Z건담 계통의 가변MS.', false),
((SELECT id FROM s), 'RGM-89 제간', 'RGM-89 제간', '지구연방군 병사', '연방군 주력 양산MS. 짐의 후계기.', false),
((SELECT id FROM s), 'AMS-119 기라 도가', 'AMS-119 기라 도가', '네오 지온군 병사', '네오 지온의 주력 양산MS.', false),
((SELECT id FROM s), 'AMX-014 도벤울프', 'AMX-014 도벤울프', '네오 지온 파일럿', '네오 지온의 뉴타입 전용 MS. 인판넬 탑재.', false),
((SELECT id FROM s), 'NZ-333 알파 아지엘', 'NZ-333 α아지엘', '기유네 기나넬', '기유네의 전용 MA. 샤아의 함대 최강 기체.', true)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 크로스본 건담 시리즈 전체 ───────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='크로스본 건담')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '크로스본 건담 X1', 'XM-X1 크로스본 건담 X1', '킨케두 나우', '크로스본 뱅가드의 주력기. 클로식 리퍼와 해적 모티프 디자인이 특징.', true),
((SELECT id FROM s), '크로스본 건담 X2', 'XM-X2 크로스본 건담 X2', '토비아 아로낙스', 'X1의 자매기. 버니어 배치가 다르며 X2改로 개수.', true),
((SELECT id FROM s), '크로스본 건담 X3', 'XM-X3 크로스본 건담 X3', '여러 파일럿', '가장 늦게 등장한 크로스본 계열기. 강력한 무장 탑재.', false),
((SELECT id FROM s), 'XM-07 베시', 'XM-07 베시', '크로스본 뱅가드 파일럿', '크로스본 뱅가드의 양산형 MS.', false),
((SELECT id FROM s), 'F91', 'F91 건담 F91', '씨아보 세아보 베라', '크로스본 이전 작품의 주역기. 소형화된 고성능 건담.', false),
((SELECT id FROM s), 'EMS-10 주다', 'EMS-10 주다', '목성제국 병사', '목성제국의 주력 양산MS.', false),
((SELECT id FROM s), 'XMCA 아나나시', 'XMCA 아나나시', '목성제국 파일럿', '목성제국의 지휘관급 MS.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 유니콘 기체 추가 ────────────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='유니콘')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '밴시', 'RX-0[N] 유니콘 건담 02 밴시 노른', '마리다 크루스', '유니콘 02호기. 검은 도장과 금색 사이코프레임이 특징. 유니콘과 대비를 이루는 기체.', true),
((SELECT id FROM s), '페넥스', 'RX-0 유니콘 건담 03 페넥스', '자동', '유니콘 03호기. 황금빛 사이코프레임을 가진 전설의 기체.', true),
((SELECT id FROM s), 'AMS-129 기라 즐루후', 'AMS-129 기라 즐루후', '네오 지온 잔당', '네오 지온 잔당의 주력 MS. 기라 도가의 후계기.', false),
((SELECT id FROM s), 'MSN-065 시넨주', 'MSN-065 신안주', '풀 프런탈', '풀 프런탈의 전용기. 강력한 메가입자포 탑재.', true),
((SELECT id FROM s), 'NZ-666 클시', 'NZ-666 클시', '기라 즐루후 파일럿', '네오 지온의 MA형 기체. 다수의 판넬 탑재.', false),
((SELECT id FROM s), 'YAMS-132 로아잔', 'YAMS-132 로아잔', '네오 지온 파일럿', '네오 지온의 고성능 양산기.', false),
((SELECT id FROM s), 'RGZ-95 리제일', 'RGZ-95 리제일', '연방군 파일럿', '지구연방 가변 MS. Z건담 계통의 후계기.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 건담 W 기체 추가 ───────────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='건담 W')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '건담 데스사이즈', 'XXXG-01D 건담 데스사이즈', '듀오 맥스웰', '스텔스 기능과 거대 빔 사이드를 가진 건담. "사신" 듀오의 기체.', true),
((SELECT id FROM s), '건담 헤비암즈', 'XXXG-01H 건담 헤비암즈', '트로와 바튼', '개틀링과 미사일 등 중화기로 무장한 건담. 트로와의 서커스 포즈가 유명.', true),
((SELECT id FROM s), '건담 샌드록', 'XXXG-01SR 건담 샌드록', '콸트레 라버바 위너', '사막 전투 특화. 히트 숄텔 2개를 무기로 사용.', true),
((SELECT id FROM s), '나타쿠(샌롱 건담)', 'XXXG-01S 나타쿠', '우페이 창', '드래곤 모티프의 근접전 건담. "나타쿠"라는 별명을 가짐.', true),
((SELECT id FROM s), '윙 건담 제로', 'XXXG-00W0 윙 건담 제로', '히이로 유이', '5기 건담의 원형이자 최강 기체. 트윈 버스터 라이플의 압도적 화력.', true),
((SELECT id FROM s), '툴기스', 'OZ-00MS 툴기스', '제클스 메리클릿', 'OZ의 엘리트 전용 MS. 고성능 돌격용 기체.', false),
((SELECT id FROM s), 'OZ-06MS 리오', 'OZ-06MS 리오', 'OZ 병사', 'OZ의 주력 양산MS. 가장 많이 등장하는 적군 MS.', false),
((SELECT id FROM s), 'OZ-07AMS 에어리즈', 'OZ-07AMS 에어리즈', 'OZ 병사', 'OZ의 공중전 특화 양산MS.', false),
((SELECT id FROM s), 'OZ-09MMS 파이시즈', 'OZ-09MMS 파이시즈', 'OZ 병사', 'OZ의 수중전 특화 MS.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 건담 X 시리즈 전체 ──────────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='건담 X')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '건담 X', 'GX-9900 건담 X', '가로드 란', '위성 캐논을 가진 주역 건담. 뉴타입의 능력을 활용하는 기체.', true),
((SELECT id FROM s), '건담 더블X', 'GX-9901-DX 건담 더블X', '가로드 란', '건담 X의 강화형. 트윈 위성 캐논의 압도적 화력.', true),
((SELECT id FROM s), '건담 레오파르드', 'GT-9600 건담 레오파르드', '우파', '중화기 특화 건담. 다수의 미사일과 기관포 장비.', false),
((SELECT id FROM s), '건담 에어마스터', 'GW-9800 건담 에어마스터', '로아비', '항공 특화 가변 건담. 공중전의 달인 로아비가 탑승.', false),
((SELECT id FROM s), 'NRX-016 비트', 'NRX-016 건담 비트', '연합군 파일럿', '연합군의 건담형 MS. 기존 건담 기술 모방 기체.', false),
((SELECT id FROM s), 'NRX-0013 캔서', 'NRX-0013 캔서', '연합군 파일럿', '연합군 MS. 집게 무기가 특징.', false),
((SELECT id FROM s), 'NRX-0015 헤비포크', 'NRX-0015 헤비포크', '연합군 파일럿', '연합군의 대형 MA형 MS.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── SEED 기체 추가 ──────────────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='SEED')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '어썰트 슈라우드 스트라이크', 'GAT-X105+AQM/E-X01 에일 스트라이크', '키라 야마토', '스트라이크에 에일팩 장착. 고기동 공중전 사양.', false),
((SELECT id FROM s), 'GAT-X102 듀얼', 'GAT-X102 듀얼 건담', '아스란 자라', 'G프로젝트 기체. 아스란이 초기 탑승. 어썰트 슈라우드 장비 가능.', false),
((SELECT id FROM s), 'GAT-X103 버스터', 'GAT-X103 버스터 건담', '디아카 엘스만', '장거리 포격 특화 G프로젝트 기체.', false),
((SELECT id FROM s), 'GAT-X207 블리츠', 'GAT-X207 블리츠 건담', '니콜 아말피', '스텔스 기능 특화 G프로젝트 기체.', false),
((SELECT id FROM s), 'GAT-X303 이지스', 'GAT-X303 이지스 건담', '아스란 자라', '변형 기능 보유 G프로젝트 최강 기체. 아스란 탑승.', true),
((SELECT id FROM s), 'ZGMF-X13A 프로비던스', 'ZGMF-X13A 프로비던스 건담', '레이 자 버렐', '드라구눈 시스템 탑재 ZAFT 최강 기체.', true),
((SELECT id FROM s), 'ZGMF-1017 모빌 진', 'ZGMF-1017 모빌 진', 'ZAFT 병사', 'ZAFT의 초기 주력 양산MS.', false),
((SELECT id FROM s), 'GAT-01 스트라이크 대거', 'GAT-01 스트라이크 대거', '지구연방 병사', '스트라이크 건담의 양산형. 저가형 기체.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── SEED DESTINY 기체 추가 ──────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='SEED DESTINY')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '임펄스 건담', 'ZGMF-X56S 임펄스 건담', '신 아스카', '실루엣 팩 교환형 건담. 포스/소드/블라스트 3가지 사양 변환.', true),
((SELECT id FROM s), '스트라이크 프리덤', 'ZGMF-X20A 스트라이크 프리덤 건담', '키라 야마토', '프리덤의 후계기. 드라구눈과 윙 쉴드 탑재 최강의 건담.', true),
((SELECT id FROM s), '인피니트 저스티스', 'ZGMF-X19A 인피니트 저스티스 건담', '아스란 자라', '저스티스의 후계기. 근접전 특화.', false),
((SELECT id FROM s), 'ZGMF-X88S 가이아', 'ZGMF-X88S 가이아 건담', '스텔라 루쉐', '수륙양용 변형 건담. 스텔라 탑승.', false),
((SELECT id FROM s), 'ZGMF-1000 자쿠 워리어', 'ZGMF-1000 자쿠 워리어', 'ZAFT 병사', 'SEED DESTINY의 ZAFT 주력 양산MS.', false),
((SELECT id FROM s), 'GAT-04 윈담', 'GAT-04 윈담', '지구연방 병사', 'SEED DESTINY의 연방 주력 양산MS.', false),
((SELECT id FROM s), 'ZGMF-X42S 데스티니(복)', 'ZGMF-X42S 데스티니 건담(레이 버전)', '레이 자 버렐', '레이가 탑승한 데스티니. 클라인 파 전투에서 등장.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 건담 00 기체 추가 ───────────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='건담 00')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '건담 큐리오스', 'GN-003 건담 큐리오스', '알렐루야 합티즘', '변형 기능 탑재 솔레스타 건담. 알렐루야 탑승.', false),
((SELECT id FROM s), '건담 바체', 'GN-005 건담 바체', '로크온 스트라토스(닐)', '저격 특화 솔레스타 건담. 닐 닥커가 탑승.', false),
((SELECT id FROM s), '00 퀀타', 'GNT-0000 더블오 퀀타', '세츠나 F 세이에이', '더블오 건담의 진화 최종형. 양자 텔레포테이션 가능.', true),
((SELECT id FROM s), 'GNX-603T 지린', 'GNX-603T 지린', '연합군 파일럿', 'GN 드라이브 탑재 연합군 MS.', false),
((SELECT id FROM s), 'GNX-704T 알케미네', 'GNX-704T 알케미네', '알리 알 사케즈', '이노베이터 계열 개량 MS.', false),
((SELECT id FROM s), 'SVMS-01 유니온 플래그', 'SVMS-01 유니온 플래그', '그레이엄 에이커', '유니온의 주력 가변 MS. 그레이엄의 탑승기.', false),
((SELECT id FROM s), 'AEU-09 에어리온', 'AEU-09 에어리온', 'AEU 병사', 'AEU(유럽연합)의 주력 양산MS.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 빌드 파이터즈 시리즈 전체 ───────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='빌드 파이터즈')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '빌드 스트라이크 건담', 'Build Strike Gundam', '이오리 세이 / 레이지', '스트라이크 건담 기반 커스텀 건프라. 빌드 부스터와 합체하면 풀 팩키지가 된다.', true),
((SELECT id FROM s), '스타 빌드 스트라이크', 'Star Build Strike Gundam', '이오리 세이 / 레이지', '빌드 스트라이크의 최종 강화형. 리플렉터 팩 탑재.', true),
((SELECT id FROM s), '레이징 건담', 'Raging Gundam', '레이지', '레이지의 전용 커스텀 건프라. 강력한 근접 전투 능력.', true),
((SELECT id FROM s), '짐 스나이퍼II', 'GM Sniper II (커스텀)', '배경 캐릭터', '빌드 파이터즈 세계의 짐 스나이퍼 커스텀.', false),
((SELECT id FROM s), '건담 엑시아 다크 매터', 'Gundam Exia Dark Matter', '메이지스', '적대자 메이지스의 기체. 엑시아 기반 커스텀.', false),
((SELECT id FROM s), '트라이 버닝 건담', 'Try Burning Gundam', '카미키 세카이', '빌드 파이터즈 트라이의 주역기. 불꽃 이미지.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 철혈의 오펀스 기체 추가 ─────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='철혈의 오펀스')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '건담 바르바토스 루프스', 'ASW-G-08 건담 바르바토스 루프스', '미카즈키 오거스', '바르바토스의 제6형태. 루프스는 라틴어로 狼. 더욱 공격적인 외형.', true),
((SELECT id FROM s), '건담 바르바토스 루프스 렉스', 'ASW-G-08 건담 바르바토스 루프스 렉스', '미카즈키 오거스', '바르바토스 최종형태. 렉스는 왕. 압도적인 근접 전투력.', true),
((SELECT id FROM s), '건담 구시온', 'ASW-G-11 건담 구시온', '아크리라 오간', '중장갑 건담. 해머 형태 대형 무기가 특징.', false),
((SELECT id FROM s), '건담 플라우로스', 'ASW-G-64 건담 플라우로스', '라프탈', '화력 특화 건담. 레일캐논 탑재.', false),
((SELECT id FROM s), '건담 킴바리스', 'ASW-G-66 건담 킴바리스', '가엘리오 보드윈', '창을 무기로 쓰는 고기동 건담.', false),
((SELECT id FROM s), 'EB-06 그레이즈', 'EB-06 그레이즈', '갈라르혼 병사', '갈라르혼의 주력 양산MS. 철혈 세계의 표준 기체.', false),
((SELECT id FROM s), 'EB-06r 그레이즈 리터', 'EB-06r 그레이즈 리터', '갈라르혼 엘리트', '그레이즈의 지휘관용 커스텀 사양.', false),
((SELECT id FROM s), 'V08-1228 슈발베 그레이즈', 'V08-1228 슈발베 그레이즈', '맥길리스 파리드 / 가엘리오 보드윈', '고기동 특화 그레이즈 바리에이션.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 수성의 마녀 기체 추가 ───────────────────────────────────────────────

WITH s AS (SELECT id FROM public.gundam_series WHERE short_name='수성의 마녀')
INSERT INTO public.gundams (series_id, name, full_name, pilot, description, is_featured) VALUES
((SELECT id FROM s), '건담 에어리얼 개수형', 'XVX-016RN 건담 에어리얼 개수형', '슬레타 머큐리', '에어리얼의 강화형. 빛의 날개를 전개하는 압도적 형태.', true),
((SELECT id FROM s), '건담 캘리번', 'Gundam Calibarn', '에리 스모르', '에리가 탑승하는 건담. 독자적인 GUND 포맷 탑재.', true),
((SELECT id FROM s), 'MD-0031 달란자', 'MD-0031 달란자', '학원 소속 파일럿', '아스티카시아 학원에서 사용하는 양산형 MS.', false),
((SELECT id FROM s), 'MD-0064 조위트', 'MD-0064 조위트', '학원 소속 파일럿', '학원의 표준 MS. 여러 파일럿이 탑승.', false),
((SELECT id FROM s), 'MDX-0003 조위트 헤비', 'MDX-0003 조위트 헤비', '학원 파일럿', '조위트의 중장갑 강화형.', false),
((SELECT id FROM s), '건담 팔세토', 'YF-01 건담 팔세토', '여러 파일럿', '루브리스 계열의 실험용 건담. 다수 제작.', false)
ON CONFLICT (series_id, name) DO NOTHING;

-- ─── 건담 카운트 업데이트 ────────────────────────────────────────────────
UPDATE public.gundam_series s
SET gundam_count = (SELECT COUNT(*) FROM public.gundams g WHERE g.series_id = s.id);
