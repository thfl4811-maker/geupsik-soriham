// 학교급식 식판 일러스트 (히어로 중앙 상징 요소)
export default function MealTray({ className = '', size = 220 }) {
  return (
    <svg
      className={`meal-tray ${className}`}
      width={size}
      height={size * 0.72}
      viewBox="0 0 300 216"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="150" cy="205" rx="120" ry="10" fill="#3a2b22" opacity="0.08" />

      {/* 식판 본체 */}
      <rect x="10" y="10" width="280" height="180" rx="26" fill="#dfe7ea" stroke="#c3cfd4" strokeWidth="3" />
      <rect x="20" y="20" width="260" height="160" rx="20" fill="#eef3f4" />

      {/* 칸 구분 */}
      <rect x="34" y="34" width="112" height="66" rx="16" fill="#f7fafb" stroke="#c3cfd4" strokeWidth="2.5" />
      <rect x="154" y="34" width="112" height="66" rx="16" fill="#f7fafb" stroke="#c3cfd4" strokeWidth="2.5" />
      <rect x="34" y="112" width="70" height="66" rx="16" fill="#f7fafb" stroke="#c3cfd4" strokeWidth="2.5" />
      <rect x="114" y="112" width="70" height="66" rx="16" fill="#f7fafb" stroke="#c3cfd4" strokeWidth="2.5" />
      <rect x="194" y="112" width="72" height="66" rx="16" fill="#f7fafb" stroke="#c3cfd4" strokeWidth="2.5" />

      {/* 밥 */}
      <ellipse cx="90" cy="67" rx="42" ry="22" fill="#fdf8ee" />
      <circle cx="72" cy="60" r="3" fill="#f2e9d6" />
      <circle cx="92" cy="72" r="3" fill="#f2e9d6" />
      <circle cx="108" cy="58" r="3" fill="#f2e9d6" />

      {/* 국 */}
      <ellipse cx="210" cy="67" rx="42" ry="22" fill="#e8b98f" />
      <ellipse cx="210" cy="63" rx="30" ry="14" fill="#f0cca8" />
      <circle cx="196" cy="60" r="6" fill="#d68b57" />
      <circle cx="222" cy="68" r="5" fill="#d68b57" />

      {/* 반찬 1 - 김치 */}
      <ellipse cx="69" cy="145" rx="24" ry="18" fill="#e0604a" />
      <path d="M56 140 Q69 130 82 140" stroke="#b8402c" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 반찬 2 - 나물 */}
      <ellipse cx="149" cy="145" rx="24" ry="18" fill="#8fbf6f" />
      <path d="M136 145 Q149 136 162 145" stroke="#6a9950" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 반찬 3 - 계란말이 */}
      <ellipse cx="230" cy="145" rx="26" ry="18" fill="#f4d35e" />
      <path d="M212 145 h36 M212 139 h36 M212 151 h36" stroke="#e0b53a" strokeWidth="1.5" />

      {/* 수저 */}
      <g transform="translate(270 40) rotate(8)">
        <ellipse cx="0" cy="0" rx="7" ry="14" fill="#c3cfd4" />
        <rect x="-2.2" y="10" width="4.4" height="46" rx="2.2" fill="#c3cfd4" />
      </g>
      <g transform="translate(288 42) rotate(8)">
        <rect x="-2" y="0" width="4" height="18" fill="#c3cfd4" />
        <rect x="-6" y="0" width="3" height="14" fill="#c3cfd4" />
        <rect x="3" y="0" width="3" height="14" fill="#c3cfd4" />
        <rect x="-2" y="16" width="4" height="46" rx="2" fill="#c3cfd4" />
      </g>

      {/* 표정 */}
      <circle cx="130" cy="20" r="2.6" fill="#3a2b22" opacity="0.35" />
    </svg>
  );
}
