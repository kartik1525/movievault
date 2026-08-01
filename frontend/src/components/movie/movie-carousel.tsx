import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCard } from './movie-card';
import { MovieCardSkeleton } from '@/components/common/loading';
import type { Movie } from '@/types/movie';

interface MovieCarouselProps {
  movies: Movie[];
  isLoading?: boolean;
}

export function MovieCarousel({ movies, isLoading = false }: MovieCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.clientWidth * 0.75;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex gap-6 overflow-hidden py-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-36 sm:w-44 md:w-52">
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative group/carousel">
      {/* Scroll controls */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-r-2xl bg-black/60 backdrop-blur-md border border-l-0 border-cv-border text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-105 hidden md:flex items-center justify-center"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-l-2xl bg-black/60 backdrop-blur-md border border-r-0 border-cv-border text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-105 hidden md:flex items-center justify-center"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Movie list container */}
      <div
        ref={containerRef}
        className="flex gap-6 md:gap-7 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 -mx-1"
      >
        {movies.map((movie, index) => (
          <div key={movie.id} className="flex-shrink-0 w-36 sm:w-44 md:w-52">
            <MovieCard movie={movie} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
