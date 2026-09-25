import { AnimatedPage } from '@/components/common/animated-page';
import { PageHeader } from '@/components/common/page-header';
import { EmptyState } from '@/components/common/empty-state';
import { MovieCard } from '@/components/movie/movie-card';
import { useAuth } from '@/context/auth-context';
import { Link } from 'react-router';
import { ROUTES } from '@/config/routes';
import { useFavorites } from '@/hooks/use-user-data';
import { Loader2 } from 'lucide-react';

export default function FavoritesPage() {
  const { user } = useAuth();
  const { data: favorites, isLoading } = useFavorites();

  return (
    <AnimatedPage>
      <div className="page-container pt-28 pb-16 space-y-8">
        <PageHeader
          title="Your Favorite Films"
          description="A curated showcase of movies you've favorited."
        />

        {!user ? (
          <EmptyState
            variant="favorites"
            title="Sign in to view favorites"
            description="Create an account or sign in to save movies to your personal vault."
            action={
              <Link
                to={ROUTES.LOGIN}
                className="px-6 py-3 bg-cv-accent text-white font-semibold text-sm rounded-xl shadow-lg hover:bg-cv-accent-hover transition-colors"
              >
                Sign In
              </Link>
            }
          />
        ) : isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-cv-accent" />
          </div>
        ) : !favorites || favorites.length === 0 ? (
          <EmptyState
            variant="favorites"
            title="No favorite films yet"
            description="Click the heart icon on any movie card or detail page to save it here."
            action={
              <Link
                to={ROUTES.DISCOVER}
                className="px-6 py-3 bg-cv-surface border border-cv-border text-cv-text font-semibold text-sm rounded-xl hover:border-cv-border-hover transition-colors"
              >
                Discover Movies
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {favorites.map((fav, index) => (
              <MovieCard 
                key={fav.movieId} 
                movie={{
                  id: fav.movieId,
                  title: fav.movieTitle,
                  poster_path: fav.posterPath,
                  // provide dummy data for required fields
                  original_title: fav.movieTitle,
                  overview: '',
                  backdrop_path: null,
                  release_date: '',
                  vote_average: 0,
                  vote_count: 0,
                  popularity: 0,
                  genre_ids: [],
                  adult: false,
                  original_language: 'en',
                  video: false,
                }} 
                index={index} 
              />
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
