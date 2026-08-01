import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { GENRE_GRADIENTS } from '@/config/constants';
import { genreRoute } from '@/config/routes';
import { cn } from '@/utils/cn';
import type { Genre } from '@/types/movie';

interface GenreCardProps {
  genre: Genre;
  index?: number;
}

export function GenreCard({ genre, index = 0 }: GenreCardProps) {
  const gradient = GENRE_GRADIENTS[genre.id] || 'from-zinc-900/80 to-stone-900/60';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link
        to={genreRoute(genre.id)}
        className="block group"
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-xl border border-cv-border p-7 h-40 flex flex-col justify-end',
            'bg-gradient-to-br',
            gradient,
            'group-hover:border-cv-border-hover group-hover:scale-[1.02] transition-all duration-300 shadow-lg'
          )}
        >
          {/* Subtle light effect on hover */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <h3 className="relative z-10 text-h3 text-white font-heading tracking-tight group-hover:translate-x-1 transition-transform duration-200">
            {genre.name}
          </h3>

          <span className="relative z-10 text-xs text-white/60 font-mono mt-1 group-hover:text-white/80 transition-colors">
            Explore films →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
