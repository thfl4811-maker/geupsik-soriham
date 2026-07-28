# 급식 "소리"함

김소리 영양교사가 만든 학교급식 업무지원 개인 포털 사이트입니다. 학교급식 업무를 돕는 외부 웹앱과 운영자료를 한 곳에서 모아 연결합니다.

무료로 운영되는 개인 사이트이며, 공식 행정기관 또는 교육청 사이트가 아닙니다.

## 기술 스택

- [Vite](https://vite.dev/) + [React 19](https://react.dev/)
- [react-router-dom](https://reactrouter.com/) (페이지 라우팅)
- 순수 CSS + SVG (수채화/색연필 느낌의 채소 캐릭터·마을 배경, 별도 이미지 라이브러리 없음)

## 로컬 개발

```bash
npm install
npm run dev
```

`http://localhost:5173` 에서 확인할 수 있습니다.

## 빌드

```bash
npm run build
```

결과물은 `dist/` 폴더에 생성됩니다. `npm run preview` 로 빌드 결과를 로컬에서 확인할 수 있습니다.

## 새 도구(웹앱) 추가하는 방법

도구 목록은 `src/data/tools.js` 한 파일에서만 관리합니다. 새 웹앱이 완성되면:

1. `src/data/tools.js` 에서 해당 도구 항목을 찾습니다. (아직 없다면 배열에 새 항목을 추가)
2. `status` 를 다음 중 하나로 수정합니다.
   - `'ready'` — 바로 사용 가능한 웹앱 (새 창에서 열림)
   - `'download'` — 다운로드용 자료
   - `'coming'` — 준비 중 (버튼 비활성화, 기본값)
3. `status` 가 `ready` 또는 `download` 라면 `url` 에 실제 주소를 입력합니다.
4. 저장 후 커밋·배포하면 자동으로 사이트에 반영됩니다. 컴포넌트나 페이지 코드를 수정할 필요가 없습니다.

```js
{
  id: 'haccp-education',
  title: 'HACCP 교육',
  category: 'safety',
  status: 'ready', // 'coming' → 'ready' 로 변경
  url: 'https://example.com/haccp-education', // 실제 주소 입력
  description: 'HACCP 교육 자료입니다.',
},
```

새 카테고리(마을 구역)를 추가하려면 `src/data/categories.js` 에 항목을 추가하고, `character` 값에 해당하는 캐릭터 컴포넌트를 `src/components/characters/` 에 만든 뒤 `src/components/characters/index.jsx` 의 `characterMap` 에 등록하세요.

## 디자인 자산 교체

현재 채소 캐릭터와 마을 배경은 실제 일러스트가 준비되기 전까지 SVG/CSS로 임시 제작되어 있습니다.

- 캐릭터: `src/components/characters/*.jsx`
- 마을 배경: `src/components/VillageScene.jsx`
- 식판 일러스트: `src/components/MealTray.jsx`

실제 일러스트(이미지 파일)로 교체하려면 각 컴포넌트의 `<svg>` 반환부를 `<img src="..." />` 로 바꾸면 됩니다. 나머지 레이아웃·클릭 동작은 그대로 유지됩니다.

## Vercel 배포 방법

1. [Vercel](https://vercel.com) 에 가입 후 GitHub 계정을 연동합니다.
2. **Add New → Project** 에서 이 저장소(`geupsik-soriham`)를 선택합니다.
3. Framework Preset은 **Vite** 로 자동 인식됩니다. 아래 값을 확인합니다.
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy** 를 누르면 몇 분 내로 `https://프로젝트명.vercel.app` 주소가 발급됩니다.
5. 이후 `main` 브랜치에 push 할 때마다 자동으로 재배포됩니다.

## 폴더 구조

```
src/
  components/        공통 UI 컴포넌트 (Header, Footer, ToolCard, VillageMap 등)
  components/characters/  채소 캐릭터 SVG 컴포넌트
  data/               tools.js, categories.js, site.js — 콘텐츠 데이터
  pages/              라우트별 페이지 (Home, Tools, Resources, Cases, About, Contact, Guide)
```

## 이용 안내 및 저작권

급식 "소리"함은 무료로 운영되는 김소리 영양교사의 개인 사이트이며, 공식 행정기관 또는 교육청이 운영하는 사이트가 아닙니다.

본 사이트의 웹앱과 자료는 선생님들의 개인적인 학교급식 업무 지원과 교육 활동을 위해 활용할 수 있습니다. 개인 연수·강의·컨설팅 등 수익을 목적으로 하는 이용, 공모전·연구대회 등에 본인의 창작물처럼 제출하는 행위, 무단 복제·수정·재배포 및 유료 서비스 활용은 허용하지 않습니다.

출처 표기: 급식 "소리"함 · 김소리 영양교사

© 2025 김소리 영양교사 · 급식 "소리"함
