import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/page-transitions';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

/** Wraps a page with entrance/exit animation */
export function AnimatedPage({ children, className }: AnimatedPageProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn('min-h-screen', className)}
    >
      {children}
    </motion.div>
  );
}
