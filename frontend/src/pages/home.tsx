import { useState } from 'react';
import { Link } from 'react-router';
import { AnimatedPage } from '@/components/common/animated-page';
import { MovieHero } from '@/components/movie/movie-hero';
import { MovieRow } from '@/components/movie/movie-row';
import { TrailerModal } from '@/components/movie/trailer-modal';
import { GenreCard } from '@/components/movie/genre-card';
import {
  useTrending,
  usePopular,
  useNowPlaying,
  useUpcoming,
  useGenres,
  useMovieVideos,
} from '@/hooks/use-movies';
import { ROUTES } from '@/config/routes';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/animations/variants';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const { data: trendingData, isLoading: isTrendingLoading } = useTrending('week');
  const { data: popularData, isLoading: isPopularLoading } = usePopular();
  const { data: nowPlayingData, isLoading: isNowPlayingLoading } = useNowPlaying();
  const { data: upcomingData, isLoading: isUpcomingLoading } = useUpcoming();
  const { data: genres } = useGenres();

  const [activeTrailerMovieId, setActiveTrailerMovieId] = useState<number | null>(null);

  const { data: trailerVideos } = useMovieVideos(activeTrailerMovieId || 0);

  // Find official trailer or first teaser
  const officialTrailer = trailerVideos?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  ) || trailerVideos?.find((v) => v.site === 'YouTube');

  const trendingMovies = trendingData?.results || [];
  const popularMovies = popularData?.results || [];
  const nowPlayingMovies = nowPlayingData?.results || [];
  const upcomingMovies = upcomingData?.results || [];

  return (
    <AnimatedPage className="overflow-hidden">
      {/* Hero Banner with Featured Movie */}
      <MovieHero
        movies={trendingMovies}
        onPlayTrailer={(id) => setActiveTrailerMovieId(id)}
      />

      <div className="page-container space-y-4">
        {/* Trending Section */}
        <MovieRow
          title="Trending This Week"
          subtitle="Films generating the most buzz among viewers."
          movies={trendingMovies}
          seeAllPath={ROUTES.TRENDING}
          isLoading={isTrendingLoading}
        />

        {/* Popular Section */}
        <MovieRow
          title="Popular Movies"
          subtitle="All-time user favorites and top streamed content."
          movies={popularMovies}
          seeAllPath={ROUTES.POPULAR}
          isLoading={isPopularLoading}
        />

        {/* In Theaters */}
        <MovieRow
          title="Now Playing in Theaters"
          subtitle="Catch the latest releases on the big screen."
          movies={nowPlayingMovies}
          seeAllPath={ROUTES.DISCOVER}
          isLoading={isNowPlayingLoading}
        />

        {/* Upcoming */}
        <MovieRow
          title="Coming Soon"
          subtitle="Highly anticipated films releasing soon."
          movies={upcomingMovies}
          seeAllPath={ROUTES.UPCOMING}
          isLoading={isUpcomingLoading}
        />

        {/* Genres Showcase */}
        {genres && genres.length > 0 && (
          <section className="py-12">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-h2 text-cv-text">Explore by Genre</h2>
                  <p className="text-body-sm text-cv-text-secondary mt-1">
                    Discover cinema tailored to your taste.
                  </p>
                </div>
                <Link
                  to={ROUTES.GENRES}
                  className="text-sm font-medium text-cv-text-secondary hover:text-cv-text transition-colors"
                >
                  All Genres →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {genres.slice(0, 12).map((genre, idx) => (
                  <GenreCard key={genre.id} genre={genre} index={idx} />
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Featured Collections / Editor's Pick CTA */}
        <section className="py-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cv-surface via-cv-card to-cv-surface border border-cv-border p-8 md:p-14 text-center shadow-2xl"
          >
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cv-accent/20 border border-cv-accent/30 text-cv-accent text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                CineVault Experience
              </div>
              <h2 className="text-h1 text-cv-text">Build Your Personal Cinema Vault</h2>
              <p className="text-body text-cv-text-secondary">
                Track what you’ve watched, log reviews, save items to your personal watchlist, and organize your favorite films in one elegant platform.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to={ROUTES.REGISTER}
                  className="px-8 py-3.5 bg-cv-accent text-white text-sm font-semibold rounded-xl hover:bg-cv-accent-hover transition-all duration-200 shadow-lg shadow-cv-accent/20 hover:scale-105"
                >
                  Create Account
                </Link>
                <Link
                  to={ROUTES.DISCOVER}
                  className="px-8 py-3.5 bg-cv-surface text-cv-text text-sm font-medium rounded-xl border border-cv-border hover:border-cv-border-hover transition-all duration-200 hover:scale-105"
                >
                  Browse Vault
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={activeTrailerMovieId !== null}
        onClose={() => setActiveTrailerMovieId(null)}
        videoKey={officialTrailer?.key || null}
        title={trendingMovies.find((m) => m.id === activeTrailerMovieId)?.title}
      />
    </AnimatedPage>
  );
}
