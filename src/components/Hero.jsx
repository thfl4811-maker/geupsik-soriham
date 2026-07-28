import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealTray from './MealTray';
import { VeggieCharacter } from './characters';
import './Hero.css';

export default function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    navigate(`/tools${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section className="hero" aria-label="급식 소리함 소개">
      <div className="hero__veggies" aria-hidden="true">
        <span className="hero__veggie hero__veggie--1">
          <VeggieCharacter name="broccoli" size={92} />
        </span>
        <span className="hero__veggie hero__veggie--2">
          <VeggieCharacter name="carrot" size={70} />
        </span>
        <span className="hero__veggie hero__veggie--3">
          <VeggieCharacter name="corn" size={96} />
        </span>
        <span className="hero__veggie hero__veggie--4">
          <VeggieCharacter name="eggplant" size={86} />
        </span>
        <span className="hero__veggie hero__veggie--5">
          <VeggieCharacter name="onion" size={66} />
        </span>
        <span className="hero__veggie hero__veggie--6">
          <VeggieCharacter name="sweetpotato" size={78} />
        </span>
        <span className="hero__veggie hero__veggie--7">
          <VeggieCharacter name="broccoli" size={54} />
        </span>
        <span className="hero__veggie hero__veggie--8">
          <VeggieCharacter name="onion" size={50} />
        </span>
        <span className="hero__sparkle hero__sparkle--1" aria-hidden="true">✨</span>
        <span className="hero__sparkle hero__sparkle--2" aria-hidden="true">🌸</span>
        <span className="hero__sparkle hero__sparkle--3" aria-hidden="true">💚</span>
      </div>

      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">학교급식 업무를 위한 작은 도구 마을</p>
          <h1 className="hero__title">
            급식 <span className="accent">"소리"</span>함
          </h1>
          <p className="hero__tagline">
            학교급식 업무를 더 쉽고, 빠르고, 즐겁게
            <br />
            김소리 영양교사가 직접 만든 AI 업무도구와 운영자료를 담았습니다.
          </p>

          <form className="hero__search" onSubmit={onSubmit} role="search">
            <label className="visually-hidden" htmlFor="hero-search-input">
              도구 검색
            </label>
            <input
              id="hero-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="식단, 품의서, 발주, 선호도, HACCP 자료를 검색해 보세요"
            />
            <button type="submit">검색</button>
          </form>

          <p className="hero__disclaimer">
            <span aria-hidden="true">📣</span> 무료 사이트이며, 공식 행정기관 또는 교육청 사이트가 아닙니다.
            선생님들의 개인 업무지원을 위해 얼마든지 활용 가능하지만, 개인 연수나 공모전 등 이익창출을 위한
            자료 및 저작권은 허용하지 않습니다.
          </p>
        </div>

        <div className="hero__tray" aria-hidden="true">
          <MealTray size={280} />
        </div>
      </div>

      <svg className="hero__wave" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 Q 300 0 600 40 T 1200 40 V80 H0 Z" fill="#eef4e0" />
      </svg>
    </section>
  );
}
