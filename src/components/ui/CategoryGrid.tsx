import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CategoryGridProps {
  categories: { id: string; label: string; icon: string }[];
  counts: Record<string, number>;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function CategoryGrid({ categories, counts }: CategoryGridProps) {
  const extra = [
    { id: 'collections', label: 'Collections', icon: '📚' },
  ];
  const items = [...categories, ...extra];
  return (
    <motion.div className="dh-grid dh-grid--3" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
      {items.map((cat) => {
        const href = cat.id === 'collections' ? '/collections' : `/browse?category=${cat.id}`;
        const count = cat.id === 'collections' ? 'Curated bundles' : `${counts[cat.id] ?? 0} items`;
        return (
          <motion.a
            key={cat.id}
            href={href}
            className="dh-card dh-card--interactive dh-cat-card"
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <span className="dh-cat-card__icon">{cat.icon}</span>
            <h3>{cat.label}</h3>
            <p>{count}</p>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
