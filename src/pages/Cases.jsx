import { getCategoryById } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import { VeggieCharacter } from '../components/characters';
import ToolCard from '../components/ToolCard';
import PageHero from '../components/PageHero';
import './Cases.css';

export default function Cases() {
  const category = getCategoryById('ai-cases');
  const caseTools = getToolsByCategory('ai-cases');

  return (
    <>
      <PageHero
        eyebrow="운영사례"
        title="AI 활용 학교급식 운영사례"
        description="김소리 영양교사가 현장에서 직접 시도한 AI 활용 업무효율화 사례와 연수자료를 모았습니다."
      />

      <div className="container cases-page">
        <div className="cases-page__banner">
          <VeggieCharacter name={category.character} size={120} />
          <p>
            학교급식 업무에 AI를 어떻게 접목했는지, 실제 학교 현장에서는 어떻게 활용되고 있는지
            사례 중심으로 소개할 예정입니다.
          </p>
        </div>

        <div className="cases-page__grid">
          {caseTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </>
  );
}
