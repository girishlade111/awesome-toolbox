import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { AnchorHTMLAttributes } from 'react';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={cn('dh-btn', `dh-btn--${variant}`, `dh-btn--${size}`, className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
