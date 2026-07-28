import { usagePolicy } from '../data/site';
import PageHero from '../components/PageHero';
import './Guide.css';

export default function Guide() {
  return (
    <>
      <PageHero eyebrow="이용 안내" title="이용 안내 및 저작권" />

      <div className="container guide-page">
        <div className="guide-page__card">
          {usagePolicy.body.map((paragraph) => (
            <p key={paragraph.slice(0, 12)}>{paragraph}</p>
          ))}
          <p className="guide-page__credit">출처 표기: {usagePolicy.credit}</p>
        </div>
      </div>
    </>
  );
}
