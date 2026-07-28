// 채소 캐릭터 공용 표정 (눈, 볼, 입)
export default function Face({
  cx = 0,
  cy = 0,
  eyeGap = 16,
  eyeY = 0,
  mouthY = 12,
  scale = 1,
  blink = false,
}) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {/* 볼 홍조 */}
      <ellipse cx={-eyeGap - 6} cy={eyeY + 7} rx="7.5" ry="4.5" fill="#e59a8a" opacity="0.55" />
      <ellipse cx={eyeGap + 6} cy={eyeY + 7} rx="7.5" ry="4.5" fill="#e59a8a" opacity="0.55" />

      {/* 눈 */}
      {blink ? (
        <>
          <path d={`M ${-eyeGap - 5} ${eyeY} q 5 4 10 0`} stroke="#3a2b22" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d={`M ${eyeGap - 5} ${eyeY} q 5 4 10 0`} stroke="#3a2b22" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx={-eyeGap} cy={eyeY} r="4.2" fill="#3a2b22" />
          <circle cx={eyeGap} cy={eyeY} r="4.2" fill="#3a2b22" />
          <circle cx={-eyeGap + 1.4} cy={eyeY - 1.4} r="1.1" fill="#fff" />
          <circle cx={eyeGap + 1.4} cy={eyeY - 1.4} r="1.1" fill="#fff" />
        </>
      )}

      {/* 입 */}
      <path
        d={`M ${-9} ${mouthY} Q 0 ${mouthY + 7} 9 ${mouthY}`}
        stroke="#3a2b22"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}
