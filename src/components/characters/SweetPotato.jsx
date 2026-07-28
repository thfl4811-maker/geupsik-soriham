import Face from './Face';

// 고구마 캐릭터 — 식단 기획·급식 운영
export default function SweetPotato({ className = '', size = 140 }) {
  return (
    <svg
      className={`veggie-char ${className}`}
      width={size}
      height={size}
      viewBox="0 0 160 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="80" cy="188" rx="42" ry="8" fill="#3a2b22" opacity="0.08" />

      {/* 잎사귀 */}
      <path d="M70 46 C58 32 44 30 34 38 C46 42 52 50 58 58 Z" fill="#6fa564" />
      <path d="M78 40 C74 24 62 16 50 18 C58 28 60 38 64 48 Z" fill="#84b873" />

      {/* 줄기 */}
      <path d="M74 50 Q70 40 76 30" stroke="#7a9a4e" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* 몸통 */}
      <path
        d="M40 90
           C34 60 56 40 84 42
           C114 44 128 70 122 104
           C118 130 124 156 108 172
           C90 188 58 186 44 168
           C28 148 34 116 40 90 Z"
        fill="url(#sweetpotato-grad)"
      />
      <path
        d="M50 96 C48 78 62 62 82 62"
        stroke="#8a4a2c"
        strokeWidth="2"
        fill="none"
        opacity="0.25"
        strokeLinecap="round"
      />

      {/* 팔 */}
      <path d="M46 118 Q26 116 20 100" stroke="#a5623c" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M118 118 Q140 112 146 94" stroke="#a5623c" strokeWidth="6" fill="none" strokeLinecap="round" />

      <Face cx={82} cy={110} eyeGap={15} mouthY={14} />

      <defs>
        <linearGradient id="sweetpotato-grad" x1="30" y1="40" x2="130" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#caa0d6" />
          <stop offset="0.45" stopColor="#a5623c" />
          <stop offset="1" stopColor="#8a4a2c" />
        </linearGradient>
      </defs>
    </svg>
  );
}
