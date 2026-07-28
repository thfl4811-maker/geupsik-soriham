import { getCategoryById } from '../data/categories';
import './ToolCard.css';

const STATUS_LABEL = {
  ready: '바로 사용',
  download: '자료 다운로드',
  coming: '준비 중',
};

export default function ToolCard({ tool }) {
  const category = getCategoryById(tool.category);
  const isDisabled = tool.status === 'coming';

  return (
    <article className="tool-card" style={{ '--tool-color': category?.color ?? 'var(--mint-deep)' }}>
      <span className={`tool-card__badge ${isDisabled ? 'is-coming' : ''}`}>
        {isDisabled ? '준비중' : '추천'}
      </span>

      {category && <p className="tool-card__category">{category.name}</p>}
      <h3 className="tool-card__title">{tool.title}</h3>
      <p className="tool-card__desc">{tool.description}</p>

      {isDisabled ? (
        <button type="button" className="tool-card__btn is-disabled" disabled aria-disabled="true">
          {STATUS_LABEL.coming}
        </button>
      ) : (
        <a
          className="tool-card__btn"
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {STATUS_LABEL[tool.status]}
          <span aria-hidden="true"> ↗</span>
        </a>
      )}
    </article>
  );
}
