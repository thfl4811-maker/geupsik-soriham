import Face from './Face';

// 당근 캐릭터 — 교육·수업 활용
export default function Carrot({ className = '', size = 140 }) {
  return (
    <svg
      className={`veggie-char ${className}`}
      width={size}
      height={size}
      viewBox="0 0 160 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="80" cy="188" rx="36" ry="8" fill="#3a2b22" opacity="0.08" />

      {/* 잎 */}
      <path d="M80 46 C74 24 60 14 44 16 C56 26 60 38 66 50 Z" fill="#6fa564" />
      <path d="M80 46 C80 22 90 10 106 10 C96 22 94 36 90 50 Z" fill="#84b873" />
      <path d="M80 46 C86 26 100 18 114 22 C102 30 96 40 92 52 Z" fill="#6fa564" />

      {/* 몸통 */}
      <path
        d="M80 52
           C110 54 126 78 120 108
           C115 134 100 168 80 182
           C60 168 45 134 40 108
           C34 78 50 54 80 52 Z"
        fill="url(#carrot-grad)"
      />
      <path d="M66 80 Q80 84 94 80" stroke="#c76a2a" strokeWidth="2.5" opacity="0.4" fill="none" strokeLinecap="round" />
      <path d="M62 104 Q80 109 98 104" stroke="#c76a2a" strokeWidth="2.5" opacity="0.4" fill="none" strokeLinecap="round" />

      {/* 팔 */}
      <path d="M46 112 Q26 108 22 92" stroke="#d97b32" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M114 112 Q136 108 140 92" stroke="#d97b32" strokeWidth="6" fill="none" strokeLinecap="round" />

      <Face cx={80} cy={104} eyeGap={14} mouthY={13} />

      <defs>
        <linearGradient id="carrot-grad" x1="40" y1="52" x2="120" y2="182" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f3a95a" />
          <stop offset="0.55" stopColor="#e07a3f" />
          <stop offset="1" stopColor="#c15f28" />
        </linearGradient>
      </defs>
    </svg>
  );
}
