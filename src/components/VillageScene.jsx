// 급식 "소리"함 마을 배경 일러스트 (SVG)
// 실제 일러스트로 교체하려면 이 파일의 <svg> 내용을 이미지 <img>로 바꾸면 됩니다.

const TREES = [
  { x: 60, y: 120, s: 1 },
  { x: 150, y: 60, s: 0.8 },
  { x: 400, y: 60, s: 0.9 },
  { x: 800, y: 60, s: 0.85 },
  { x: 1010, y: 55, s: 0.95 },
  { x: 1140, y: 130, s: 1.05 },
  { x: 40, y: 400, s: 0.9 },
  { x: 400, y: 640, s: 0.85 },
  { x: 780, y: 660, s: 0.9 },
  { x: 1150, y: 620, s: 1 },
  { x: 990, y: 720, s: 0.8 },
  { x: 30, y: 700, s: 0.75 },
];

const HOUSES = [
  { x: 130, y: 300, s: 0.9 },
  { x: 560, y: 260, s: 0.8 },
  { x: 940, y: 300, s: 0.95 },
  { x: 950, y: 560, s: 0.85 },
  { x: 150, y: 600, s: 0.8 },
];

function Tree({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity="0.9">
      <rect x="-4" y="18" width="8" height="18" rx="3" fill="#a5763a" />
      <circle cx="-10" cy="6" r="14" fill="#7fae5f" />
      <circle cx="10" cy="4" r="15" fill="#8fc06c" />
      <circle cx="0" cy="-8" r="16" fill="#9ccb78" />
    </g>
  );
}

function House({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity="0.95">
      <rect x="-24" y="0" width="48" height="34" rx="4" fill="#fbf3e2" stroke="#e6d9bd" strokeWidth="2" />
      <path d="M-30 2 L0 -26 L30 2 Z" fill="#d9765a" />
      <rect x="-8" y="14" width="16" height="20" rx="2" fill="#c9954f" />
      <rect x="-18" y="8" width="10" height="10" rx="1.5" fill="#bcd9e8" stroke="#e6d9bd" strokeWidth="1.5" />
      <rect x="8" y="8" width="10" height="10" rx="1.5" fill="#bcd9e8" stroke="#e6d9bd" strokeWidth="1.5" />
    </g>
  );
}

export default function VillageScene() {
  return (
    <svg
      className="village-scene"
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="village-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef4e0" />
          <stop offset="1" stopColor="#dcead0" />
        </linearGradient>
        <radialGradient id="village-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="1200" height="760" fill="url(#village-sky)" />

      {/* 해 */}
      <circle cx="1080" cy="70" r="90" fill="url(#village-sun)" />
      <circle cx="1080" cy="70" r="30" fill="#ffe9a3" opacity="0.9" />

      {/* 구름 */}
      <g opacity="0.85" fill="#ffffff">
        <ellipse cx="120" cy="45" rx="34" ry="16" />
        <ellipse cx="150" cy="38" rx="24" ry="13" />
        <ellipse cx="95" cy="38" rx="20" ry="11" />
      </g>
      <g opacity="0.7" fill="#ffffff">
        <ellipse cx="650" cy="35" rx="28" ry="12" />
        <ellipse cx="675" cy="30" rx="20" ry="10" />
      </g>

      {/* 연못 */}
      <ellipse cx="95" cy="560" rx="90" ry="46" fill="#bcd9e8" opacity="0.8" />
      <ellipse cx="95" cy="552" rx="60" ry="26" fill="#d8ecf3" opacity="0.7" />
      <path d="M30 590 q10 -14 20 0" stroke="#7fae5f" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M150 596 q10 -14 20 0" stroke="#7fae5f" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* 울타리 */}
      <g stroke="#c9954f" strokeWidth="4" strokeLinecap="round" opacity="0.85">
        <path d="M1080 700 v-34 M1104 700 v-34 M1128 700 v-34 M1152 700 v-34" />
        <path d="M1074 672 h84 M1074 686 h84" />
      </g>

      {/* 표지판 */}
      <g transform="translate(1030 640)" opacity="0.9">
        <rect x="-3" y="0" width="6" height="46" rx="2" fill="#a5763a" />
        <rect x="-30" y="-14" width="60" height="20" rx="4" fill="#f3e3c7" stroke="#c9954f" strokeWidth="2" />
      </g>

      {/* 굽은 길 */}
      <path
        d="M60 210 C 260 300, 300 130, 560 205 S 880 300, 1000 210"
        stroke="#e3d3a8"
        strokeWidth="34"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 210 C 260 300, 300 130, 560 205 S 880 300, 1000 210"
        stroke="#f3e6c4"
        strokeWidth="6"
        strokeDasharray="2 26"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 545 C 260 460, 300 610, 560 550 S 880 460, 1000 545"
        stroke="#e3d3a8"
        strokeWidth="34"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 545 C 260 460, 300 610, 560 550 S 880 460, 1000 545"
        stroke="#f3e6c4"
        strokeWidth="6"
        strokeDasharray="2 26"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M530 205 C 530 300, 530 450, 530 550"
        stroke="#e3d3a8"
        strokeWidth="30"
        fill="none"
        strokeLinecap="round"
      />

      {/* 언덕 */}
      <path d="M0 700 Q 200 640 400 700 T 800 700 T 1200 700 V760 H0 Z" fill="#cfe3b8" opacity="0.8" />
      <path d="M0 730 Q 300 690 600 730 T 1200 730 V760 H0 Z" fill="#bcd89f" opacity="0.8" />

      {HOUSES.map((h) => (
        <House key={`${h.x}-${h.y}`} {...h} />
      ))}
      {TREES.map((t) => (
        <Tree key={`${t.x}-${t.y}`} {...t} />
      ))}
    </svg>
  );
}
