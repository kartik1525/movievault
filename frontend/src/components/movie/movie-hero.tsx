import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { getBackdropUrl, getPosterUrl } from '@/utils/image';
import { formatYear, formatRating, truncate } from '@/utils/format';
import { GENRE_MAP } from '@/config/constants';
import { movieRoute } from '@/config/routes';
import type { Movie } from '@/types/movie';

const HeroParticles = lazy(() =>
  import('@/components/three/hero-particles').then((m) => ({ default: m.HeroParticles }))
);

interface MovieHeroProps {
  movies: Movie[];
  onPlayTrailer?: (movieId: number) => void;
}

export function MovieHero({ movies, onPlayTrailer }: MovieHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = movies.slice(0, 5);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const current = featured[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[580px] max-h-[850px] overflow-hidden bg-cv-bg">
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Backdrop Image */}
          <div className="absolute inset-0">
            <img
              src={getBackdropUrl(current.backdrop_path, 'original')}
              alt={current.title}
              className="w-full h-full object-cover object-top scale-105 animate-pulse-slow"
            />
            {/* Dark gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-cv-bg via-cv-bg/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-cv-bg via-cv-bg/80 to-transparent w-full md:w-3/4" />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Hero Content Container */}
          <div className="relative page-container h-full flex items-end pb-20 pt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
              {/* Left text column */}
              <div className="lg:col-span-8 space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cv-text-secondary">
                  <span className="px-2.5 py-1 rounded-md bg-cv-accent/20 border border-cv-accent/30 text-cv-accent font-semibold">
                    Featured
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-cv-surface/80 border border-cv-border text-cv-gold font-semibold">
                    <Star className="w-3.5 h-3.5 fill-cv-gold" />
                    {formatRating(current.vote_average)}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-cv-surface/60 border border-cv-border">
                    {formatYear(current.release_date)}
                  </span>
                  {current.genre_ids?.slice(0, 3).map((id) => (
                    <span
                      key={id}
                      className="px-2.5 py-1 rounded-md bg-cv-surface/60 border border-cv-border"
                    >
                      {GENRE_MAP[id]}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-display text-white max-w-3xl drop-shadow-lg">
                  {current.title}
                </h1>

                {/* Overview */}
                <p className="text-body-lg text-cv-text-secondary max-w-2xl line-clamp-3 leading-relaxed">
                  {truncate(current.overview, 220)}
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {onPlayTrailer && (
                    <button
                      onClick={() => onPlayTrailer(current.id)}
                      className="flex items-center gap-2.5 px-6 py-3.5 bg-cv-accent text-white font-semibold text-sm rounded-xl hover:bg-cv-accent-hover transition-all duration-200 shadow-lg shadow-cv-accent/20 hover:scale-[1.02]"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      Watch Trailer
                    </button>
                  )}

                  <Link
                    to={movieRoute(current.id)}
                    className="flex items-center gap-2 px-6 py-3.5 bg-cv-surface/90 text-cv-text font-medium text-sm rounded-xl border border-cv-border hover:border-cv-border-hover hover:bg-cv-surface transition-all duration-200 backdrop-blur-md hover:scale-[1.02]"
                  >
                    <Info className="w-4 h-4 text-cv-text-secondary" />
                    More Details
                  </Link>
                </div>
              </div>

              {/* Right column — carousel controls & poster preview */}
              <div className="hidden lg:flex lg:col-span-4 flex-col items-end gap-4">
                <div className="relative w-44 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-cv-border/50">
                  <img
                    src={getPosterUrl(current.poster_path, 'w342')}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Navigation arrows & slide indicators */}
                <div className="flex items-center gap-3 bg-cv-surface/80 border border-cv-border p-2 rounded-2xl backdrop-blur-md">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-xl text-cv-text-secondary hover:text-white hover:bg-cv-card transition-colors"
                    aria-label="Previous movie"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex gap-1.5 px-1">
                    {featured.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentIndex
                            ? 'w-6 bg-cv-accent'
                            : 'w-1.5 bg-cv-text-tertiary/40 hover:bg-cv-text-tertiary'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl text-cv-text-secondary hover:text-white hover:bg-cv-card transition-colors"
                    aria-label="Next movie"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
