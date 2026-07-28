import { Link } from 'react-router-dom';
import { usagePolicy } from '../data/site';
import './Footer.css';

export default function Footer({ onOpenUsage }) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__title">
            🧅 급식 <span className="accent">"소리"</span>함
          </p>
          <p className="site-footer__summary">{usagePolicy.summary}</p>
          <button type="button" className="site-footer__link-btn" onClick={onOpenUsage}>
            이용 안내 및 저작권 전체보기
          </button>
        </div>

        <nav className="site-footer__cols">
          <div>
            <p className="site-footer__col-title">바로가기</p>
            <Link to="/tools">업무도구</Link>
            <Link to="/resources">운영자료</Link>
            <Link to="/cases">운영사례</Link>
          </div>
          <div>
            <p className="site-footer__col-title">운영 안내</p>
            <Link to="/guide">이용 안내</Link>
            <button type="button" className="site-footer__link-btn" onClick={onOpenUsage}>
              저작권 안내
            </button>
            <Link to="/contact">문의·지원</Link>
          </div>
          <div>
            <p className="site-footer__col-title">김소리 영양교사</p>
            <Link to="/about">소개 보기</Link>
            <span className="site-footer__muted">선생님들의 의견을 기다립니다</span>
          </div>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <p>© 2025 김소리 영양교사 · 급식 "소리"함</p>
        <p>개인 업무 활용 가능 · 상업적 이용 및 무단 재배포 금지</p>
      </div>
    </footer>
  );
}
