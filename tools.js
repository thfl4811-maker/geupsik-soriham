export const categories = [
  {
    id: 'meal',
    name: '식단·영양',
    icon: '🥗',
    color: 'green',
    tools: [
      { id: 'meal-poster', name: '식단 게시자료 프롬프트 생성기', desc: 'AI 프롬프트로 게시자료 자동 작성', url: 'https://thfl4811-maker.github.io/meal-poster-prompt-builder/', available: true },
      { id: 'meal-viewer', name: '알레르기·월간식단 뷰어', desc: '월간 식단 사이니지·인쇄 출력', url: 'https://smart-meal-signage.vercel.app/', available: true },
      { id: 'meal-gems', name: '젬스(GEMS) 식단 활용', desc: 'GEMS 연동 식단 분석·활용 도구', url: null, available: false },
      { id: 'meal-recommend', name: '추천 식단', desc: '균형 잡힌 학교급식 식단 추천', url: null, available: false },
      { id: 'meal-archive', name: '나의 식단 아카이브', desc: '과거 식단 검색·조회·관리', url: 'https://smart-meal-archive.vercel.app/', available: true },
      { id: 'meal-menu', name: '자율선택급식 메뉴 탐색기', desc: '메뉴별 알레르기·영양소 탐색', url: 'https://thfl4811-maker.github.io/choice-meal-menu-finder/', available: true },
    ]
  },
  {
    id: 'order',
    name: '발주·재고',
    icon: '📦',
    color: 'amber',
    tools: [
      { id: 'rice-order', name: '만년형 쌀 발주 계산기', desc: '주간 쌀 소요량 계산·발주표 작성', url: 'https://rice-order-planner.vercel.app/', available: true },      
      { id: 'portion', name: '1인 분량 환산', desc: '식재료별 1인 분량 기준 환산', url: null, available: false },
      { id: 'serving-calc', name: '식수별 발주량 계산', desc: '식수 인원별 식재료 발주량 산출', url: null, available: false },
      { id: 'inventory', name: '재고조사표', desc: '식재료 재고 현황 조사·기록', url: null, available: false },
    ]
  },
  {
    id: 'inspect',
    name: '검수·엑셀',
    icon: '📊',
    color: 'blue',
    tools: [
      { id: 'market-convert', name: '시장조사 자료 변환', desc: '시장조사 결과 자동 정리·변환', url: null, available: false },
      { id: 'price-match', name: '계약단가·검수단가 자동 매칭', desc: '단가 비교·불일치 자동 감지', url: null, available: false },
      { id: 'neis-convert', name: '나이스 자료 표준 변환', desc: 'NEIS 데이터 표준 형식 자동 변환', url: null, available: false },
    ]
  },
  {
    id: 'document',
    name: '문서·소통',
    icon: '📄',
    color: 'coral',
    tools: [
      { id: 'notice', name: '안내장', desc: '학생·학부모 대상 급식 안내장 작성', url: null, available: false },
      { id: 'draft', name: '기안문', desc: '급식 관련 기안문 자동 작성', url: null, available: false },
      { id: 'requisition', name: '품의서 작성기', desc: '지출품의서 자동 완성', url: 'https://edu-finance-drafter-3.vercel.app/', available: true },
      { id: 'family-letter', name: '가정통신문', desc: '가정통신문 자동 생성 도구', url: null, available: false },
      { id: 'notice-all', name: '학생·교직원·조리종사원 공지', desc: '대상별 맞춤 공지 문구 생성', url: null, available: false },
      { id: 'survey', name: '선호도 조사', desc: '자율선택급식 학생 선호도 수집·분석', url: 'https://school-meal-survey-v2.vercel.app/', available: true },
    ]
  },
  {
    id: 'hygiene',
    name: '위생·조리',
    icon: '🛡️',
    color: 'purple',
    tools: [
      { id: 'haccp', name: 'HACCP 교육', desc: 'HACCP 기준·관리 포인트 교육 자료', url: null, available: false },
      { id: 'sanitation', name: '위생·안전교육', desc: '조리종사원 위생·안전 교육 도구', url: null, available: false },
      { id: 'recipe', name: '조리종사원용 레시피', desc: '표준 레시피 검색·조회·인쇄', url: null, available: false },
      { id: 'daily-check', name: '일일 점검자료', desc: '급식실 일일 위생 점검 체크리스트', url: null, available: false },
    ]
  },
  {
    id: 'ai',
    name: 'AI·수업',
    icon: '🤖',
    color: 'teal',
    tools: [
      { id: 'prompt-builder', name: '프롬프트 구성 앱', desc: '급식 업무용 AI 프롬프트 설계 도구', url: null, available: false },
      { id: 'webapp-class', name: '웹앱 활용 수업', desc: '영양 수업에서 활용한 웹앱 사례', url: null, available: false },
      { id: 'notion-case', name: '노션 운영사례', desc: '급식실 노션 운영 템플릿·사례', url: null, available: false },
      { id: 'ai-case', name: 'AI 활용 학교급식 운영사례', desc: 'AI 도구 적용 급식 운영 사례 모음', url: null, available: false },
    ]
  }
];
