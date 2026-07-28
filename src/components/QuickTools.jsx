import { Link } from 'react-router-dom';
import { getReadyTools } from '../data/tools';
import ToolCard from './ToolCard';
import './QuickTools.css';

export default function QuickTools() {
  const featured = getReadyTools().slice(0, 6);

  return (
    <section className="quick-tools container" aria-labelledby="quick-tools-heading">
      <h2 id="quick-tools-heading" className="quick-tools__heading">
        <span aria-hidden="true">🌱</span> 자주 쓰는 도구 바로가기
      </h2>

      <div className="quick-tools__grid">
        {featured.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      <div className="quick-tools__more">
        <Link to="/tools" className="quick-tools__more-link">
          도구 모음 더보기 →
        </Link>
      </div>
    </section>
  );
}
