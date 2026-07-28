// 급식 "소리"함 도구 목록
//
// 새 웹앱이 완성되면 아래 배열에서 해당 도구를 찾아
// status 를 'ready' 로, url 을 실제 주소로 수정하기만 하면 사이트에 바로 연결됩니다.
//
// status 종류
//   ready    : 바로 사용 가능 (url 필수, 새 창에서 열림)
//   download : 자료 다운로드 (url 은 다운로드 링크)
//   coming   : 준비 중 (버튼 비활성화, url 불필요)
//
// category 값은 src/data/categories.js 의 id 와 일치해야 합니다.

export const tools = [
  // ── 식단 기획·급식 운영 ─────────────────────────────
  {
    id: 'meal-poster-prompt-builder',
    title: '식단 게시자료 프롬프트 생성기',
    category: 'meal-planning',
    status: 'ready',
    url: 'https://thfl4811-maker.github.io/meal-poster-prompt-builder/',
    description: '식단과 게시 목적에 맞는 이미지 제작용 프롬프트를 생성합니다.',
  },
  {
    id: 'smart-meal-signage',
    title: '스마트 월간식단 뷰어',
    category: 'meal-planning',
    status: 'ready',
    url: 'https://smart-meal-signage.vercel.app/',
    description: '월간 식단을 보기 쉽게 정리하고 게시용 화면으로 활용합니다.',
  },
  {
    id: 'smart-meal-archive',
    title: '나의 식단 아카이브',
    category: 'meal-planning',
    status: 'ready',
    url: 'https://smart-meal-archive.vercel.app/',
    description: '실제 식단 카드와 메뉴 조합 사례를 검색하는 식단 아카이브입니다.',
  },
  {
    id: 'choice-meal-menu-finder',
    title: '자율선택급식 메뉴 탐색기',
    category: 'meal-planning',
    status: 'ready',
    url: 'https://thfl4811-maker.github.io/choice-meal-menu-finder/',
    description: '선택급식 메뉴와 자율급식 아이디어를 탐색합니다.',
  },
  {
    id: 'school-meal-survey',
    title: '선호도 조사기',
    category: 'meal-planning',
    status: 'ready',
    url: 'https://school-meal-survey-v2.vercel.app/',
    description: '자율선택급식 선호도 조사를 만들고 운영합니다.',
  },
  {
    id: 'honey-combo-menu',
    title: '꿀조합 추천식단',
    category: 'meal-planning',
    status: 'coming',
    description: '잘 어울리는 메뉴 조합을 추천하는 도구입니다. 준비 중입니다.',
  },
  {
    id: 'recipe-download',
    title: '조리레시피 바로 다운받기',
    category: 'meal-planning',
    status: 'coming',
    description: '조리 레시피 자료를 바로 내려받는 도구입니다. 준비 중입니다.',
  },

  // ── 계약·발주·검수·품의 ─────────────────────────────
  {
    id: 'rice-order-planner',
    title: '만년형 쌀 발주 계산기',
    category: 'contract',
    status: 'ready',
    url: 'https://thfl4811-maker.github.io/rice-order-planner/',
    description: '재고와 급식기간을 반영해 쌀 발주량을 계산합니다.',
  },
  {
    id: 'edu-finance-drafter',
    title: '품의서 작성기',
    category: 'contract',
    status: 'ready',
    url: 'https://edu-finance-drafter-3.vercel.app/',
    description: '물품 구입과 협의회 품의서 초안을 작성합니다.',
  },
  {
    id: 'market-research-converter',
    title: '시장조사 자료변환',
    category: 'contract',
    status: 'coming',
    description: '시장조사 자료를 원하는 형식으로 변환하는 도구입니다. 준비 중입니다.',
  },
  {
    id: 'contract-price-matcher',
    title: '계약단가·검수단가 자동매칭',
    category: 'contract',
    status: 'coming',
    description: '계약단가와 검수단가를 자동으로 매칭하는 도구입니다. 준비 중입니다.',
  },

  // ── 급식위생·식품안전교육 ─────────────────────────────
  {
    id: 'haccp-education',
    title: 'HACCP 교육',
    category: 'safety',
    status: 'coming',
    description: 'HACCP 교육 자료입니다. 준비 중입니다.',
  },
  {
    id: 'food-safety-education',
    title: '급식위생·식품안전교육',
    category: 'safety',
    status: 'coming',
    description: '급식위생과 식품안전교육 자료입니다. 준비 중입니다.',
  },

  // ── 교육·수업 활용 ─────────────────────────────
  {
    id: 'webapp-class',
    title: '웹앱 활용 수업',
    category: 'education',
    status: 'coming',
    description: '웹앱을 활용한 수업 자료입니다. 준비 중입니다.',
  },
  {
    id: 'student-participation-education',
    title: '학생 참여형 영양·식생활교육',
    category: 'education',
    status: 'coming',
    description: '학생 참여형 영양·식생활교육 자료입니다. 준비 중입니다.',
  },
  {
    id: 'choice-meal-class',
    title: '자율선택급식 활용 수업',
    category: 'education',
    status: 'coming',
    description: '자율선택급식을 활용한 수업 자료입니다. 준비 중입니다.',
  },
  {
    id: 'smart-device-ai-class',
    title: '스마트기기·AI 활용 수업자료',
    category: 'education',
    status: 'coming',
    description: '스마트기기와 AI를 활용한 수업자료입니다. 준비 중입니다.',
  },
  {
    id: 'class-case-results',
    title: '수업 운영사례와 결과물',
    category: 'education',
    status: 'coming',
    description: '수업 운영사례와 결과물 모음입니다. 준비 중입니다.',
  },

  // ── 업무관리·디지털 운영 ─────────────────────────────
  {
    id: 'notion-case',
    title: '노션 운영사례',
    category: 'management',
    status: 'coming',
    description: '노션을 활용한 업무 운영사례입니다. 준비 중입니다.',
  },
  {
    id: 'nutrition-teacher-notebook',
    title: '영양교무수첩',
    category: 'management',
    status: 'coming',
    description: '영양교사 업무수첩 자료입니다. 준비 중입니다.',
  },
  {
    id: 'work-archive',
    title: '업무자료 아카이브',
    category: 'management',
    status: 'coming',
    description: '각종 업무자료 아카이브입니다. 준비 중입니다.',
  },
  {
    id: 'online-meal-room',
    title: '온라인 급식실',
    category: 'management',
    status: 'coming',
    description: '온라인 급식실 운영 도구입니다. 준비 중입니다.',
  },

  // ── AI 활용 학교급식 운영사례 ─────────────────────────────
  {
    id: 'ai-efficiency-case',
    title: 'AI 활용 학교급식 업무효율화',
    category: 'ai-cases',
    status: 'coming',
    description: 'AI를 활용한 학교급식 업무효율화 사례입니다. 준비 중입니다.',
  },
  {
    id: 'real-school-case',
    title: '실제 학교 적용사례',
    category: 'ai-cases',
    status: 'coming',
    description: '실제 학교 현장 적용사례입니다. 준비 중입니다.',
  },
  {
    id: 'choice-meal-operation-case',
    title: '자율선택급식 운영사례',
    category: 'ai-cases',
    status: 'coming',
    description: '자율선택급식 운영사례입니다. 준비 중입니다.',
  },
  {
    id: 'training-guide',
    title: '연수자료와 활용 가이드',
    category: 'ai-cases',
    status: 'coming',
    description: '연수자료와 활용 가이드입니다. 준비 중입니다.',
  },
];

export const getToolsByCategory = (categoryId) =>
  tools.filter((t) => t.category === categoryId);

export const getReadyTools = () => tools.filter((t) => t.status === 'ready');
