import { useState } from 'react';
import { AnimatedPage } from '@/components/common/animated-page';
import { PageHeader } from '@/components/common/page-header';
import { MovieGrid } from '@/components/movie/movie-grid';
import { EmptyState } from '@/components/common/empty-state';
import { useDiscoverMovies, useGenres } from '@/hooks/use-movies';
import { useInfiniteScroll } from '@/hooks/use-intersection';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';

const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popularity.desc' },
  { label: 'Highest Rated', value: 'vote_average.desc' },
  { label: 'Newest Release', value: 'release_date.desc' },
  { label: 'Oldest Release', value: 'release_date.asc' },
  { label: 'Title (A-Z)', value: 'title.asc' },
];

export default function DiscoverPage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('popularity.desc');

  const { data: genres } = useGenres();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useDiscoverMovies({
    with_genres: selectedGenre ? String(selectedGenre) : undefined,
    sort_by: sortBy,
  });

  const loadMoreRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    Boolean(hasNextPage && !isFetchingNextPage)
  );

  const movies = data?.pages.flatMap((page) => page.results) || [];

  return (
    <AnimatedPage>
      <div className="page-container pt-28 pb-16 space-y-8">
        <PageHeader
          title="Discover Movies"
          description="Explore films across genres, ratings, and release eras."
        />

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cv-border">
          {/* Genre Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedGenre(null)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
                selectedGenre === null
                  ? 'bg-cv-accent text-white shadow-md'
                  : 'bg-cv-surface text-cv-text-secondary border border-cv-border hover:border-cv-border-hover'
              )}
            >
              All Genres
            </button>
            {genres?.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGenre(g.id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
                  selectedGenre === g.id
                    ? 'bg-cv-accent text-white shadow-md'
                    : 'bg-cv-surface text-cv-text-secondary border border-cv-border hover:border-cv-border-hover'
                )}
              >
                {g.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-cv-text-tertiary" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cv-surface text-cv-text text-xs font-semibold px-3 py-2 rounded-xl border border-cv-border focus:outline-none focus:border-cv-accent cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Movies Grid */}
        <MovieGrid movies={movies} isLoading={isLoading} skeletonCount={18} />

        {/* Empty State */}
        {!isLoading && movies.length === 0 && (
          <EmptyState
            variant="search"
            title="No movies found"
            description="Try adjusting your genre filters or sorting preferences."
          />
        )}

        {/* Infinite Scroll Trigger / Loader */}
        <div ref={loadMoreRef} className="py-8 flex justify-center">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-sm text-cv-text-secondary">
              <div className="w-4 h-4 rounded-full border-2 border-cv-accent border-t-transparent animate-spin" />
              Loading more movies...
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}
