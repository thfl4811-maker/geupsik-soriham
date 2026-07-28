// 카테고리(마을 구역) 데이터
// 새 카테고리를 추가하려면 이 배열에 항목을 추가하고,
// character 값에 맞는 캐릭터 컴포넌트를 src/components/characters 에 준비하세요.
export const categories = [
  {
    id: 'meal-planning',
    name: '식단 기획·급식 운영',
    short: '식단 기획',
    character: 'sweetpotato',
    color: '#c98a5e',
    bg: '#f5e3d2',
    description: '식단 작성, 게시 자료, 선호도 조사 등 식단과 급식 운영 전반을 돕는 도구입니다.',
  },
  {
    id: 'contract',
    name: '계약·발주·검수·품의',
    short: '계약·발주',
    character: 'broccoli',
    color: '#4c8c5a',
    bg: '#e2ecdd',
    description: '발주량 계산, 품의서 작성 등 계약과 검수 업무를 돕는 도구입니다.',
  },
  {
    id: 'safety',
    name: '급식위생·식품안전교육',
    short: '위생·안전',
    character: 'eggplant',
    color: '#6a4c93',
    bg: '#e8e1ef',
    description: 'HACCP과 식품안전교육 등 급식 위생 관리를 위한 자료입니다.',
  },
  {
    id: 'education',
    name: '교육·수업 활용',
    short: '교육·수업',
    character: 'carrot',
    color: '#e07a3f',
    bg: '#faeadb',
    description: '영양·식생활교육 수업과 학생 참여형 자료를 위한 도구입니다.',
  },
  {
    id: 'management',
    name: '업무관리·디지털 운영',
    short: '업무관리',
    character: 'onion',
    color: '#b8894a',
    bg: '#f3ead9',
    description: '노션 운영, 업무자료 아카이브 등 디지털 업무관리 도구입니다.',
  },
  {
    id: 'ai-cases',
    name: 'AI 활용 학교급식 운영사례',
    short: 'AI 운영사례',
    character: 'corn',
    color: '#d8a72a',
    bg: '#faf3d6',
    description: 'AI를 활용한 학교급식 업무 효율화 사례와 연수자료입니다.',
  },
];

export const getCategoryById = (id) => categories.find((c) => c.id === id);
