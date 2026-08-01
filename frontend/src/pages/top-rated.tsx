import { AnimatedPage } from '@/components/common/animated-page';
import { PageHeader } from '@/components/common/page-header';
import { MovieGrid } from '@/components/movie/movie-grid';
import { useCategoryMovies } from '@/hooks/use-movies';
import { useInfiniteScroll } from '@/hooks/use-intersection';

export default function TopRatedPage() {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useCategoryMovies('top_rated');

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
          title="Top Rated Classics & Masterpieces"
          description="The highest critically acclaimed movies of all time."
        />

        <MovieGrid movies={movies} isLoading={isLoading} skeletonCount={18} />

        <div ref={loadMoreRef} className="py-8 flex justify-center">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-sm text-cv-text-secondary">
              <div className="w-4 h-4 rounded-full border-2 border-cv-accent border-t-transparent animate-spin" />
              Loading more top rated movies...
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}
