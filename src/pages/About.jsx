import { aboutInfo } from '../data/site';
import { VeggieCharacter } from '../components/characters';
import PageHero from '../components/PageHero';
import './About.css';

export default function About() {
  return (
    <>
      <PageHero eyebrow="김소리 소개" title={`${aboutInfo.name} 이야기`} />

      <div className="container about-page">
        <div className="about-page__card">
          <div className="about-page__char">
            <VeggieCharacter name={aboutInfo.character} size={200} />
            <p className="about-page__char-caption">양파 영양교사 캐릭터</p>
          </div>

          <div className="about-page__content">
            <p className="about-page__intro">{aboutInfo.intro}</p>

            <h2>주요 경력</h2>
            <ul className="about-page__career">
              {aboutInfo.career.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
