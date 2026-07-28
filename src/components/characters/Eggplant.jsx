import Face from './Face';

// 가지 캐릭터 — 급식위생·식품안전교육
export default function Eggplant({ className = '', size = 140 }) {
  return (
    <svg
      className={`veggie-char ${className}`}
      width={size}
      height={size}
      viewBox="0 0 160 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="80" cy="188" rx="38" ry="8" fill="#3a2b22" opacity="0.08" />

      {/* 꼭지 잎 (별모양 캘릭스) */}
      <path
        d="M80 30 L88 46 L104 40 L94 54 L108 62 L90 62 L92 80 L80 66 L68 80 L70 62 L52 62 L66 54 L56 40 L72 46 Z"
        fill="#6fa564"
      />
      <path d="M80 58 Q78 66 80 72" stroke="#557a3f" strokeWidth="4" strokeLinecap="round" />

      {/* 몸통 */}
      <path
        d="M80 60
           C50 62 34 92 38 124
           C41 152 58 178 82 180
           C106 178 122 150 122 120
           C122 90 108 60 80 60 Z"
        fill="url(#eggplant-grad)"
      />
      <path d="M56 90 C52 110 54 132 64 150" stroke="#f3e3c7" strokeWidth="3" opacity="0.35" fill="none" strokeLinecap="round" />

      {/* 팔 */}
      <path d="M42 120 Q22 116 18 100" stroke="#5b3572" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M118 120 Q140 116 144 100" stroke="#5b3572" strokeWidth="6" fill="none" strokeLinecap="round" />

      <Face cx={80} cy={118} eyeGap={15} mouthY={14} />

      <defs>
        <linearGradient id="eggplant-grad" x1="40" y1="60" x2="120" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9a6fc2" />
          <stop offset="0.5" stopColor="#6a4c93" />
          <stop offset="1" stopColor="#4a3468" />
        </linearGradient>
      </defs>
    </svg>
  );
}
