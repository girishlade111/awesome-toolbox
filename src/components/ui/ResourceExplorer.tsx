import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { Resource } from '../../types';
import { CategoryBadge } from './Badge';
import { ResourceCard } from './ResourceCard';

interface Props {
  resources: Resource[];
  initialCategory?: string;
  allTags: string[];
}

const CATEGORY_OPTIONS = [
  { id: '', label: 'All', icon: '✦' },
  { id: 'agent', label: 'Agents', icon: '🤖' },
  { id: 'prompt', label: 'Prompts', icon: '💬' },
  { id: 'instruction', label: 'Instructions', icon: '📋' },
  { id: 'plugin', label: 'Plugins', icon: '🔌' },
  { id: 'workflow', label: 'Workflows', icon: '⚡' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'alpha', label: 'A–Z' },
  { value: 'alpha-desc', label: 'Z–A' },
  { value: 'popular', label: 'Most popular' },
];

const ITEMS_PER_PAGE = 12;

export function ResourceExplorer({ resources, initialCategory = '', allTags }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const fuse = useMemo(
    () =>
      new Fuse(resources, {
        keys: ['title', 'description', 'author', 'tags'],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [resources]
  );

  const filtered = useMemo(() => {
    let list = query ? fuse.search(query).map((r) => r.item) : [...resources];
    if (category) list = list.filter((r) => r.category === category);
    if (activeTags.length) list = list.filter((r) => activeTags.every((t) => r.tags.includes(t)));
    const sorted = [...list];
    switch (sort) {
      case 'newest':
        sorted.sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt));
        break;
      case 'oldest':
        sorted.sort((a, b) => +new Date(a.addedAt) - +new Date(b.addedAt));
        break;
      case 'alpha':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alpha-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'popular':
        sorted.sort((a, b) => (b.stars || 0) - (a.stars || 0));
        break;
    }
    return sorted;
  }, [query, category, activeTags, sort, fuse, resources]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * ITEMS_PER_PAGE, current * ITEMS_PER_PAGE);

  const resetPage = () => setPage(1);

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    resetPage();
  }

  function clearAll() {
    setQuery('');
    setCategory('');
    setActiveTags([]);
    setSort('newest');
    resetPage();
  }

  return (
    <div className="dh-explorer">
      <div className="dh-explorer__search">
        <svg className="dh-explorer__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          className="dh-explorer__input"
          placeholder="Search 550+ resources..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            resetPage();
          }}
        />
        {query && (
          <button className="dh-explorer__clear" onClick={() => { setQuery(''); resetPage(); }}>×</button>
        )}
      </div>

      <div className="dh-explorer__controls">
        <div className="dh-explorer__cats">
          {CATEGORY_OPTIONS.map((c) => (
            <button
              key={c.id || 'all'}
              className={cn('dh-pill', category === c.id && 'dh-pill--active')}
              onClick={() => { setCategory(c.id); resetPage(); }}
            >
              <span aria-hidden>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>
        <select className="dh-explorer__sort" value={sort} onChange={(e) => { setSort(e.target.value); resetPage(); }}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <details className="dh-explorer__tags">
        <summary>Filter by tag ({activeTags.length} selected)</summary>
        <div className="dh-explorer__taglist">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={cn('dh-pill', activeTags.includes(tag) && 'dh-pill--active')}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </details>

      <div className="dh-explorer__info">
        <span>
          <strong>{filtered.length}</strong> {filtered.length === 1 ? 'resource' : 'resources'}
          {(query || category || activeTags.length) && ' matching'}
        </span>
        {(query || category || activeTags.length) && (
          <button className="dh-link" onClick={clearAll}>Clear all</button>
        )}
      </div>

      {pageItems.length === 0 ? (
        <div className="dh-explorer__empty">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <path d="M8 11h6" />
          </svg>
          <h3>No resources found</h3>
          <p>Try a different search or clear your filters.</p>
        </div>
      ) : (
        <motion.div className="dh-grid" layout>
          <AnimatePresence mode="popLayout">
            {pageItems.map((r, i) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.25) }}
              >
                <ResourceCard resource={r} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {totalPages > 1 && (
        <div className="dh-pagination">
          <button className="dh-btn dh-btn--ghost dh-btn--sm" disabled={current === 1} onClick={() => setPage(current - 1)}>← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - current) <= 1)
            .map((p, idx, arr) => (
              <span key={p} className="dh-pagination__group">
                {idx > 0 && arr[idx - 1] !== p - 1 && <span className="dh-pagination__ellipsis">…</span>}
                <button
                  className={cn('dh-pagination__page', p === current && 'dh-pagination__page--active')}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              </span>
            ))}
          <button className="dh-btn dh-btn--ghost dh-btn--sm" disabled={current === totalPages} onClick={() => setPage(current + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}
