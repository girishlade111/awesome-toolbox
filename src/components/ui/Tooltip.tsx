import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={150}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <AnimatePresence>
          <TooltipPrimitive.Portal forceMount>
            <TooltipPrimitive.Content asChild side={side} sideOffset={8}>
              <motion.div
                className="dh-tooltip"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.12 }}
              >
                {content}
                <TooltipPrimitive.Arrow className="dh-tooltip__arrow" />
              </motion.div>
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
