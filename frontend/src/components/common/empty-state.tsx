import { motion } from 'framer-motion';
import { Film, Search, Heart, List } from 'lucide-react';
import { fadeInUp } from '@/animations/variants';
import type { ReactNode } from 'react';

type EmptyVariant = 'default' | 'search' | 'favorites' | 'watchlist';

interface EmptyStateProps {
  variant?: EmptyVariant;
  title: string;
  description: string;
  action?: ReactNode;
}

const ICONS: Record<EmptyVariant, typeof Film> = {
  default: Film,
  search: Search,
  favorites: Heart,
  watchlist: List,
};

export function EmptyState({ variant = 'default', title, description, action }: EmptyStateProps) {
  const Icon = ICONS[variant];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-cv-surface/60 border border-cv-border flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-cv-text-tertiary" />
      </div>
      <h3 className="text-h3 text-cv-text mb-2">{title}</h3>
      <p className="text-body-sm text-cv-text-secondary max-w-sm mb-6">{description}</p>
      {action}
    </motion.div>
  );
}
