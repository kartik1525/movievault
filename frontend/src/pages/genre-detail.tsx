import { useState } from 'react';
import { useParams } from 'react-router';
import { AnimatedPage } from '@/components/common/animated-page';
import { PageHeader } from '@/components/common/page-header';
import { MovieGrid } from '@/components/movie/movie-grid';
import { useGenreMovies } from '@/hooks/use-movies';
import { useInfiniteScroll } from '@/hooks/use-intersection';
import { GENRE_MAP } from '@/config/constants';
import { SlidersHorizontal } from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popularity.desc' },
  { label: 'Highest Rated', value: 'vote_average.desc' },
  { label: 'Newest Release', value: 'release_date.desc' },
  { label: 'Oldest Release', value: 'release_date.asc' },
];

export default function GenreDetailPage() {
  const { genreId } = useParams<{ genreId: string }>();
  const id = Number(genreId);
  const [sortBy, setSortBy] = useState('popularity.desc');

  const genreName = GENRE_MAP[id] || 'Genre';

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGenreMovies(id, sortBy);

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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <PageHeader
            title={`${genreName} Movies`}
            description={`Browse the best ${genreName.toLowerCase()} films in cinema history.`}
            className="mb-0"
          />

          <div className="flex items-center gap-2 self-start sm:self-auto">
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

        <MovieGrid movies={movies} isLoading={isLoading} skeletonCount={18} />

        <div ref={loadMoreRef} className="py-8 flex justify-center">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-sm text-cv-text-secondary">
              <div className="w-4 h-4 rounded-full border-2 border-cv-accent border-t-transparent animate-spin" />
              Loading more {genreName.toLowerCase()} movies...
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}
