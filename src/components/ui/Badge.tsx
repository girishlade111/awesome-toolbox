import { cn } from '../../lib/utils';
import type { Resource } from '../../types';

const categoryStyles: Record<Resource['category'], string> = {
  agent: 'dh-badge--agent',
  prompt: 'dh-badge--prompt',
  instruction: 'dh-badge--instruction',
  plugin: 'dh-badge--plugin',
  workflow: 'dh-badge--workflow',
};

export function CategoryBadge({
  category,
  className,
}: {
  category: Resource['category'];
  className?: string;
}) {
  return <span className={cn('dh-badge', categoryStyles[category], className)}>{category}</span>;
}

export function Badge({
  children,
  className,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'error';
}) {
  return <span className={cn('dh-badge', `dh-badge--${tone}`, className)}>{children}</span>;
}
