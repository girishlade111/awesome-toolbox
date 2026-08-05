import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { Tutorial } from '../../types';

const difficultyTone: Record<string, string> = {
  beginner: 'dh-badge--success',
  intermediate: 'dh-badge--warning',
  advanced: 'dh-badge--error',
};

export function TutorialCard({ tutorial, href }: { tutorial: Tutorial; href: string }) {
  return (
    <motion.a
      href={href}
      className="dh-card dh-card--interactive dh-tutorial-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="dh-tutorial-card__top">
        <span className={cn('dh-badge', difficultyTone[tutorial.difficulty])}>{tutorial.difficulty}</span>
        <span className="dh-tutorial-card__duration">{tutorial.duration}</span>
      </div>
      <h3 className="dh-tutorial-card__title">{tutorial.title}</h3>
      <p className="dh-tutorial-card__desc">{tutorial.description}</p>
    </motion.a>
  );
}
