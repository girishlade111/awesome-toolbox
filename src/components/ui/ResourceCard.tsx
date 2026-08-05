import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { Resource } from '../../types';
import { CategoryBadge } from './Badge';

interface ResourceCardProps {
  resource: Resource;
  className?: string;
  index?: number;
}

export function ResourceCard({ resource, className, index = 0 }: ResourceCardProps) {
  return (
    <motion.a
      href={`/resource/${resource.id}`}
      className={cn('dh-card dh-card--interactive dh-resource-card', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3), ease: 'easeOut' }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
    >
      <div className="dh-resource-card__top">
        <CategoryBadge category={resource.category} />
        {resource.stars ? (
          <span className="dh-resource-card__stars">★ {resource.stars.toLocaleString()}</span>
        ) : null}
      </div>
      <h3 className="dh-resource-card__title">{resource.title}</h3>
      <p className="dh-resource-card__desc">{resource.description}</p>
      <div className="dh-resource-card__meta">
        <span className="dh-resource-card__author">
          by <a href={resource.authorUrl} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>{resource.author}</a>
        </span>
        <div className="dh-resource-card__tags">
          {resource.tags.slice(0, 3).map((t) => (
            <span key={t} className="dh-pill">{t}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
