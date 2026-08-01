import { useState, useRef, memo, useCallback } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Star, Heart, Plus } from 'lucide-react';
import { getPosterUrl } from '@/utils/image';
import { formatYear, formatRating } from '@/utils/format';
import { movieRoute } from '@/config/routes';
import { cn } from '@/utils/cn';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export const MovieCard = memo(function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link to={movieRoute(movie.id)} className="block group">
        <div
          ref={cardRef}
          className="relative transition-[box-shadow] duration-300"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Poster */}
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-cv-card border border-cv-border group-hover:border-cv-border-hover transition-colors">
            {/* Placeholder shimmer */}
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton rounded-xl" />
            )}

            <img
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
              loading="lazy"
              className={cn(
                'w-full h-full object-cover transition-all duration-500',
                imageLoaded ? 'img-loaded' : 'img-loading opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Hover overlay */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent',
                'transition-opacity duration-300',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            >
              {/* Quick actions */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-cv-gold fill-cv-gold" />
                  <span className="font-mono text-xs font-semibold text-white">
                    {formatRating(movie.vote_average)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Add to favorites"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  >
                    <Heart className="w-3.5 h-3.5 text-white" />
                  </button>
                  <button
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Add to watchlist"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Rating badge — always visible */}
            {movie.vote_average > 0 && (
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
                <Star className="w-3 h-3 text-cv-gold fill-cv-gold" />
                <span className="font-mono text-[11px] font-semibold text-white">
                  {formatRating(movie.vote_average)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-4 px-0.5">
            <h3 className="text-sm font-semibold text-cv-text line-clamp-1 group-hover:text-cv-accent transition-colors duration-200">
              {movie.title}
            </h3>
            <p className="text-xs text-cv-text-tertiary mt-1.5 font-mono">
              {formatYear(movie.release_date)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});
