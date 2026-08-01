import { motion } from 'framer-motion';
import { fadeInUp } from '@/animations/variants';
import { cn } from '@/utils/cn';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={cn('mb-10', className)}
    >
      <h1 className="text-h1 text-cv-text mb-2">{title}</h1>
      {description && (
        <p className="text-body text-cv-text-secondary max-w-2xl">{description}</p>
      )}
    </motion.div>
  );
}
