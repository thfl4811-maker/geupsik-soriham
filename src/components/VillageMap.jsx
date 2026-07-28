import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { VeggieCharacter } from './characters';
import VillageScene from './VillageScene';
import './VillageMap.css';

export default function VillageMap() {
  return (
    <section className="village" aria-labelledby="village-heading">
      <h2 id="village-heading" className="village__heading">
        <span aria-hidden="true">🌿</span> 업무를 한눈에! 급식 "소리"함 마을
      </h2>
      <p className="village__hint">가고 싶은 마을 구역을 눌러 관련 도구를 바로 찾아보세요.</p>

      <div className="village__map">
        <VillageScene />

        <ol className="village__grid">
          {categories.map((cat, idx) => (
            <li key={cat.id} className="village__item">
              <Link
                to={`/tools?category=${cat.id}`}
                className="village-zone"
                style={{ '--zone-bg': cat.bg, '--zone-color': cat.color }}
              >
                <span className="village-zone__badge">{idx + 1}</span>
                <span className="village-zone__char">
                  <VeggieCharacter name={cat.character} size={104} />
                </span>
                <span className="village-zone__name">{cat.name}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
