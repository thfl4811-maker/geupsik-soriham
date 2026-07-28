import { categories } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import { VeggieCharacter } from '../components/characters';
import ToolCard from '../components/ToolCard';
import PageHero from '../components/PageHero';
import './Resources.css';

export default function Resources() {
  return (
    <>
      <PageHero
        eyebrow="운영자료"
        title="마을 구역별 운영자료 모음"
        description="카테고리별로 정리된 업무도구와 운영자료를 한눈에 살펴보세요."
      />

      <div className="container resources-page">
        {categories.map((cat) => {
          const catTools = getToolsByCategory(cat.id);
          return (
            <section key={cat.id} className="resources-section" aria-labelledby={`res-${cat.id}`}>
              <header className="resources-section__header" style={{ '--section-bg': cat.bg }}>
                <div className="resources-section__char">
                  <VeggieCharacter name={cat.character} size={72} />
                </div>
                <div>
                  <h2 id={`res-${cat.id}`}>{cat.name}</h2>
                  <p>{cat.description}</p>
                </div>
              </header>

              <div className="resources-section__grid">
                {catTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
