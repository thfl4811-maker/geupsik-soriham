import { useEffect, useRef } from 'react';
import { usagePolicy } from '../data/site';
import './UsageModal.css';

export default function UsageModal({ open, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="usage-modal__backdrop" onClick={onClose}>
      <div
        className="usage-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="usage-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="usage-modal__header">
          <h2 id="usage-modal-title">이용 안내 및 저작권</h2>
          <button ref={closeBtnRef} type="button" className="usage-modal__close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="usage-modal__body">
          {usagePolicy.body.map((paragraph) => (
            <p key={paragraph.slice(0, 12)}>{paragraph}</p>
          ))}
          <p className="usage-modal__credit">출처 표기: {usagePolicy.credit}</p>
        </div>
      </div>
    </div>
  );
}
