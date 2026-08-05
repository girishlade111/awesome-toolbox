import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface TabsProps {
  defaultValue: string;
  items: { value: string; label: string; content: ReactNode }[];
  className?: string;
}

export function Tabs({ defaultValue, items, className }: TabsProps) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue} className={cn('dh-tabs', className)}>
      <TabsPrimitive.List className="dh-tabs__list">
        {items.map((item) => (
          <TabsPrimitive.Trigger key={item.value} value={item.value} className="dh-tabs__trigger">
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content key={item.value} value={item.value} className="dh-tabs__content">
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
