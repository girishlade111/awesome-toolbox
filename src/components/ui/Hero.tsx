import { motion } from 'framer-motion';
import { Button } from './Button';

interface HeroProps {
  resourceCount: number;
  tutorialCount: number;
  categoryCount: number;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function Hero({ resourceCount, tutorialCount, categoryCount }: HeroProps) {
  return (
    <section className="dh-hero">
      <div className="dh-hero__bg" />
      <motion.div className="container dh-hero__inner" variants={container} initial="hidden" animate="show">
        <motion.span className="dh-eyebrow" variants={item}>
          The open AI tooling registry
        </motion.span>
        <motion.h1 className="dh-hero__title" variants={item}>
          Supercharge Your <span className="dh-gradient-text">Development</span>
        </motion.h1>
        <motion.p className="dh-hero__subtitle" variants={item}>
          Discover community-built agents, prompts, instructions, and plugins to get the most out of your developer tool.
        </motion.p>
        <motion.form className="dh-hero__search" variants={item} action="/browse" method="get">
          <svg className="dh-hero__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input type="text" name="q" placeholder="Search for agents, prompts, plugins..." className="dh-hero__input" />
          <Button type="submit" variant="primary">Search</Button>
        </motion.form>
        <motion.div className="dh-hero__stats" variants={item}>
          <Stat number={resourceCount} label="Resources" />
          <Stat number={tutorialCount} label="Tutorials" />
          <Stat number={categoryCount} label="Categories" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({ number, label }: { number: number; label: string }) {
  return (
    <div className="dh-stat">
      <span className="dh-stat__number">{number.toLocaleString()}</span>
      <span className="dh-stat__label">{label}</span>
    </div>
  );
}
