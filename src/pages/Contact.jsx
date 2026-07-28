import { soriInquiries, officialSupport } from '../data/site';
import PageHero from '../components/PageHero';
import './Contact.css';

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="문의·지원"
        title="문의 및 업무지원 안내"
        description="급식 '소리'함 관련 문의와 공식 업무지원 창구를 구분해 안내해 드려요."
      />

      <div className="container contact-page">
        <section className="contact-block" aria-labelledby="contact-sori">
          <h2 id="contact-sori">
            <span aria-hidden="true">🧅</span> 급식 "소리"함 문의
          </h2>
          <ul className="contact-block__list">
            {soriInquiries.map((item) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ul>
          <p className="contact-block__note">이메일 문의처는 준비 중입니다.</p>
        </section>

        <section className="contact-block" aria-labelledby="contact-official">
          <h2 id="contact-official">
            <span aria-hidden="true">🏫</span> 공식 업무지원
          </h2>
          <p className="contact-block__desc">
            아래 기관은 급식 "소리"함과 무관한 공식 기관입니다. 실제 링크와 전화번호는 확인 후 연결될
            예정입니다.
          </p>
          <ul className="contact-block__list">
            {officialSupport.map((item) => (
              <li key={item.id}>
                {item.label}
                <span className="contact-block__badge">확인 후 연결 예정</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
