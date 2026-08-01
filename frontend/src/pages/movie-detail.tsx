import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Play,
  Heart,
  Plus,
  Share2,
  Star,
  Clock,
  Calendar,
  DollarSign,
  Globe,
  Film,
  Check,
  ArrowLeft,
} from 'lucide-react';
import { AnimatedPage } from '@/components/common/animated-page';
import { CastCard } from '@/components/movie/cast-card';
import { MovieRow } from '@/components/movie/movie-row';
import { TrailerModal } from '@/components/movie/trailer-modal';
import { DetailSkeleton } from '@/components/common/loading';
import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useMovieImages,
  useRecommendations,
  useSimilarMovies,
} from '@/hooks/use-movies';
import {
  getBackdropUrl,
  getPosterUrl,
} from '@/utils/image';
import {
  formatReleaseDate,
  formatRuntime,
  formatRating,
  formatVoteCount,
  formatCurrency,
} from '@/utils/format';
import { genreRoute } from '@/config/routes';
import { fadeInUp, staggerContainer, staggerItem } from '@/animations/variants';

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const id = Number(movieId);

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const { data: movie, isLoading, isError } = useMovieDetails(id);
  const { data: credits } = useMovieCredits(id);
  const { data: videos } = useMovieVideos(id);
  const { data: images } = useMovieImages(id);
  const { data: recommendations } = useRecommendations(id);
  const { data: similar } = useSimilarMovies(id);

  if (isLoading) {
    return (
      <AnimatedPage>
        <DetailSkeleton />
      </AnimatedPage>
    );
  }

  if (isError || !movie) {
    return (
      <AnimatedPage>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <Film className="w-16 h-16 text-cv-text-tertiary mb-4" />
          <h2 className="text-h2 text-cv-text mb-2">Movie Not Found</h2>
          <p className="text-body text-cv-text-secondary max-w-md mb-6">
            We couldn't retrieve details for this film. It may have been removed or is unavailable.
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-cv-accent text-white font-semibold text-sm rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  // Find trailer
  const trailer = videos?.find((v) => v.type === 'Trailer' && v.site === 'YouTube') || videos?.find((v) => v.site === 'YouTube');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <AnimatedPage className="overflow-hidden pb-16">
      {/* Hero Backdrop */}
      <div className="relative w-full h-[65vh] min-h-[480px] max-h-[700px] overflow-hidden bg-cv-bg">
        <div className="absolute inset-0">
          <img
            src={getBackdropUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover object-top scale-105"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-cv-bg via-cv-bg/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-cv-bg via-cv-bg/60 to-transparent" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="page-container relative -mt-64 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Poster Column */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 flex flex-col items-center lg:items-start"
          >
            <div className="relative aspect-[2/3] w-64 md:w-80 rounded-2xl overflow-hidden shadow-2xl border border-cv-border group">
              <img
                src={getPosterUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Actions Bar under poster */}
            <div className="flex items-center gap-3 w-64 md:w-80 mt-6">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  isFavorite
                    ? 'bg-cv-accent text-white border-cv-accent'
                    : 'bg-cv-surface text-cv-text border-cv-border hover:border-cv-border-hover'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                {isFavorite ? 'Favorited' : 'Favorite'}
              </button>

              <button
                onClick={() => setIsWatchlisted(!isWatchlisted)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  isWatchlisted
                    ? 'bg-cv-gold text-cv-bg border-cv-gold'
                    : 'bg-cv-surface text-cv-text border-cv-border hover:border-cv-border-hover'
                }`}
              >
                {isWatchlisted ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isWatchlisted ? 'Watchlisted' : 'Watchlist'}
              </button>

              <button
                onClick={handleShare}
                className="p-3 bg-cv-surface text-cv-text rounded-xl border border-cv-border hover:border-cv-border-hover transition-colors"
                aria-label="Share movie"
              >
                {copiedShare ? <Check className="w-4 h-4 text-cv-success" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* Details Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 space-y-6"
          >
            {/* Tagline */}
            {movie.tagline && (
              <motion.p variants={staggerItem} className="text-body-lg text-cv-gold italic font-heading">
                "{movie.tagline}"
              </motion.p>
            )}

            {/* Title */}
            <motion.h1 variants={staggerItem} className="text-display text-cv-text">
              {movie.title}
            </motion.h1>

            {/* Badges & Metadata */}
            <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cv-surface border border-cv-border text-cv-gold font-mono font-semibold">
                <Star className="w-4 h-4 fill-cv-gold" />
                {formatRating(movie.vote_average)}
                <span className="text-xs text-cv-text-tertiary">({formatVoteCount(movie.vote_count)})</span>
              </div>

              {movie.runtime && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cv-surface border border-cv-border text-cv-text-secondary font-mono">
                  <Clock className="w-4 h-4" />
                  {formatRuntime(movie.runtime)}
                </div>
              )}

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cv-surface border border-cv-border text-cv-text-secondary font-mono">
                <Calendar className="w-4 h-4" />
                {formatReleaseDate(movie.release_date)}
              </div>

              <span className="px-3 py-1.5 rounded-lg bg-cv-surface border border-cv-border text-xs font-mono text-cv-accent font-semibold uppercase">
                {movie.status}
              </span>
            </motion.div>

            {/* Genres */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <Link
                  key={g.id}
                  to={genreRoute(g.id)}
                  className="px-3 py-1.5 rounded-xl bg-cv-card border border-cv-border hover:border-cv-border-hover text-xs font-medium text-cv-text-secondary hover:text-cv-text transition-colors"
                >
                  {g.name}
                </Link>
              ))}
            </motion.div>

            {/* Trailer Action */}
            {trailer && (
              <motion.div variants={staggerItem} className="pt-2">
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-cv-accent text-white font-semibold text-sm rounded-xl hover:bg-cv-accent-hover transition-all shadow-lg shadow-cv-accent/20 hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Watch Official Trailer
                </button>
              </motion.div>
            )}

            {/* Overview */}
            <motion.div variants={staggerItem} className="space-y-2 pt-4 border-t border-cv-border">
              <h3 className="text-h3 text-cv-text">Overview</h3>
              <p className="text-body-lg text-cv-text-secondary leading-relaxed">
                {movie.overview}
              </p>
            </motion.div>

            {/* Key Statistics / Financials */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-cv-border"
            >
              {movie.budget > 0 && (
                <div className="bg-cv-surface/60 border border-cv-border p-4 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs text-cv-text-tertiary mb-1">
                    <DollarSign className="w-3.5 h-3.5" /> Budget
                  </div>
                  <div className="font-mono text-sm font-semibold text-cv-text">
                    {formatCurrency(movie.budget)}
                  </div>
                </div>
              )}

              {movie.revenue > 0 && (
                <div className="bg-cv-surface/60 border border-cv-border p-4 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs text-cv-text-tertiary mb-1">
                    <DollarSign className="w-3.5 h-3.5" /> Revenue
                  </div>
                  <div className="font-mono text-sm font-semibold text-cv-text">
                    {formatCurrency(movie.revenue)}
                  </div>
                </div>
              )}

              {movie.homepage && (
                <div className="bg-cv-surface/60 border border-cv-border p-4 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs text-cv-text-tertiary mb-1">
                    <Globe className="w-3.5 h-3.5" /> Homepage
                  </div>
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-semibold text-cv-accent hover:underline truncate block"
                  >
                    Visit Site
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Cast Section */}
        {credits && credits.cast.length > 0 && (
          <section className="py-12 mt-12 border-t border-cv-border">
            <h2 className="text-h2 text-cv-text mb-6">Top Billed Cast</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {credits.cast.slice(0, 15).map((member) => (
                <CastCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {images && images.backdrops.length > 0 && (
          <section className="py-12 border-t border-cv-border">
            <h2 className="text-h2 text-cv-text mb-6">Media Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.backdrops.slice(0, 6).map((img, idx) => (
                <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-cv-card border border-cv-border">
                  <img
                    src={getBackdropUrl(img.file_path, 'w780')}
                    alt={`${movie.title} screenshot ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommendations Row */}
        {recommendations && recommendations.results.length > 0 && (
          <MovieRow
            title="Recommendations"
            subtitle="If you liked this film, you might enjoy these."
            movies={recommendations.results}
          />
        )}

        {/* Similar Movies Row */}
        {similar && similar.results.length > 0 && (
          <MovieRow
            title="Similar Films"
            subtitle="Films sharing similar themes, genres, or aesthetic elements."
            movies={similar.results}
          />
        )}
      </div>

      {/* Trailer Modal */}
      {trailer && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          videoKey={trailer.key}
          title={movie.title}
        />
      )}
    </AnimatedPage>
  );
}
