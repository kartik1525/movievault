import { useState, useRef, memo, useCallback } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Star, Heart, Plus } from 'lucide-react';
import { getPosterUrl } from '@/utils/image';
import { formatYear, formatRating } from '@/utils/format';
import { movieRoute } from '@/config/routes';
import { cn } from '@/utils/cn';
import type { Movie } from '@/types/movie';
import { useCheckFavorite, useCheckWatchlist, useToggleFavorite, useToggleWatchlist } from '@/hooks/use-user-data';
import { useAuth } from '@/context/auth-context';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/config/routes';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export const MovieCard = memo(function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { data: isFavoriteData } = useCheckFavorite(movie.id);
  const { data: isWatchlistData } = useCheckWatchlist(movie.id);
  const toggleFavorite = useToggleFavorite();
  const toggleWatchlist = useToggleWatchlist();

  const isFavorite = isFavoriteData ?? false;
  const isWatchlisted = isWatchlistData?.isInWatchlist ?? false;

  const { user } = useAuth();
  const navigate = useNavigate();

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

  const onFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }
    toggleFavorite.mutate({ movieId: movie.id, movieTitle: movie.title, posterPath: movie.poster_path, isFavorite });
  };

  const onWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }
    toggleWatchlist.mutate({ movieId: movie.id, movieTitle: movie.title, posterPath: movie.poster_path, isWatchlisted });
  };

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
                    className={`p-1.5 rounded-lg transition-colors ${
                      isFavorite ? 'bg-cv-accent/90' : 'bg-white/10 hover:bg-white/20'
                    } ${toggleFavorite.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label="Toggle favorites"
                    disabled={toggleFavorite.isPending}
                    onClick={onFavoriteClick}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white text-white' : 'text-white'}`} />
                  </button>
                  <button
                    className={`p-1.5 rounded-lg transition-colors ${
                      isWatchlisted ? 'bg-cv-gold/90' : 'bg-white/10 hover:bg-white/20'
                    } ${toggleWatchlist.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label="Toggle watchlist"
                    disabled={toggleWatchlist.isPending}
                    onClick={onWatchlistClick}
                  >
                    <Plus className={`w-3.5 h-3.5 ${isWatchlisted ? 'text-cv-bg' : 'text-white'}`} />
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
