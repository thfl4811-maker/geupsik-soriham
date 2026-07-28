import Face from './Face';

// 옥수수 캐릭터 — AI 활용 학교급식 운영사례
export default function Corn({ className = '', size = 140 }) {
  const kernels = [];
  const rows = 7;
  const cols = 4;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const offset = r % 2 === 0 ? 0 : 6;
      kernels.push(
        <ellipse
          key={`${r}-${c}`}
          cx={54 + c * 12 + offset}
          cy={62 + r * 15}
          rx="5"
          ry="6.5"
          fill="#f4cf4a"
          stroke="#e0b52f"
          strokeWidth="0.6"
        />
      );
    }
  }

  return (
    <svg
      className={`veggie-char ${className}`}
      width={size}
      height={size}
      viewBox="0 0 160 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="80" cy="188" rx="40" ry="8" fill="#3a2b22" opacity="0.08" />

      {/* 겉껍질 (뒤) */}
      <path d="M100 50 C130 60 138 110 128 160 C122 178 108 184 96 178 C112 150 116 96 100 50 Z" fill="#7fae5f" />
      <path d="M60 50 C30 60 22 110 32 160 C38 178 52 184 64 178 C48 150 44 96 60 50 Z" fill="#8fc06c" />

      {/* 몸통 (알갱이 영역) */}
      <rect x="46" y="52" width="68" height="132" rx="34" fill="url(#corn-grad)" />
      <g>{kernels}</g>

      {/* 수염 */}
      <path d="M74 46 Q70 30 60 22" stroke="#e8d888" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M86 46 Q90 30 100 22" stroke="#e8d888" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* 팔 */}
      <path d="M44 128 Q24 124 20 108" stroke="#d9a72a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M116 128 Q136 124 140 108" stroke="#d9a72a" strokeWidth="6" fill="none" strokeLinecap="round" />

      <Face cx={80} cy={150} eyeGap={14} mouthY={12} />

      <defs>
        <linearGradient id="corn-grad" x1="46" y1="52" x2="114" y2="184" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fbe38a" />
          <stop offset="1" stopColor="#f0c93f" />
        </linearGradient>
      </defs>
    </svg>
  );
}
