import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { MovieCarousel } from './movie-carousel';
import { fadeInUp } from '@/animations/variants';
import type { Movie } from '@/types/movie';

interface MovieRowProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  seeAllPath?: string;
  isLoading?: boolean;
}

export function MovieRow({
  title,
  subtitle,
  movies,
  seeAllPath,
  isLoading = false,
}: MovieRowProps) {
  return (
    <section className="py-8">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-h2 text-cv-text">{title}</h2>
            {subtitle && (
              <p className="text-body-sm text-cv-text-secondary mt-1">{subtitle}</p>
            )}
          </div>
          {seeAllPath && (
            <Link
              to={seeAllPath}
              className="flex items-center gap-1 text-sm font-medium text-cv-text-secondary hover:text-cv-text transition-colors duration-200"
            >
              See All
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <MovieCarousel movies={movies} isLoading={isLoading} />
      </motion.div>
    </section>
  );
}
