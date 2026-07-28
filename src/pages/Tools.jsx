import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import ToolCard from '../components/ToolCard';
import PageHero from '../components/PageHero';
import './Tools.css';

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const updateParams = (nextCategory, nextQuery) => {
    const params = new URLSearchParams();
    if (nextCategory && nextCategory !== 'all') params.set('category', nextCategory);
    if (nextQuery) params.set('q', nextQuery);
    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesQuery =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const readyCount = filtered.filter((t) => t.status !== 'coming').length;

  return (
    <>
      <PageHero
        eyebrow="업무도구"
        title="필요한 업무도구를 찾아보세요"
        description="식단, 품의서, 발주, 선호도, HACCP 자료를 검색하거나 마을 구역별로 골라보세요."
      />

      <div className="container tools-page">
        <form
          className="tools-page__search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            updateParams(activeCategory, query);
          }}
        >
          <label className="visually-hidden" htmlFor="tools-search-input">
            도구 검색
          </label>
          <input
            id="tools-search-input"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateParams(activeCategory, e.target.value);
            }}
            placeholder="식단, 품의서, 발주, 선호도, HACCP 자료를 검색해 보세요"
          />
          <button type="submit">검색</button>
        </form>

        <div className="tools-page__filters" role="group" aria-label="카테고리 필터">
          <button
            type="button"
            className={`tools-page__chip ${activeCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveCategory('all');
              updateParams('all', query);
            }}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`tools-page__chip ${activeCategory === cat.id ? 'is-active' : ''}`}
              style={{ '--chip-color': cat.color }}
              onClick={() => {
                setActiveCategory(cat.id);
                updateParams(cat.id, query);
              }}
            >
              {cat.short}
            </button>
          ))}
        </div>

        <p className="tools-page__count">
          총 {filtered.length}개 도구 ({readyCount}개 사용 가능)
        </p>

        {filtered.length > 0 ? (
          <div className="tools-page__grid">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <p className="tools-page__empty">검색 결과가 없어요. 다른 검색어나 카테고리를 선택해 보세요.</p>
        )}
      </div>
    </>
  );
}
