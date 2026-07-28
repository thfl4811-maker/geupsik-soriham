import Face from './Face';

// 양파 캐릭터 — 업무관리·디지털 운영 / 김소리 영양교사 소개
export default function Onion({ className = '', size = 140 }) {
  return (
    <svg
      className={`veggie-char ${className}`}
      width={size}
      height={size}
      viewBox="0 0 160 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="80" cy="188" rx="40" ry="8" fill="#3a2b22" opacity="0.08" />

      {/* 뿌리 */}
      <path d="M64 178 Q60 186 56 190" stroke="#d9c8a0" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M80 180 Q80 188 80 192" stroke="#d9c8a0" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M96 178 Q100 186 104 190" stroke="#d9c8a0" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 새싹 */}
      <path d="M80 46 Q76 30 82 16" stroke="#7a9a4e" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M80 46 Q86 34 80 22" stroke="#9cc175" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* 몸통 */}
      <path
        d="M80 48
           C114 48 130 78 128 108
           C126 140 108 172 80 178
           C52 172 34 140 32 108
           C30 78 46 48 80 48 Z"
        fill="url(#onion-grad)"
      />
      <path d="M46 84 Q80 72 114 84" stroke="#a5763a" strokeWidth="2" opacity="0.3" fill="none" strokeLinecap="round" />
      <path d="M42 108 Q80 96 118 108" stroke="#a5763a" strokeWidth="2" opacity="0.3" fill="none" strokeLinecap="round" />
      <path d="M44 132 Q80 122 116 132" stroke="#a5763a" strokeWidth="2" opacity="0.3" fill="none" strokeLinecap="round" />

      {/* 팔 */}
      <path d="M40 122 Q20 118 16 102" stroke="#c9954f" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M120 122 Q142 118 146 102" stroke="#c9954f" strokeWidth="6" fill="none" strokeLinecap="round" />

      <Face cx={80} cy={112} eyeGap={16} mouthY={14} />

      <defs>
        <linearGradient id="onion-grad" x1="32" y1="48" x2="128" y2="178" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f3dba0" />
          <stop offset="0.55" stopColor="#d9a95a" />
          <stop offset="1" stopColor="#b8894a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
