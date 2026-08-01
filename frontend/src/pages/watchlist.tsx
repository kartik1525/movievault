import { useState } from 'react';
import { AnimatedPage } from '@/components/common/animated-page';
import { PageHeader } from '@/components/common/page-header';
import { EmptyState } from '@/components/common/empty-state';
import { MovieCard } from '@/components/movie/movie-card';
import { useAuth } from '@/context/auth-context';
import { Link } from 'react-router';
import { ROUTES } from '@/config/routes';
import type { Movie } from '@/types/movie';

export default function WatchlistPage() {
  const { user } = useAuth();
  const [watchlist] = useState<Movie[]>([]);

  return (
    <AnimatedPage>
      <div className="page-container pt-28 pb-16 space-y-8">
        <PageHeader
          title="Your Watchlist"
          description="Keep track of movies you plan to watch."
        />

        {!user ? (
          <EmptyState
            variant="watchlist"
            title="Sign in to manage watchlist"
            description="Create an account or sign in to save movies to your watchlist."
            action={
              <Link
                to={ROUTES.LOGIN}
                className="px-6 py-3 bg-cv-accent text-white font-semibold text-sm rounded-xl shadow-lg hover:bg-cv-accent-hover transition-colors"
              >
                Sign In
              </Link>
            }
          />
        ) : watchlist.length === 0 ? (
          <EmptyState
            variant="watchlist"
            title="Your watchlist is empty"
            description="Add films to your watchlist to remember what to stream next."
            action={
              <Link
                to={ROUTES.DISCOVER}
                className="px-6 py-3 bg-cv-surface border border-cv-border text-cv-text font-semibold text-sm rounded-xl hover:border-cv-border-hover transition-colors"
              >
                Explore Films
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {watchlist.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
