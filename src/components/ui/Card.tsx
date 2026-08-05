import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  interactive?: boolean;
}

export function Card({ className, interactive = true, children, ...props }: CardProps) {
  return (
    <motion.div
      className={cn('dh-card', interactive && 'dh-card--interactive', className)}
      whileHover={interactive ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
