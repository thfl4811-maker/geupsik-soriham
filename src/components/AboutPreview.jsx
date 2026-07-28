import { Link } from 'react-router-dom';
import { aboutInfo } from '../data/site';
import { VeggieCharacter } from './characters';
import './AboutPreview.css';

export default function AboutPreview() {
  return (
    <section className="about-preview container" aria-labelledby="about-preview-heading">
      <div className="about-preview__card">
        <div className="about-preview__char">
          <VeggieCharacter name={aboutInfo.character} size={140} />
        </div>

        <div className="about-preview__content">
          <h2 id="about-preview-heading">
            <span aria-hidden="true">💚</span> {aboutInfo.name} 소개
          </h2>
          <p className="about-preview__intro">{aboutInfo.intro}</p>
          <ul className="about-preview__career">
            {aboutInfo.career.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link to="/about" className="about-preview__link">
            김소리 영양교사 자세히 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
