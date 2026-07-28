import Face from './Face';

// 브로콜리 캐릭터 — 계약·발주·검수·품의
export default function Broccoli({ className = '', size = 140 }) {
  return (
    <svg
      className={`veggie-char ${className}`}
      width={size}
      height={size}
      viewBox="0 0 160 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="80" cy="188" rx="40" ry="8" fill="#3a2b22" opacity="0.08" />

      {/* 줄기 */}
      <path
        d="M62 150 C58 168 60 182 68 188 L92 188 C100 182 102 168 98 150 Z"
        fill="#d9c98a"
      />

      {/* 브로콜리 뭉치 */}
      <g fill="url(#broccoli-grad)">
        <circle cx="55" cy="82" r="26" />
        <circle cx="105" cy="82" r="26" />
        <circle cx="80" cy="58" r="30" />
        <circle cx="50" cy="110" r="22" />
        <circle cx="110" cy="110" r="22" />
        <circle cx="80" cy="120" r="30" />
      </g>
      <g fill="#3f7a4a" opacity="0.35">
        <circle cx="48" cy="76" r="5" />
        <circle cx="66" cy="60" r="5" />
        <circle cx="96" cy="66" r="5" />
        <circle cx="112" cy="88" r="5" />
        <circle cx="60" cy="104" r="5" />
        <circle cx="100" cy="112" r="5" />
      </g>

      {/* 팔 */}
      <path d="M46 118 Q26 122 22 106" stroke="#3f7a4a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M114 118 Q136 120 142 102" stroke="#3f7a4a" strokeWidth="6" fill="none" strokeLinecap="round" />

      <Face cx={80} cy={100} eyeGap={15} mouthY={13} />

      <defs>
        <radialGradient id="broccoli-grad" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#9fce7f" />
          <stop offset="0.55" stopColor="#5a9c5c" />
          <stop offset="1" stopColor="#3f7a4a" />
        </radialGradient>
      </defs>
    </svg>
  );
}
