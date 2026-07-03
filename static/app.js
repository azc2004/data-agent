// DX E-Commerce Metrics Dashboard Application Logic

// ================= GLOBAL STATE (Mock Database) =================
const state = {
  overview: {
    gmv: 124500000,
    orders: 2480,
    cvr: 3.85,
    dau: 64200,
    health: {
      product: { name: '상품 관리', status: 'active', latency: '34ms', errorRate: '0.01%', notes: '안정적' },
      order: { name: '주문/매출', status: 'active', latency: '42ms', errorRate: '0.05%', notes: '안정적' },
      search: { name: '검색 엔진', status: 'active', latency: '82ms', errorRate: '0.00%', notes: '정상 가동' },
      recommend: { name: '개인화 추천', status: 'active', latency: '24ms', errorRate: '0.08%', notes: '서빙 최적화' },
      exhibition: { name: '전시/기획전', status: 'active', latency: '15ms', errorRate: '0.00%', notes: '안정적' },
      member: { name: '회원/활성', status: 'active', latency: '52ms', errorRate: '0.03%', notes: '안정적' }
    }
  },
  product: {
    total: 42850,
    activeRate: 94.2,
    stockRate: 98.45,
    warnCount: 3,
    alerts: [
      { name: '무선 충전 마우스 패드 Pro', category: '디지털/가전', stock: 2, status: '위험' },
      { name: '스타일리시 에센셜 코트 (L)', category: '패션의류', stock: 4, status: '경고' },
      { name: '오가닉 대나무 타올 세트', category: '생활/리빙', stock: 0, status: '품절' }
    ],
    categories: [
      { name: '패션의류', value: 30 },
      { name: '뷰티', value: 15 },
      { name: '식품', value: 20 },
      { name: '디지털/가전', value: 18 },
      { name: '생활/리빙', value: 12 },
      { name: '기타', value: 5 }
    ]
  },
  order: {
    gmv: 124500000,
    count: 2480,
    aov: 50200,
    refundRate: 1.27,
    funnel: {
      sessions: 64400,
      cart: 12880,       // 20%
      checkout: 5152,    // 40%
      payment: 2480      // 48%
    },
    hourlySales: [1200000, 800000, 450000, 600000, 1500000, 2400000, 3100000, 2800000, 3500000, 4100000, 3200000, 1650000]
  },
  search: {
    ctr: 41.8,
    zeroRate: 1.45,
    latency: 82,
    totalQueries: 184200,
    keywords: [
      { word: '리넨 원피스', count: 1240 },
      { word: '선크림 백탁없는', count: 980 },
      { word: '노이즈캔슬링 이어폰', count: 850 },
      { word: '캠핑 릴렉스 체어', count: 720 },
      { word: '닭가슴살 샐러드', count: 540 },
      { word: '적축 기계식 키보드', count: 480 },
      { word: '캡슐 커피 머신', count: 410 },
      { word: '미니 보조배터리', count: 390 },
      { word: '오가닉 에코백', count: 320 },
      { word: '유산균 유통기한', count: 280 }
    ],
    zeroResults: [
      { word: '울트라슬림에어북2026', count: 145, status: '급증', action: '매칭 키워드 없음' },
      { word: '글루텐프리비건치즈초콜릿', count: 98, status: '경고', action: '카테고리 비매칭' },
      { word: '빈티지 가죽자켓 한정판', count: 54, status: '안정', action: '일시 품절 해제' }
    ]
  },
  recommend: {
    ctr: 8.42,
    revenue: 18240000,
    coverage: 88.5,
    precision: 82.1,
    widgets: [
      { name: '함께 구매한 인기 상품 위젯', ctr: '11.2%', sales: 6450000 },
      { name: '개인화 맞춤 상품 추천', ctr: '9.8%', sales: 8120000 },
      { name: '방금 본 상품 연관 기획전', ctr: '4.2%', sales: 3670000 }
    ],
    algorithmCTR: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      dl: [7.8, 8.1, 7.9, 8.3, 8.5, 8.2, 8.42],
      cf: [6.5, 6.7, 6.4, 6.8, 6.9, 6.8, 6.75],
      session: [5.2, 5.4, 5.3, 5.5, 5.8, 5.9, 6.02]
    }
  },
  exhibition: {
    bannerCtr: 12.8,
    bounceRate: 32.4,
    activeEvents: 8,
    eventCvr: 5.48,
    slots: [
      { name: '메인 상단 롤링 (Slot 1)', clicks: 14200 },
      { name: '실시간 베스트 탭 (Slot 2)', clicks: 8900 },
      { name: '개인화 특가 기획 (Slot 3)', clicks: 5400 },
      { name: '푸터 모바일 전용 (Slot 4)', clicks: 3100 }
    ],
    categories: [30, 25, 20, 25] // Fashion, Food, Tech, Living
  },
  bannerMap: {
    selectedSlot: 'main-banner',
    overlayVisible: false,
    slots: {
      'top-banner': {
        id: 'top-banner',
        name: '상단 배포 띠배너',
        desc: '모바일 웹 최상단 웰컴 쿠폰/가입 유도 배너 구좌',
        ctr: 4.20,
        impressions: 120400,
        clicks: 5056,
        cvr: 2.10,
        activeAsset: '신규 회원 가입 시 10% 앱 전용 웰컴쿠폰 즉시 지급!',
        trend: '+0.4%',
        hourlyClicks: [150, 100, 80, 120, 200, 350, 410, 380, 420, 500, 480, 390],
        assets: [
          { name: '신규 가입 10% 웰컴쿠폰 (기본)', baseCtr: 4.20, img: '', text: '신규 회원 가입 시 10% 앱 전용 웰컴쿠폰 즉시 지급!' },
          { name: '첫 구매 무료배송 혜택 배너', baseCtr: 4.85, img: '', text: '첫 구매 시 금액 무관 전상품 무료배송 쿠폰 증정!' },
          { name: '카카오 간편 가입 3초 쿠폰 배너', baseCtr: 3.90, img: '', text: '카카오 3초 가입하고 즉시 쓸 수 있는 5천원 할인 혜택' }
        ]
      },
      'header-gnb': {
        id: 'header-gnb',
        name: '헤더 및 GNB 카테고리 탭',
        desc: '주요 패션 카테고리 이동 탭 영역',
        ctr: 15.80,
        impressions: 480200,
        clicks: 75871,
        cvr: 6.40,
        activeAsset: '여성, 남성, 아동, 아웃도어, 베스트, 기획전',
        trend: '+1.2%',
        hourlyClicks: [2100, 1500, 1200, 1800, 3200, 5800, 6900, 6400, 7100, 8400, 7900, 6200],
        assets: [
          { name: '기본 GNB 순서 (여성 우선)', baseCtr: 15.80, img: '', text: '여성, 남성, 아동, 아웃도어, 베스트, 기획전' },
          { name: '아웃도어/골프 스포츠 강조형 GNB', baseCtr: 16.42, img: '', text: '골프, 스포츠/아웃도어, 여성, 남성, 아동, 베스트' },
          { name: '베스트/기획전 전면 강조형 GNB', baseCtr: 17.15, img: '', text: '베스트 랭킹, 특가 기획전, 여성, 남성, 아동, 스포츠' }
        ]
      },
      'main-banner': {
        id: 'main-banner',
        name: '메인 비주얼 롤링 배너',
        desc: '홈페이지 최상단 고효율 비주얼 카드 영역',
        ctr: 12.80,
        impressions: 345000,
        clicks: 44160,
        cvr: 5.48,
        activeAsset: '여름 시즌오프 최대 80% 브랜드 연합전 (헤지스/닥스 등)',
        trend: '+1.5%',
        hourlyClicks: [1200, 800, 600, 950, 1900, 3400, 4200, 3900, 4100, 5200, 4900, 3600],
        assets: [
          { name: '여름 시즌오프 최대 80% 브랜드 연합전', baseCtr: 12.80, img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&h=250&q=80', text: '여름 시즌오프 최대 80% 브랜드 연합전 (헤지스/닥스 등)' },
          { name: '단독 특가 바캉스 패션 컬렉션', baseCtr: 14.25, img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&h=250&q=80', text: '여름 휴가 준비 완료! 단독 특가 바캉스 패션 컬렉션' },
          { name: '명품 선글라스 & 여름 ACC 특가', baseCtr: 10.92, img: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&w=400&h=250&q=80', text: '럭셔리 썸머 매치! 해외명품 선글라스 & ACC 단독 특가전' }
        ]
      },
      'quick-menu': {
        id: 'quick-menu',
        name: '바로가기 퀵메뉴 아이콘',
        desc: '주요 서비스 메뉴 및 타겟 이벤트 링크',
        ctr: 8.40,
        impressions: 290100,
        clicks: 24368,
        cvr: 4.12,
        activeAsset: '하루특가, 기획전, 베스트, 쿠폰존, 신상품',
        trend: '-0.3%',
        hourlyClicks: [650, 400, 350, 520, 1100, 1850, 2300, 2100, 2250, 2800, 2600, 1900],
        assets: [
          { name: '기본 5개 메뉴 아이콘', baseCtr: 8.40, img: '', text: '하루특가, 기획전, 베스트, 쿠폰존, 신상품' },
          { name: '쿠폰/혜택 유도형 강조 배치', baseCtr: 9.15, img: '', text: '쿠폰 100%, 하루특가, 기획전, 브랜드관, 무료배송' },
          { name: '유저 행동 유동 추천형 배치', baseCtr: 10.50, img: '', text: '나의 찜상품, 기획전, 추천 브랜드, 쿠폰존, 특가' }
        ]
      },
      'time-sale': {
        id: 'time-sale',
        name: '타임세일 특가 구좌',
        desc: '실시간 타임딜 한정 수량 구매 유도 영역',
        ctr: 9.60,
        impressions: 215000,
        clicks: 20640,
        cvr: 7.20,
        activeAsset: '버커루 남여공용 린넨 셔츠 외 15종 (70% 한정 할인)',
        trend: '+2.1%',
        hourlyClicks: [580, 380, 290, 450, 920, 1600, 2050, 1850, 1950, 2400, 2200, 1600],
        assets: [
          { name: '버커루 린넨 셔츠 외 15종 (70% 할인)', baseCtr: 9.60, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80', text: '버커루 남여공용 린넨 셔츠 외 15종 (70% 한정 할인)' },
          { name: '쉬즈미스 페미닌 원피스 (최저가 29,000원)', baseCtr: 11.45, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80', text: '쉬즈미스 페미닌 린넨 블렌드 원피스 29,000원 한정수량' },
          { name: '크로커다일 레이디 이지캐주얼 셋업', baseCtr: 8.90, img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80', text: '크로커다일 레이디 시원한 쿨터치 이지캐주얼 셋업 특가' }
        ]
      },
      'mid-banner': {
        id: 'mid-banner',
        name: '중단 프로모션 띠배너',
        desc: '스크롤 중 집중 유도용 단일 배너',
        ctr: 5.10,
        impressions: 189000,
        clicks: 9639,
        cvr: 3.45,
        activeAsset: '골프&아웃도어 패밀리 세일전 최대 85% 쿠폰팩',
        trend: '+0.2%',
        hourlyClicks: [280, 180, 120, 200, 450, 780, 920, 840, 900, 1150, 1050, 800],
        assets: [
          { name: '골프&아웃도어 패밀리 세일전 최대 85%', baseCtr: 5.10, img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80', text: '골프&아웃도어 패밀리 세일전 최대 85% 쿠폰팩' },
          { name: '카드사 최대 1만 원 중복 캐시백', baseCtr: 5.80, img: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=400&q=80', text: '쇼핑 지원금 즉시 지급! 주요 카드 결제 시 1만원 추가 캐시백' },
          { name: '여름 리빙/홈 패브릭 단독 60%', baseCtr: 4.50, img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80', text: '까사미아/데코뷰 여름 쿨 시트 & 인테리어 패브릭 특가전' }
        ]
      },
      'recommend-slot': {
        id: 'recommend-slot',
        name: '개인화 브랜드 추천관',
        desc: '유저 서핑 이력 기반 맞춤 브랜드 할인 구좌',
        ctr: 6.80,
        impressions: 165000,
        clicks: 11220,
        cvr: 4.80,
        activeAsset: '지이크/까르뜨블랑슈 남성 모던 캐주얼 위크',
        trend: '+0.8%',
        hourlyClicks: [320, 210, 150, 240, 520, 910, 1100, 980, 1050, 1300, 1200, 900],
        assets: [
          { name: '지이크/까르뜨블랑슈 남성 캐주얼 위크', baseCtr: 6.80, img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=400&q=80', text: '지이크/까르뜨블랑슈 남성 모던 캐주얼 위크' },
          { name: '여성 오피스룩 베스트 코디 모음전', baseCtr: 7.90, img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=400&q=80', text: '여름 출근룩 걱정 끝! 미샤/모조에스핀 블라우스 & 스커트' },
          { name: '클리어런스 아동 데일리웨어 균일가', baseCtr: 6.10, img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=400&q=80', text: '아동 패션 클리어런스! 상하복/레깅스 9,900원 균일가' }
        ]
      },
      'best-products': {
        id: 'best-products',
        name: '실시간 베스트 상품 피드',
        desc: '실시간 매출/클릭 랭킹 기반 베스트셀러 전시 영역',
        ctr: 11.20,
        impressions: 280000,
        clicks: 31360,
        cvr: 8.50,
        activeAsset: '여름 쿨텐션 반팔 티셔츠 외 트렌드 상품 탑 10',
        trend: '+1.7%',
        hourlyClicks: [950, 620, 480, 680, 1350, 2450, 3100, 2800, 2950, 3700, 3450, 2550],
        assets: [
          { name: '여름 쿨텐션 반팔 티셔츠 외 트렌드 탑 10', baseCtr: 11.20, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80', text: '여름 쿨텐션 반팔 티셔츠 외 트렌드 상품 탑 10' },
          { name: '하프클럽 명품대전 단독 입점 세일', baseCtr: 12.50, img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80', text: '구찌/프라다 여름 명품 컬렉션 최대 45% 단독 입점전' },
          { name: '주간 판매 왕좌! 린넨 원피스 단독 특가', baseCtr: 13.10, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80', text: '네이버 쇼핑 1위! 지고트 여름 린넨 원피스 단독 75% 특가' }
        ]
      }
    }
  },
  member: {
    total: 182450,
    dau: 64200,
    revenueShare: 89.4,
    churn: 1.82,
    signups: [120, 115, 140, 155, 130, 148, 124], // last 7 days
    currentLoyalty: [25195, 91012, 337790, 6999437], // Default overall VVIP, VIP, Family, Welcome
    signupTrendLabels: ['D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'Today'],
    signupTrendValues: [120, 115, 140, 155, 130, 148, 124],
    annualYears: ['2023', '2024', '2025', '2026'],
    annualNew: [0, 0, 0, 0],
    annualWithdrawn: [0, 0, 0, 0]
  }
};

// ================= METRICS GLOSSARY DATA =================
const GLOSSARY = [
  { term: 'GMV (Gross Merchandise Value)', domain: 'Order (주문)', desc: '총 거래액으로, 결제 완료 및 환불 대기 상태를 포함한 거래 총액입니다.', tab: 'order' },
  { term: 'CVR (Conversion Rate)', domain: 'Overview (오버뷰)', desc: '구매 전환율로, 전체 방문 세션 중 실제 구매를 완료한 세션의 비율입니다.', tab: 'overview' },
  { term: 'DAU (Daily Active Users)', domain: 'Member (회원)', desc: '하루 동안 서비스를 이용한 순수 방문자 수입니다.', tab: 'member' },
  { term: 'AOV (Average Order Value)', domain: 'Order (주문)', desc: '주문 건당 평균 결제 금액입니다. (매출액 / 주문건수)', tab: 'order' },
  { term: 'Search CTR (Click-Through Rate)', domain: 'Search (검색)', desc: '검색어 입력 후 검색 결과 페이지 내 상품을 클릭한 비율입니다.', tab: 'search' },
  { term: 'Zero Results Rate', domain: 'Search (검색)', desc: '검색을 수행했으나 검색 결과가 0건으로 매칭되어 반환된 비율입니다.', tab: 'search' },
  { term: 'Latency (지연속도)', domain: 'Search (검색)', desc: '검색 쿼리가 노드에서 최종 반환되기까지 걸리는 응답 시간(ms)입니다.', tab: 'search' },
  { term: 'Recommendation CTR', domain: 'Recommendation (추천)', desc: '추천 위젯 노출 수 대비 해당 상품을 클릭한 수의 비율입니다.', tab: 'recommend' },
  { term: 'Attribution Revenue (추천 매출)', domain: 'Recommendation (추천)', desc: '추천 영역 클릭이 구매로 유입되어 기여한 간접/직접 매출액입니다.', tab: 'recommend' },
  { term: 'Bounce Rate (이탈율)', domain: 'Exhibition (전시)', desc: '전시 페이지 진입 후 다른 클릭/이동 행위 없이 바로 세션을 종료한 비율입니다.', tab: 'exhibition' },
  { term: 'Banner CTR (배너 클릭율)', domain: 'Exhibition (전시)', desc: '메인이나 개별 전시 배너 노출수 대비 클릭이 일어난 비율입니다.', tab: 'exhibition' },
  { term: 'Churn Rate (회원 이탈율)', domain: 'Member (회원)', desc: '기존 가입 유저가 활성 상태를 잃고 미활동 상태로 전환된 비율입니다.', tab: 'member' }
];

// Active Chart Instances Storage
let charts = {};

// ================= FORMATTERS & UTILS =================
function formatWon(value) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value).replace('₩', '₩ ');
}

function formatNum(value) {
  return new Intl.NumberFormat('ko-KR').format(value);
}

function getGradient(ctx, colorStart, colorEnd) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
}

// Dynamic System Synced Time
function updateSyncTime() {
  const now = new Date();
  const pad = (num) => String(num).padStart(2, '0');
  const formatted = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  document.getElementById('last-sync-time').textContent = `동기화 완료: ${formatted}`;
}

// Dynamic Toast Notifications
function triggerToast(title, desc, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) {
    const div = document.createElement('div');
    div.id = 'toast-container';
    document.body.appendChild(div);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = 'info';
  if (type === 'success') icon = 'check-circle';
  if (type === 'warning') icon = 'alert-triangle';
  if (type === 'error') icon = 'alert-circle';

  toast.innerHTML = `
    <i data-lucide="${icon}"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${desc}</div>
    </div>
  `;

  document.getElementById('toast-container').appendChild(toast);
  lucide.createIcons();

  // Slide out after 4 seconds
  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 4000);
}

// ================= SYSTEM METRICS INITIALIZATION & RENDERING =================
function updateOverviewDOM() {
  // Metric card values
  document.getElementById('ov-gmv').textContent = formatWon(state.overview.gmv);
  document.getElementById('ov-orders').textContent = `${formatNum(state.overview.orders)}건`;
  document.getElementById('ov-cvr').textContent = `${state.overview.cvr.toFixed(2)}%`;
  document.getElementById('ov-dau').textContent = `${formatNum(state.overview.dau)}명`;

  // Health Table Render
  const tbody = document.querySelector('#overview-health-table tbody');
  tbody.innerHTML = '';
  
  Object.keys(state.overview.health).forEach(key => {
    const h = state.overview.health[key];
    let statusClass = 'health-active';
    let statusText = '정상';
    
    if (h.status === 'warning') {
      statusClass = 'health-warning';
      statusText = '주의';
    } else if (h.status === 'critical') {
      statusClass = 'health-critical';
      statusText = '장애';
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 700;">${h.name}</td>
      <td><span class="health-badge ${statusClass}">${statusText}</span></td>
      <td>${h.latency}</td>
      <td>${h.errorRate}</td>
      <td style="color: var(--text-secondary); font-size:12px;">${h.notes}</td>
    `;
    tbody.appendChild(tr);
  });
}

function updateProductDOM() {
  document.getElementById('prod-total').textContent = `${formatNum(state.product.total)}개`;
  document.getElementById('prod-active-rate').textContent = `${state.product.activeRate.toFixed(1)}%`;
  document.getElementById('prod-stock-rate').textContent = `${state.product.stockRate.toFixed(2)}%`;
  
  const warnVal = document.getElementById('prod-warn-count');
  warnVal.textContent = `${state.product.warnCount}건`;
  
  const warnTrend = document.getElementById('prod-warn-trend');
  if (state.product.warnCount > 3) {
    warnVal.style.color = '#ef4444';
    warnTrend.className = 'kpi-trend trend-up';
    warnTrend.innerHTML = `<i data-lucide="arrow-up-right"></i>증가`;
  } else {
    warnVal.style.color = '';
    warnTrend.className = 'kpi-trend trend-down';
    warnTrend.innerHTML = `<i data-lucide="arrow-down-left"></i>안정`;
  }

  // Stock Alerts table
  const tbody = document.querySelector('#prod-stock-alerts-table tbody');
  tbody.innerHTML = '';

  if (state.product.alerts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="empty-state">
            <i data-lucide="check-circle" style="color: #10b981;"></i>
            <span>경고 수량 미만 재고 상품이 없습니다.</span>
          </div>
        </td>
      </tr>
    `;
  } else {
    state.product.alerts.forEach((alert, idx) => {
      let badge = `<span class="tag-badge tag-red">품절</span>`;
      if (alert.stock > 0) {
        badge = alert.stock < 3 ? `<span class="tag-badge tag-red">위험 (${alert.stock})</span>` : `<span class="tag-badge tag-blue">경고 (${alert.stock})</span>`;
      }
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 600;">${alert.name}</td>
        <td>${alert.category}</td>
        <td style="font-weight: 700;">${alert.stock}개</td>
        <td>${badge}</td>
        <td>
          <button class="action-btn" style="padding: 4px 8px; font-size: 11px;" onclick="replenishStock(${idx})">
            발주
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  lucide.createIcons();
}

function updateOrderDOM() {
  document.getElementById('order-gmv').textContent = formatWon(state.order.gmv);
  document.getElementById('order-count').textContent = `${formatNum(state.order.count)}건`;
  document.getElementById('order-aov').textContent = formatWon(state.order.aov);
  document.getElementById('order-refund-rate').textContent = `${state.order.refundRate.toFixed(2)}%`;

  // Draw funnel steps dynamically
  const funnel = state.order.funnel;
  const container = document.getElementById('order-funnel');
  container.innerHTML = '';

  const steps = [
    { label: '전체 방문 (Sessions)', val: funnel.sessions, pct: 100, ref: funnel.sessions },
    { label: '장바구니 담기 (Cart)', val: funnel.cart, pct: Math.round((funnel.cart / funnel.sessions) * 100), ref: funnel.sessions },
    { label: '주문서 작성 (Checkout)', val: funnel.checkout, pct: Math.round((funnel.checkout / funnel.cart) * 100), ref: funnel.cart },
    { label: '결제 완료 (Payment)', val: funnel.payment, pct: Math.round((funnel.payment / funnel.checkout) * 100), ref: funnel.checkout }
  ];

  steps.forEach((step, idx) => {
    const overallPct = Math.round((step.val / funnel.sessions) * 100);
    const dropPct = idx === 0 ? 0 : 100 - step.pct;
    
    const div = document.createElement('div');
    div.className = 'funnel-step';
    div.innerHTML = `
      <div class="funnel-label">${step.label}</div>
      <div class="funnel-bar-wrapper">
        <div class="funnel-bar" style="width: ${overallPct}%"></div>
        <span class="funnel-value">${formatNum(step.val)} (${overallPct}%)</span>
      </div>
      <div class="funnel-drop">${idx === 0 ? '-' : `이탈 ${dropPct}%`}</div>
    `;
    container.appendChild(div);
  });
}

function updateSearchDOM() {
  document.getElementById('search-ctr').textContent = `${state.search.ctr.toFixed(1)}%`;
  document.getElementById('search-zero-rate').textContent = `${state.search.zeroRate.toFixed(2)}%`;
  document.getElementById('search-latency').textContent = `${state.search.latency}ms`;
  document.getElementById('search-total-queries').textContent = `${formatNum(state.search.totalQueries)}건`;

  // Zero results keywords table
  const tbody = document.querySelector('#search-zero-table tbody');
  tbody.innerHTML = '';

  state.search.zeroResults.forEach((item, idx) => {
    let badgeClass = 'tag-blue';
    if (item.status === '급증') badgeClass = 'tag-red';
    if (item.status === '경고') badgeClass = 'tag-red';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 700; color: #f87171;">"${item.word}"</td>
      <td style="font-weight: 600;">${item.count}회</td>
      <td><span class="tag-badge ${badgeClass}">${item.status}</span></td>
      <td>
        <button class="action-btn" style="padding: 4px 8px; font-size: 11px;" onclick="resolveZeroKeyword(${idx})">
          ${item.status === '경고' || item.status === '급증' ? '키워드 매칭' : '완료'}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateRecommendDOM() {
  document.getElementById('rec-ctr').textContent = `${state.recommend.ctr.toFixed(2)}%`;
  document.getElementById('rec-revenue').textContent = formatWon(state.recommend.revenue);
  document.getElementById('rec-coverage').textContent = `${state.recommend.coverage.toFixed(1)}%`;
  document.getElementById('rec-precision').textContent = `${state.recommend.precision.toFixed(1)}%`;

  // Recommend widgets metrics list
  const list = document.getElementById('rec-widgets-list');
  list.innerHTML = '';

  state.recommend.widgets.forEach(w => {
    const item = document.createElement('div');
    item.className = 'stat-item';
    item.innerHTML = `
      <div class="stat-label-col">
        <span class="stat-label">${w.name}</span>
        <span class="stat-desc">실시간 알고리즘 매칭 적용 중</span>
      </div>
      <div class="stat-value-col">
        <span class="stat-value-label" style="color: var(--color-recommend); font-weight: 800;">CTR ${w.ctr}</span>
        <span class="stat-desc">${formatWon(w.sales)} 매출</span>
      </div>
    `;
    list.appendChild(item);
  });
}

function updateExhibitionDOM() {
  document.getElementById('exh-banner-ctr').textContent = `${state.exhibition.bannerCtr.toFixed(1)}%`;
  document.getElementById('exh-bounce-rate').textContent = `${state.exhibition.bounceRate.toFixed(1)}%`;
  document.getElementById('exh-active-events').textContent = `${state.exhibition.activeEvents}개`;
  document.getElementById('exh-event-cvr').textContent = `${state.exhibition.eventCvr.toFixed(2)}%`;
}

function updateMemberDOM() {
  document.getElementById('memb-total').textContent = `${formatNum(state.member.total)}명`;
  document.getElementById('memb-dau').textContent = `${formatNum(state.member.dau)}명`;
  document.getElementById('memb-revenue-share').textContent = `${state.member.revenueShare.toFixed(1)}%`;
  document.getElementById('memb-churn').textContent = `${state.member.churn.toFixed(2)}%`;
}

// Global master state DOM updater
function updateAllDOM() {
  updateOverviewDOM();
  updateProductDOM();
  updateOrderDOM();
  updateSearchDOM();
  updateRecommendDOM();
  updateExhibitionDOM();
  updateMemberDOM();
  updateBannerMapDOM();
  updateSyncTime();
}

// ================= CHART RENDER ENGINE =================
function renderOverviewCharts() {
  // Destroy previous instances to avoid overlay bugs
  if (charts.overviewRev) charts.overviewRev.destroy();
  if (charts.overviewRadar) charts.overviewRadar.destroy();

  const ctxRev = document.getElementById('chart-overview-revenue').getContext('2d');
  const gradient = getGradient(ctxRev, 'rgba(99, 102, 241, 0.4)', 'rgba(99, 102, 241, 0.0)');
  
  charts.overviewRev = new Chart(ctxRev, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: '거래액 (GMV, 백만원)',
          data: [98, 105, 112, 95, 120, 142, state.overview.gmv / 1000000],
          borderColor: '#6366f1',
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#6366f1',
          pointHoverRadius: 8
        },
        {
          label: '주문건수 (백건)',
          data: [18, 21, 23, 19, 24, 28, state.overview.orders / 100],
          borderColor: '#a78bfa',
          borderWidth: 2,
          borderDash: [5, 5],
          backgroundColor: 'transparent',
          tension: 0.3,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        },
        y1: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#a78bfa' }
        },
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        }
      },
      plugins: {
        legend: { labels: { color: '#f3f4f6' } }
      }
    }
  });

  const ctxRadar = document.getElementById('chart-overview-radar').getContext('2d');
  
  // Dynamic radar score calculation
  const scores = [
    state.product.warnCount > 5 ? 75 : 95,
    state.order.refundRate > 2 ? 80 : 96,
    state.search.zeroRate > 3 ? 70 : 88,
    state.recommend.ctr > 9 ? 96 : 86,
    state.exhibition.bounceRate > 40 ? 70 : 92,
    state.member.churn > 2.5 ? 75 : 94
  ];

  charts.overviewRadar = new Chart(ctxRadar, {
    type: 'radar',
    data: {
      labels: ['상품', '주문/매출', '검색엔진', '개인화추천', '전시구좌', '회원/활성'],
      datasets: [{
        label: '도메인 성능 스코어',
        data: scores,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366f1',
        borderWidth: 2,
        pointBackgroundColor: '#6366f1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: { color: '#9ca3af', font: { size: 11 } },
          ticks: { backdropColor: 'transparent', color: '#6b7280', stepSize: 20 },
          min: 0,
          max: 100
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function renderProductCharts() {
  if (charts.productCat) charts.productCat.destroy();

  const ctxCat = document.getElementById('chart-product-category').getContext('2d');
  
  charts.productCat = new Chart(ctxCat, {
    type: 'doughnut',
    data: {
      labels: state.product.categories.map(c => c.name),
      datasets: [{
        data: state.product.categories.map(c => c.value),
        backgroundColor: [
          '#10b981', // emerald
          '#059669',
          '#34d399',
          '#047857',
          '#6ee7b7',
          '#a7f3d0'
        ],
        borderWidth: 1,
        borderColor: '#111827'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#f3f4f6', boxWidth: 12 }
        }
      },
      cutout: '65%'
    }
  });
}

function renderOrderCharts() {
  if (charts.orderHourly) charts.orderHourly.destroy();

  const ctxHourly = document.getElementById('chart-order-hourly').getContext('2d');
  const gradient = getGradient(ctxHourly, 'rgba(139, 92, 246, 0.5)', 'rgba(139, 92, 246, 0.05)');

  charts.orderHourly = new Chart(ctxHourly, {
    type: 'bar',
    data: {
      labels: ['02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'],
      datasets: [{
        label: '매출액 (원)',
        data: state.order.hourlySales,
        backgroundColor: gradient,
        borderColor: '#8b5cf6',
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        },
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function renderSearchCharts() {
  if (charts.searchKeywords) charts.searchKeywords.destroy();

  const ctxKeywords = document.getElementById('chart-search-keywords').getContext('2d');
  const gradient = getGradient(ctxKeywords, 'rgba(6, 182, 212, 0.6)', 'rgba(6, 182, 212, 0.1)');

  charts.searchKeywords = new Chart(ctxKeywords, {
    type: 'bar',
    data: {
      labels: state.search.keywords.map(k => k.word),
      datasets: [{
        data: state.search.keywords.map(k => k.count),
        backgroundColor: gradient,
        borderColor: '#06b6d4',
        borderWidth: 1,
        borderRadius: 3
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#f3f4f6', font: { weight: 'bold' } }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function renderRecommendCharts() {
  if (charts.recPerf) charts.recPerf.destroy();

  const ctxPerf = document.getElementById('chart-rec-performance').getContext('2d');

  charts.recPerf = new Chart(ctxPerf, {
    type: 'line',
    data: {
      labels: state.recommend.algorithmCTR.labels,
      datasets: [
        {
          label: '딥러닝 하이브리드 추천 모델',
          data: state.recommend.algorithmCTR.dl,
          borderColor: '#ec4899',
          borderWidth: 3,
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 4
        },
        {
          label: '협업 필터링 (CF)',
          data: state.recommend.algorithmCTR.cf,
          borderColor: '#f43f5e',
          borderWidth: 2,
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 2
        },
        {
          label: '세션 순차 모델 (GRU4Rec)',
          data: state.recommend.algorithmCTR.session,
          borderColor: '#fb7185',
          borderWidth: 2,
          borderDash: [4, 4],
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af', callback: val => `${val}%` }
        },
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#f3f4f6', boxWidth: 15 }
        }
      }
    }
  });
}

function renderExhibitionCharts() {
  if (charts.exhSlots) charts.exhSlots.destroy();
  if (charts.exhCats) charts.exhCats.destroy();

  const ctxSlots = document.getElementById('chart-exh-slots').getContext('2d');
  
  charts.exhSlots = new Chart(ctxSlots, {
    type: 'bar',
    data: {
      labels: state.exhibition.slots.map(s => s.name),
      datasets: [{
        data: state.exhibition.slots.map(s => s.clicks),
        backgroundColor: [
          '#f59e0b',
          'rgba(245, 158, 11, 0.8)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(245, 158, 11, 0.4)'
        ],
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#9ca3af' }
        }
      },
      plugins: { legend: { display: false } }
    }
  });

  const ctxCats = document.getElementById('chart-exh-categories').getContext('2d');
  
  charts.exhCats = new Chart(ctxCats, {
    type: 'polarArea',
    data: {
      labels: ['의류/패션', '식음료/쿠폰', '가전/디지털', '가구/리빙'],
      datasets: [{
        data: state.exhibition.categories,
        backgroundColor: [
          'rgba(245, 158, 11, 0.6)',
          'rgba(99, 102, 241, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(236, 72, 153, 0.6)'
        ],
        borderWidth: 1,
        borderColor: '#111827'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { display: false }
        }
      },
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#f3f4f6', boxWidth: 10 }
        }
      }
    }
  });
}

function renderMemberCharts() {
  if (charts.membSignups) charts.membSignups.destroy();
  if (charts.membLoyalty) charts.membLoyalty.destroy();

  const ctxSignups = document.getElementById('chart-memb-signups').getContext('2d');
  const gradient = getGradient(ctxSignups, 'rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0.0)');

  charts.membSignups = new Chart(ctxSignups, {
    type: 'line',
    data: {
      labels: state.member.signupTrendLabels,
      datasets: [{
        label: '월간 신규 회원수',
        data: state.member.signupTrendValues,
        borderColor: '#3b82f6',
        backgroundColor: gradient,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#3b82f6',
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        },
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        }
      },
      plugins: { legend: { display: false } }
    }
  });

  const ctxLoyalty = document.getElementById('chart-memb-loyalty').getContext('2d');
  
  charts.membLoyalty = new Chart(ctxLoyalty, {
    type: 'pie',
    data: {
      labels: ['VVIP', 'VIP', 'FAMILY', 'WELCOME'],
      datasets: [{
        data: state.member.currentLoyalty,
        backgroundColor: [
          '#3b82f6',
          'rgba(59, 130, 246, 0.8)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(59, 130, 246, 0.2)'
        ],
        borderWidth: 1,
        borderColor: '#111827'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#f3f4f6', boxWidth: 12 }
        }
      }
    }
  });
}

// Switches chart rendering based on active view panel
function renderChartsForDomain(domain) {
  setTimeout(() => {
    if (domain === 'overview') renderOverviewCharts();
    else if (domain === 'product') renderProductCharts();
    else if (domain === 'order') renderOrderCharts();
    else if (domain === 'search') renderSearchCharts();
    else if (domain === 'recommend') renderRecommendCharts();
    else if (domain === 'exhibition') renderExhibitionCharts();
    else if (domain === 'banner-map') {
      renderBannerMapCharts();
      updateBannerMapDOM();
    }
    else if (domain === 'member') {
      renderMemberCharts();
      renderAnnualMemberChart();
    }
  }, 100); // 100ms timeout guarantees panel DOM is layout-ready for Canvas
}

// ================= DOM NAVIGATION CONTROL =================
function handleDomainChange(targetDomain) {
  // Update Body Theme Variable Class
  document.body.className = `theme-${targetDomain}`;

  // Update Menu Active States
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-view') === targetDomain) {
      item.classList.add('active');
    }
  });

  // Switch Active Panel
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  document.getElementById(`panel-${targetDomain}`).classList.add('active');

  // Update Header Labels
  const titleMap = {
    overview: { title: '이커머스 지표 분석 오버뷰', badge: 'Overview', sub: '각 도메인의 주요 비즈니스 메트릭스 및 실시간 시스템 헬스 모니터링' },
    product: { title: '상품 전시 및 재고 현황', badge: 'Product', sub: '전체 전시 상품 개수, 품절/경고 재고 상태 관리 및 카테고리 기획' },
    order: { title: '주문 결제 및 매출 통계', badge: 'Order', sub: '시간대별 매출 추이 분석 및 실시간 결제 퍼널 최적화 지표' },
    search: { title: '검색 엔진 및 쿼리 통계', badge: 'Search', sub: '인기 검색 키워드 분석, 검색 클릭율 및 검색 결과 없음 이슈 해결' },
    recommend: { title: '개인화 추천 시스템 퍼포먼스', badge: 'Recommendation', sub: '인공지능 모델별 노출 대비 클릭 효율 및 추천 매출 기여도 추적' },
    exhibition: { title: '전시 배너 및 구좌 분석', badge: 'Exhibition', sub: '마케팅 전시 배너 성과, 카테고리 이탈 및 기획전 유입 효율 진단' },
    'banner-map': { title: '전시배너 및 구좌 분석 (Map)', badge: 'Banner Map', sub: 'm.halfclub.com 메인 페이지의 영역별 구좌 설정 및 실시간 CTR 클릭 맵 분석' },
    member: { title: '회원 가입 및 활성 분석', badge: 'Member', sub: '일일 활성 유저(DAU), 이탈율 진단 및 등급별 로열티 유입 분포' }
  };

  const headerInfo = titleMap[targetDomain];
  document.getElementById('current-panel-title').textContent = headerInfo.title;
  document.getElementById('current-domain-badge').textContent = headerInfo.badge;
  document.getElementById('current-panel-subtitle').textContent = headerInfo.sub;

  // Render newly active domain's charts
  renderChartsForDomain(targetDomain);
}

// ================= SIMULATOR HANDLERS =================

// 1. Refresh Data: Minor random fluctuation
function simulateDataRefresh() {
  // Fluctuates sales and user traffic randomly
  state.overview.gmv += (Math.random() - 0.4) * 800000;
  state.overview.orders += Math.floor((Math.random() - 0.3) * 10);
  state.overview.dau += Math.floor((Math.random() - 0.4) * 80);
  
  state.order.gmv = state.overview.gmv;
  state.order.count = state.overview.orders;
  
  state.order.funnel.sessions += Math.floor(Math.random() * 20);
  state.order.funnel.cart += Math.floor(Math.random() * 8);
  state.order.funnel.checkout += Math.floor(Math.random() * 4);
  state.order.funnel.payment = state.order.count;

  // Elastic search response speed variance
  state.search.latency = Math.max(50, state.search.latency + Math.floor((Math.random() - 0.5) * 6));
  state.search.totalQueries += Math.floor(Math.random() * 5);

  updateAllDOM();
  
  // Redraw whatever is active
  const activeItem = document.querySelector('.menu-item.active');
  if (activeItem) {
    renderChartsForDomain(activeItem.getAttribute('data-view'));
  }

  triggerToast('데이터 실시간 동기화', '지표 데이터베이스 동기화 및 캐시가 갱신되었습니다.', 'success');
}

// 2. Order Burst Simulator (Blast GMV upwards)
function simulateOrderBurst(count = 100) {
  const burstGMV = count * Math.floor(45000 + Math.random() * 20000);
  
  state.overview.gmv += burstGMV;
  state.overview.orders += count;
  
  state.order.gmv = state.overview.gmv;
  state.order.count = state.overview.orders;
  state.order.aov = Math.round(state.order.gmv / state.order.count);
  
  // Feed into funnel
  state.order.funnel.sessions += count * 6;
  state.order.funnel.cart += count * 3;
  state.order.funnel.checkout += count * 2;
  state.order.funnel.payment += count;

  // Add into active hourly sales slot (say, index 9 - 20h)
  state.order.hourlySales[9] += burstGMV;

  // Alert system check: high traffic warning
  state.overview.health.order.latency = '120ms';
  state.overview.health.order.status = 'warning';
  state.overview.health.order.notes = '주문 과다 트래픽 대응을 위한 임시 대기열 생성 중';

  updateAllDOM();

  const activeDomain = document.querySelector('.menu-item.active').getAttribute('data-view');
  renderChartsForDomain(activeDomain);

  triggerToast('실시간 주문 폭주 알림', `가상 결제 트래픽 ${count}건 발생! (총 거래액 +${formatWon(burstGMV)})`, 'warning');
}

// 3. Traffic Spike Simulator
function simulateTrafficSpike() {
  state.overview.dau = Math.round(state.overview.dau * 1.8);
  state.member.dau = state.overview.dau;
  
  state.overview.health.search.latency = '210ms';
  state.overview.health.search.status = 'warning';
  state.overview.health.search.notes = '동시 검색 트래픽 폭증으로 인덱싱 속도 일시 저하';

  state.search.totalQueries += 45000;
  state.search.ctr = Math.min(99, state.search.ctr * 1.1);

  updateAllDOM();

  const activeDomain = document.querySelector('.menu-item.active').getAttribute('data-view');
  renderChartsForDomain(activeDomain);

  triggerToast('트래픽 스파이크 발생', `실시간 DAU가 ${formatNum(state.overview.dau)}명으로 급격히 증가했습니다. 검색엔진 부하 관제 요망!`, 'error');
}

// ================= DOM EVENTS & MODAL MANAGEMENT =================

// Modal togglers
function initModals() {
  // Modal buttons bind
  const binds = [
    { btnId: 'btn-prod-add', modalId: 'modal-product-add' },
    { btnId: 'btn-exh-deploy', modalId: 'modal-exh-deploy' },
    { btnId: 'btn-search-simulate', modalId: 'modal-search-simulate' },
    { btnId: 'btn-rec-switch', modalId: 'modal-rec-switch' }
  ];

  binds.forEach(b => {
    const btn = document.getElementById(b.btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        document.getElementById(b.modalId).classList.add('active');
      });
    }
  });

  // Modal Close bind
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modalId = e.currentTarget.getAttribute('data-close');
      document.getElementById(modalId).classList.remove('active');
    });
  });

  // Action: Add Product Form Submission
  document.getElementById('btn-submit-product-add').addEventListener('click', () => {
    const name = document.getElementById('new-prod-name').value.trim();
    const cat = document.getElementById('new-prod-cat').value.trim();
    const stockVal = document.getElementById('new-prod-stock').value;
    const stock = stockVal === '' ? 0 : parseInt(stockVal);

    if (!name || !cat) {
      alert('상품명과 카테고리를 올바르게 입력해주세요.');
      return;
    }

    state.product.total += 1;
    // Add to stock alerts if stock is low
    if (stock <= 5) {
      state.product.alerts.unshift({ name, category: cat, stock, status: stock === 0 ? '품절' : '위험' });
      state.product.warnCount = state.product.alerts.length;
    }

    // Fluctuate category count slightly
    const categoryMatch = state.product.categories.find(c => c.name === cat);
    if (categoryMatch) {
      categoryMatch.value += 1;
    } else {
      state.product.categories.push({ name: cat, value: 1 });
    }

    updateProductDOM();
    if (document.body.classList.contains('theme-product')) {
      renderProductCharts();
    }
    
    document.getElementById('modal-product-add').classList.remove('active');
    triggerToast('상품 등록 성공', `"${name}" 상품이 데이터베이스에 등록되었습니다.`, 'success');
  });

  // Action: Deploy Banner Form Submission
  document.getElementById('btn-submit-exh-deploy').addEventListener('click', () => {
    const name = document.getElementById('exh-banner-name').value.trim();
    const slotStr = document.getElementById('exh-banner-slot').value.trim();
    const ctrVal = parseFloat(document.getElementById('exh-banner-ctr-val').value || '0');

    if (!name) {
      alert('캠페인명을 기입해주세요.');
      return;
    }

    // Set metrics
    state.exhibition.bannerCtr = (state.exhibition.bannerCtr + ctrVal) / 2;
    state.exhibition.activeEvents += 1;
    state.exhibition.slots[0] = { name: `${slotStr} : ${name}`, clicks: Math.round(state.exhibition.slots[0].clicks * 1.25) };

    updateAllDOM();
    if (document.body.classList.contains('theme-exhibition')) {
      renderExhibitionCharts();
    }

    document.getElementById('modal-exh-deploy').classList.remove('active');
    triggerToast('신규 배너 구좌 배포', `마케팅 기획 배너 "${name}" 가 실시간 노출 적용되었습니다.`, 'success');
  });

  // Action: Search Query Ingestion Submission
  document.getElementById('btn-submit-search-simulate').addEventListener('click', () => {
    const query = document.getElementById('search-query-val').value.trim();
    const count = parseInt(document.getElementById('search-query-count').value || '10');

    if (!query) {
      alert('검색어를 올바르게 적어주세요.');
      return;
    }

    state.search.totalQueries += count;
    state.search.zeroResults.unshift({
      word: query,
      count: count,
      status: '급증',
      action: '분석 대기 중'
    });

    state.search.zeroRate = (state.search.zeroResults.length / 20) * 10; // Scale dynamically

    updateSearchDOM();
    document.getElementById('modal-search-simulate').classList.remove('active');
    triggerToast('검색결과 없음 주입', `이탈 분석을 위해 미결과 키워드 "${query}" 이 유입 완료되었습니다.`, 'warning');
  });

  // Action: Recommendation Model Switch Strategy Submission
  document.getElementById('btn-submit-rec-switch').addEventListener('click', () => {
    const selectEl = document.getElementById('rec-strategy-select');
    const strat = selectEl.value;
    const stratText = selectEl.options[selectEl.selectedIndex].text;

    // Shift CTR scores depending on what strategy was loaded
    if (strat === 'collaborative') {
      state.recommend.ctr = 6.75;
      state.recommend.precision = 74.5;
    } else if (strat === 'deeplearning') {
      state.recommend.ctr = 8.42;
      state.recommend.precision = 82.1;
    } else if (strat === 'session') {
      state.recommend.ctr = 6.02;
      state.recommend.precision = 78.2;
    }

    updateRecommendDOM();
    if (document.body.classList.contains('theme-recommend')) {
      renderRecommendCharts();
    }

    document.getElementById('modal-rec-switch').classList.remove('active');
    triggerToast('알고리즘 배포 완료', `추천 서빙 노드가 "${stratText}" 모델로 교체되었습니다.`, 'success');
  });
}

// replenishment stocks onclick
window.replenishStock = function(index) {
  const item = state.product.alerts[index];
  item.stock += 100;
  
  // Remove from warning lists if stock is safe (>5)
  if (item.stock > 5) {
    state.product.alerts.splice(index, 1);
  }
  
  state.product.warnCount = state.product.alerts.length;
  updateProductDOM();
  triggerToast('발주 입고 완료', `선택 상품의 긴급 발주 물량 100개가 입고 완료되었습니다.`, 'success');
};

// resolve search query matching onclick
window.resolveZeroKeyword = function(index) {
  const item = state.search.zeroResults[index];
  
  // Remove resolved item from list
  state.search.zeroResults.splice(index, 1);
  state.search.zeroRate = (state.search.zeroResults.length / 20) * 10;
  
  updateSearchDOM();
  triggerToast('키워드 동기화 완료', `품절/미매칭 키워드 "${item.word}" 가 대체 추천 상품과 매핑되었습니다.`, 'success');
};

// ================= GLOSSARY & SEARCH WIDGET LOGIC =================
function initGlossarySearch() {
  const searchInput = document.getElementById('glossary-search');
  const resultsPanel = document.getElementById('search-results-panel');

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase().trim();
    
    if (val === '') {
      resultsPanel.classList.remove('active');
      return;
    }

    const filtered = GLOSSARY.filter(item => 
      item.term.toLowerCase().includes(val) || 
      item.desc.toLowerCase().includes(val) || 
      item.domain.toLowerCase().includes(val)
    );

    resultsPanel.innerHTML = '';
    
    if (filtered.length === 0) {
      resultsPanel.innerHTML = '<div class="empty-state">검색 매칭 지표가 없습니다.</div>';
    } else {
      filtered.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'search-result-item';
        itemEl.innerHTML = `
          <div class="result-domain">${item.domain}</div>
          <div class="result-title">${item.term}</div>
          <div class="result-desc">${item.desc}</div>
        `;
        // Switch page & close panel on click
        itemEl.addEventListener('click', () => {
          handleDomainChange(item.tab);
          searchInput.value = '';
          resultsPanel.classList.remove('active');
        });
        resultsPanel.appendChild(itemEl);
      });
    }

    resultsPanel.classList.add('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsPanel.contains(e.target)) {
      resultsPanel.classList.remove('active');
    }
  });
}

// ================= GENERAL BINDINGS =================
function initEvents() {
  // Navigation sidebar item clicks
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetDomain = e.currentTarget.getAttribute('data-view');
      handleDomainChange(targetDomain);
    });
  });

  // Sidebar Simulator actions
  document.getElementById('sim-btn-refresh').addEventListener('click', simulateDataRefresh);
  document.getElementById('sim-btn-burst').addEventListener('click', () => simulateOrderBurst(150));
  document.getElementById('sim-btn-traffic').addEventListener('click', simulateTrafficSpike);

  // In-card order simulation hooks
  document.getElementById('btn-sim-order-one').addEventListener('click', () => simulateOrderBurst(1));
  document.getElementById('btn-sim-order-burst').addEventListener('click', () => simulateOrderBurst(100));
  document.getElementById('btn-sim-order-reset').addEventListener('click', () => {
    state.overview.gmv = 124500000;
    state.overview.orders = 2480;
    state.order.gmv = 124500000;
    state.order.count = 2480;
    state.order.aov = 50200;
    state.order.funnel = { sessions: 64400, cart: 12880, checkout: 5152, payment: 2480 };
    state.order.hourlySales[9] = 4100000;
    
    // System Status Restoration
    state.overview.health.order.status = 'active';
    state.overview.health.order.latency = '42ms';
    state.overview.health.order.notes = '안정적';

    updateAllDOM();
    renderOrderCharts();
    triggerToast('시뮬레이션 데이터 복구', '주문 지표가 기준 초기 상태로 리셋되었습니다.', 'success');
  });

  // Member Marketing Burst Hook
  document.getElementById('btn-memb-burst').addEventListener('click', () => {
    const signups = 15000;
    state.member.total += signups;
    state.member.dau += Math.round(signups * 0.8);
    state.overview.dau += Math.round(signups * 0.8);
    
    if (state.member.signupTrendValues && state.member.signupTrendValues.length > 0) {
      state.member.signupTrendValues[state.member.signupTrendValues.length - 1] += signups;
    }

    updateAllDOM();
    if (document.body.classList.contains('theme-member')) {
      renderMemberCharts();
    }

    triggerToast('가상 마케팅 리드 성공', `신규 활성회원 ${formatNum(signups)}명이 모바일 프로모션 링크를 통해 가상 유입되었습니다.`, 'success');
  });

  // Site Dropdown Select Bind
  const siteSelect = document.getElementById('member-site-select');
  if (siteSelect) {
    siteSelect.addEventListener('change', (e) => {
      updateMemberDataState(e.target.value);
      updateAnnualMemberDataState(e.target.value);
    });
  }
}

// ================= MEMBER EXCEL DATA BINDINGS =================
let memberData = null;
let annualMemberData = null;

function loadMemberData() {
  // Use injected variables if available, otherwise fallback to fetch
  if (window.memberDataInjected && window.annualMemberDataInjected) {
    memberData = window.memberDataInjected;
    updateMemberDataState(document.getElementById('member-site-select').value || '전체');
    triggerToast('엑셀 데이터 동기화 완료', '월별 등급 현황 엑셀 데이터가 성공적으로 반영되었습니다.', 'success');
    
    annualMemberData = window.annualMemberDataInjected;
    updateAnnualMemberDataState(document.getElementById('member-site-select').value || '전체');
  } else {
    // Load Monthly Data
    fetch('data/member_data.json')
      .then(response => response.json())
      .then(data => {
        memberData = data;
        updateMemberDataState(document.getElementById('member-site-select').value || '전체');
        triggerToast('엑셀 데이터 동기화 완료', '월별 등급 현황 엑셀 데이터가 성공적으로 반영되었습니다.', 'success');
        
        // Load Annual Data
        return fetch('data/annual_member_data.json');
      })
      .then(response => response.json())
      .then(data => {
        annualMemberData = data;
        updateAnnualMemberDataState(document.getElementById('member-site-select').value || '전체');
      })
      .catch(err => {
        console.error('Failed to load member data from json', err);
        triggerToast('데이터 동기화 실패', '등급/연누계 엑셀 데이터 파일 로드 중 오류가 발생했습니다.', 'error');
      });
  }
}

function updateMemberDataState(site) {
  if (!memberData) return;
  
  const months = memberData.months;
  const len = months.length;
  if (len === 0) return;
  
  // Latest values (index len - 1)
  const total = memberData[site]["total"][len - 1];
  const vvip = memberData[site]["vvip"][len - 1];
  const vip = memberData[site]["vip"][len - 1];
  const family = memberData[site]["family"][len - 1];
  const welcome = memberData[site]["welcome"][len - 1];
  
  state.member.total = total;
  state.member.currentLoyalty = [vvip, vip, family, welcome];
  
  // Calculate MoM new signups for the last 12 months (e.g. len - 12 to len - 1)
  const startIdx = Math.max(1, len - 12);
  const trendLabels = [];
  const trendValues = [];
  
  for (let i = startIdx; i < len; i++) {
    const monthStr = months[i];
    // Format "202606" -> "26.06"
    const formattedMonth = monthStr.slice(2, 4) + '.' + monthStr.slice(4, 6);
    trendLabels.push(formattedMonth);
    
    const curTotal = memberData[site]["total"][i];
    const prevTotal = memberData[site]["total"][i - 1];
    const signups = Math.max(0, curTotal - prevTotal);
    trendValues.push(signups);
  }
  
  state.member.signupTrendLabels = trendLabels;
  state.member.signupTrendValues = trendValues;
  
  // Trigger DOM updates
  updateMemberDOM();
  
  // If Member page is active, redraw its charts
  if (document.body.classList.contains('theme-member')) {
    renderMemberCharts();
  }
}

function updateAnnualMemberDataState(site) {
  if (!annualMemberData) return;
  
  const years = annualMemberData.years;
  const len = years.length;
  if (len === 0) return;
  
  // Fill the table id="memb-annual-table"
  const tbody = document.querySelector('#memb-annual-table tbody');
  tbody.innerHTML = '';
  
  // Show table in reverse order (newest year first)
  for (let i = len - 1; i >= 0; i--) {
    const yr = years[i];
    const active = annualMemberData[site]["active"][i];
    const nw = annualMemberData[site]["new"][i];
    const withdrawn = annualMemberData[site]["withdrawn"][i];
    const buyers = annualMemberData[site]["buyers"][i];
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 700; color: var(--accent-color);">${yr}년</td>
      <td style="font-weight: 600;">${formatNum(active)}명</td>
      <td style="color: #34d399; font-weight: 600;">+${formatNum(nw)}명</td>
      <td style="color: #f87171;">-${formatNum(withdrawn)}명</td>
      <td style="font-weight: 600;">${formatNum(buyers)}명</td>
    `;
    tbody.appendChild(tr);
  }
  
  state.member.annualYears = years;
  state.member.annualNew = annualMemberData[site]["new"];
  state.member.annualWithdrawn = annualMemberData[site]["withdrawn"];
  
  // Redraw annual chart if member page is active
  if (document.body.classList.contains('theme-member')) {
    renderAnnualMemberChart();
  }
}

function renderAnnualMemberChart() {
  if (charts.membAnnual) charts.membAnnual.destroy();

  const ctxAnnual = document.getElementById('chart-memb-annual-turnover').getContext('2d');
  
  const gradientNew = getGradient(ctxAnnual, 'rgba(52, 211, 153, 0.5)', 'rgba(52, 211, 153, 0.05)');
  const gradientWithdrawn = getGradient(ctxAnnual, 'rgba(248, 113, 113, 0.5)', 'rgba(248, 113, 113, 0.05)');

  charts.membAnnual = new Chart(ctxAnnual, {
    type: 'bar',
    data: {
      labels: state.member.annualYears.map(yr => `${yr}년`),
      datasets: [
        {
          label: '신규 가입 회원수',
          data: state.member.annualNew,
          backgroundColor: gradientNew,
          borderColor: '#10b981',
          borderWidth: 2,
          borderRadius: 4
        },
        {
          label: '탈퇴 회원수',
          data: state.member.annualWithdrawn,
          backgroundColor: gradientWithdrawn,
          borderColor: '#ef4444',
          borderWidth: 2,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#9ca3af' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#f3f4f6', boxWidth: 12 }
        }
      }
    }
  });
}

// ================= BANNER MAP INTERACTIVE COMPONENT =================
function updateBannerMapDOM() {
  const slotId = state.bannerMap.selectedSlot;
  const slot = state.bannerMap.slots[slotId];
  if (!slot) return;

  // 1. Update Top KPIs
  const selectedKpiEl = document.getElementById('map-kpi-selected');
  if (selectedKpiEl) selectedKpiEl.textContent = slot.name;
  
  const descKpiEl = document.getElementById('map-kpi-desc');
  if (descKpiEl) descKpiEl.textContent = slot.desc;
  
  const ctrKpiEl = document.getElementById('map-kpi-ctr');
  if (ctrKpiEl) ctrKpiEl.textContent = `${slot.ctr.toFixed(2)}%`;
  
  // Update KPI Trend with color styling and correct icon
  const trendEl = document.getElementById('map-kpi-trend');
  if (trendEl) {
    const isUp = slot.trend.startsWith('+');
    trendEl.className = `kpi-trend ${isUp ? 'trend-up' : 'trend-down'}`;
    trendEl.innerHTML = `<i data-lucide="${isUp ? 'arrow-up-right' : 'arrow-down-left'}"></i>${slot.trend.slice(1)}`;
  }

  const clicksKpiEl = document.getElementById('map-kpi-clicks');
  if (clicksKpiEl) clicksKpiEl.textContent = `${formatNum(slot.impressions)} / ${formatNum(slot.clicks)}`;
  
  const ratioKpiEl = document.getElementById('map-kpi-ratio');
  if (ratioKpiEl) ratioKpiEl.textContent = `노출 대비 클릭 비중 (CTR ${slot.ctr.toFixed(2)}%)`;
  
  const cvrKpiEl = document.getElementById('map-kpi-cvr');
  if (cvrKpiEl) cvrKpiEl.textContent = `${slot.cvr.toFixed(2)}%`;

  // 2. Update Details Card (Right Side)
  const detailTitleEl = document.getElementById('map-detail-title');
  if (detailTitleEl) detailTitleEl.innerHTML = `<i data-lucide="tag"></i>${slot.name}`;
  
  const detailDescEl = document.getElementById('map-detail-desc');
  if (detailDescEl) detailDescEl.textContent = slot.desc;
  
  const activeAssetEl = document.getElementById('map-detail-active-asset');
  if (activeAssetEl) activeAssetEl.textContent = slot.activeAsset;

  // 3. Highlight Mock Slot in Phone
  document.querySelectorAll('.mock-slot').forEach(el => el.classList.remove('active'));
  document.querySelectorAll(`[data-slot="${slotId}"]`).forEach(el => el.classList.add('active'));

  // 4. Update Selector Options in Simulator
  const select = document.getElementById('map-asset-select');
  if (select) {
    select.innerHTML = '';
    slot.assets.forEach((asset, idx) => {
      const option = document.createElement('option');
      option.value = idx;
      // If it's the currently active asset, mark selected
      if (asset.text === slot.activeAsset || asset.name === slot.activeAsset) {
        option.selected = true;
      }
      option.textContent = `${asset.name} (예측 CTR: ${asset.baseCtr.toFixed(2)}%)`;
      select.appendChild(option);
    });
  }

  // 5. Update CTR Overlay text for all slots
  for (const [key, s] of Object.entries(state.bannerMap.slots)) {
    const overlays = document.querySelectorAll(`[data-slot="${key}"] .ctr-overlay`);
    overlays.forEach(overlay => {
      const badge = overlay.querySelector('.ctr-badge');
      if (badge) {
        badge.textContent = `CTR ${s.ctr.toFixed(1)}%`;
        badge.className = 'ctr-badge';
        if (s.ctr >= 10.0) {
          badge.classList.add('high');
        } else if (s.ctr >= 5.0) {
          badge.classList.add('mid');
        } else {
          badge.classList.add('low');
        }
      }
    });
  }

  // Bind SVG elements dynamically
  lucide.createIcons();
}

function updateMockVisual(slotId, text, img) {
  if (slotId === 'top-banner') {
    const textEl = document.getElementById('mock-top-banner-text');
    if (textEl) textEl.textContent = text;
  } else if (slotId === 'main-banner') {
    const bannerEl = document.getElementById('mock-main-banner');
    const textEl = document.getElementById('mock-main-banner-text');
    if (bannerEl && img) bannerEl.style.backgroundImage = `url('${img}')`;
    if (textEl) textEl.textContent = text;
  } else if (slotId === 'time-sale') {
    const imgEl = document.getElementById('mock-time-sale-img');
    const textEl = document.getElementById('mock-time-sale-text');
    if (imgEl && img) imgEl.style.backgroundImage = `url('${img}')`;
    if (textEl) textEl.textContent = text;
  } else if (slotId === 'mid-banner') {
    const bannerEl = document.getElementById('mock-mid-banner');
    const textEl = document.getElementById('mock-mid-banner-text');
    if (bannerEl && img) bannerEl.style.backgroundImage = `url('${img}')`;
    if (textEl) textEl.textContent = text;
  } else if (slotId === 'recommend-slot') {
    const imgEl = document.getElementById('mock-recommend-img');
    const textEl = document.getElementById('mock-recommend-text');
    if (imgEl && img) imgEl.style.backgroundImage = `url('${img}')`;
    if (textEl) textEl.textContent = text;
  } else if (slotId === 'best-products') {
    const imgEl = document.getElementById('mock-best-img');
    const textEl = document.getElementById('mock-best-text');
    if (imgEl && img) imgEl.style.backgroundImage = `url('${img}')`;
    if (textEl) textEl.textContent = text;
  }
}

function renderBannerMapCharts() {
  if (charts.mapHourly) charts.mapHourly.destroy();

  const ctx = document.getElementById('chart-map-hourly');
  if (!ctx) return;
  const ctx2d = ctx.getContext('2d');
  
  const slot = state.bannerMap.slots[state.bannerMap.selectedSlot];
  if (!slot) return;

  const gradientColor = getGradient(ctx2d, 'rgba(244, 63, 94, 0.45)', 'rgba(244, 63, 94, 0.05)');

  charts.mapHourly = new Chart(ctx2d, {
    type: 'line',
    data: {
      labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
      datasets: [{
        label: `${slot.name} 실시간 클릭수`,
        data: slot.hourlyClicks,
        borderColor: '#f43f5e',
        backgroundColor: gradientColor,
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#f43f5e',
        pointBorderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#9ca3af' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#9ca3af' }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function initBannerMapEvents() {
  // 1. Clicks on Phone Simulator Slots
  document.querySelectorAll('.mock-slot').forEach(el => {
    el.addEventListener('click', (e) => {
      const slotId = e.currentTarget.getAttribute('data-slot');
      if (slotId) {
        state.bannerMap.selectedSlot = slotId;
        updateBannerMapDOM();
        renderBannerMapCharts();
      }
    });
  });

  // 2. CTR Overlay Toggle
  const toggle = document.getElementById('toggle-ctr-overlay');
  if (toggle) {
    toggle.addEventListener('change', (e) => {
      state.bannerMap.overlayVisible = e.target.checked;
      const phoneDevice = document.getElementById('map-phone-device');
      if (phoneDevice) {
        if (state.bannerMap.overlayVisible) {
          phoneDevice.classList.add('show-overlays');
        } else {
          phoneDevice.classList.remove('show-overlays');
        }
      }
    });
  }

  // 3. Simulator Button
  const simBtn = document.getElementById('btn-map-simulate');
  if (simBtn) {
    simBtn.addEventListener('click', () => {
      const select = document.getElementById('map-asset-select');
      if (!select) return;
      const assetIdx = parseInt(select.value);
      const slot = state.bannerMap.slots[state.bannerMap.selectedSlot];
      if (!slot) return;
      const newAsset = slot.assets[assetIdx];
      if (!newAsset) return;

      // Disable button, show loader
      simBtn.disabled = true;
      const loader = document.getElementById('predict-loader');
      if (loader) loader.classList.remove('hidden');

      setTimeout(() => {
        // Run simulation calculation
        slot.activeAsset = newAsset.text || newAsset.name;
        
        const oldCtr = slot.ctr;
        const newCtr = newAsset.baseCtr;
        slot.ctr = newCtr;
        
        slot.clicks = Math.round(slot.impressions * (newCtr / 100));
        
        const pctDiff = ((newCtr - oldCtr) / oldCtr) * 100;
        slot.trend = (pctDiff >= 0 ? '+' : '') + pctDiff.toFixed(1) + '%';
        
        const ratio = newCtr / oldCtr;
        slot.hourlyClicks = slot.hourlyClicks.map(val => Math.round(val * ratio));

        // Update visual mock in phone
        updateMockVisual(slot.id, newAsset.text || newAsset.name, newAsset.img);

        // Hide loader, enable button
        if (loader) loader.classList.add('hidden');
        simBtn.disabled = false;

        // Update DOM & charts
        updateBannerMapDOM();
        renderBannerMapCharts();

        triggerToast(
          '소재 시뮬레이션 완료',
          `[${slot.name}] 구좌가 새로운 소재로 송출 시뮬레이션 되었습니다. 예측 CTR: ${newCtr.toFixed(2)}%`,
          'success'
        );
      }, 1200); // 1.2s delay for AI prediction feeling
    });
  }
}

// ================= APP BOOTSTRAP =================
window.addEventListener('DOMContentLoaded', () => {
  // Bind SVG elements dynamically
  lucide.createIcons();
  
  // Register metrics structure & triggers
  updateAllDOM();
  initModals();
  initGlossarySearch();
  initEvents();
  initBannerMapEvents();
  
  // Render Overview layout charts initially
  renderOverviewCharts();
  
  // Load actual Excel extracted JSON
  loadMemberData();
});
