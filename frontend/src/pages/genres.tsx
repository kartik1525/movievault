import { AnimatedPage } from '@/components/common/animated-page';
import { PageHeader } from '@/components/common/page-header';
import { GenreCard } from '@/components/movie/genre-card';
import { useGenres } from '@/hooks/use-movies';

export default function GenresPage() {
  const { data: genres, isLoading } = useGenres();

  return (
    <AnimatedPage>
      <div className="page-container pt-28 pb-16 space-y-8">
        <PageHeader
          title="Movie Genres"
          description="Select a genre to explore curated lists of films."
        />

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="h-40 rounded-xl skeleton" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {genres?.map((genre, idx) => (
              <GenreCard key={genre.id} genre={genre} index={idx} />
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
