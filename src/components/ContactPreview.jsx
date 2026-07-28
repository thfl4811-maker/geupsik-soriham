import { Link } from 'react-router-dom';
import './ContactPreview.css';

export default function ContactPreview() {
  return (
    <section className="contact-preview container" aria-labelledby="contact-preview-heading">
      <div className="contact-preview__card">
        <div className="contact-preview__text">
          <h2 id="contact-preview-heading">
            <span aria-hidden="true">💌</span> 업무지원 문의
          </h2>
          <p>업무에 도움이 필요하신가요? 문의하시면 최대한 빠르게 답변드릴게요!</p>
        </div>

        <ol className="contact-preview__steps">
          <li>
            <span aria-hidden="true">📮</span> 문의 접수
            <small>문의 내용을 보내주세요</small>
          </li>
          <li>
            <span aria-hidden="true">💬</span> 확인 및 답변
            <small>확인 후 순차적으로 답변</small>
          </li>
          <li>
            <span aria-hidden="true">🌾</span> 함께 성장해요
            <small>더 나은 급식 업무를 만들어가요</small>
          </li>
        </ol>

        <Link to="/contact" className="contact-preview__btn">
          문의하기 →
        </Link>
      </div>
    </section>
  );
}
