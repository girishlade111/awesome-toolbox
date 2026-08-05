import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface AccordionItem {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className={cn('dh-accordion', className)}>
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.value} value={item.value} className="dh-accordion__item">
          <AccordionPrimitive.Header className="dh-accordion__header">
            <AccordionPrimitive.Trigger className="dh-accordion__trigger">
              {item.trigger}
              <motion.span
                className="dh-accordion__chevron"
                initial={false}
                aria-hidden
              >
                ▾
              </motion.span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="dh-accordion__content">
            <AnimatePresence>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div className="dh-accordion__body">{item.content}</div>
              </motion.div>
            </AnimatePresence>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
