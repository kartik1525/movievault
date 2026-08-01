import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Film, Clock, ArrowRight, History, Trash2, Star } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { useSearchStore } from '@/store/search-store';
import { useSearch } from '@/hooks/use-search';
import { getPosterUrl } from '@/utils/image';
import { formatYear, formatRating } from '@/utils/format';
import { movieRoute } from '@/config/routes';
import { backdropVariants, modalVariants } from '@/animations/variants';
import { cn } from '@/utils/cn';

export function SearchModal() {
  const navigate = useNavigate();
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useSearchStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useSearch(query);

  const movies = data?.results.slice(0, 6) || [];

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  // Global Cmd+K trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  const handleClose = useCallback(() => {
    setSearchOpen(false);
  }, [setSearchOpen]);

  const handleSelectMovie = (movieId: number, movieTitle: string) => {
    addRecentSearch(movieTitle);
    handleClose();
    navigate(movieRoute(movieId));
  };

  const handleSelectRecent = (term: string) => {
    setQuery(term);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (movies.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + movies.length) % (movies.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (movies[selectedIndex]) {
        handleSelectMovie(movies[selectedIndex].id, movies[selectedIndex].title);
      } else if (query.trim()) {
        addRecentSearch(query.trim());
        handleClose();
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl bg-cv-surface border border-cv-border rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-cv-border bg-cv-bg-secondary/50">
              <Search className="w-5 h-5 text-cv-text-tertiary flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search movies, actors, directors..."
                className="w-full bg-transparent text-cv-text placeholder-cv-text-tertiary text-body-lg focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg text-cv-text-tertiary hover:text-cv-text transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="px-2 py-1 text-xs font-mono text-cv-text-tertiary bg-cv-card rounded border border-cv-border">
                ESC
              </kbd>
            </div>

            {/* Content Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {/* Querying State / Loading */}
              {isLoading && (
                <div className="space-y-3 py-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-cv-card/40 animate-pulse">
                      <div className="w-12 h-16 rounded-lg bg-cv-card flex-shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-1/2 bg-cv-card rounded" />
                        <div className="h-3 w-1/4 bg-cv-card/60 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Movie Search Results */}
              {!isLoading && query.trim() !== '' && movies.length > 0 && (
                <div className="space-y-1">
                  <div className="text-label text-cv-text-tertiary px-3 py-1.5">Movies</div>
                  {movies.map((movie, idx) => (
                    <button
                      key={movie.id}
                      onClick={() => handleSelectMovie(movie.id, movie.title)}
                      className={cn(
                        'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-150 text-left',
                        idx === selectedIndex
                          ? 'bg-cv-card border border-cv-border-hover text-cv-text'
                          : 'hover:bg-cv-card/60 text-cv-text-secondary'
                      )}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={getPosterUrl(movie.poster_path, 'w92')}
                          alt={movie.title}
                          className="w-10 h-14 object-cover rounded-lg bg-cv-card flex-shrink-0 border border-cv-border"
                        />
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm text-cv-text truncate">{movie.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-cv-text-tertiary mt-1 font-mono">
                            <span>{formatYear(movie.release_date)}</span>
                            {movie.vote_average > 0 && (
                              <span className="flex items-center gap-1 text-cv-gold">
                                <Star className="w-3 h-3 fill-cv-gold" />
                                {formatRating(movie.vote_average)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-cv-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              {/* Empty Results State */}
              {!isLoading && query.trim() !== '' && movies.length === 0 && (
                <div className="text-center py-12">
                  <Film className="w-10 h-10 text-cv-text-tertiary mx-auto mb-3" />
                  <h4 className="text-h3 text-cv-text mb-1">No movies found</h4>
                  <p className="text-body-sm text-cv-text-secondary">
                    No results for "{query}". Try checking for typos or searching for a different title.
                  </p>
                </div>
              )}

              {/* Initial State: Recent Searches & Shortcuts */}
              {query.trim() === '' && (
                <div className="space-y-6 py-2">
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between px-3 mb-2">
                        <span className="text-label text-cv-text-tertiary flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5" />
                          Recent Searches
                        </span>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-cv-text-tertiary hover:text-cv-accent flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Clear all
                        </button>
                      </div>

                      <div className="space-y-1">
                        {recentSearches.map((term) => (
                          <div
                            key={term}
                            className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-cv-card/60 transition-colors group"
                          >
                            <button
                              onClick={() => handleSelectRecent(term)}
                              className="flex items-center gap-2.5 text-sm text-cv-text-secondary group-hover:text-cv-text flex-1 text-left"
                            >
                              <Clock className="w-4 h-4 text-cv-text-tertiary" />
                              {term}
                            </button>
                            <button
                              onClick={() => removeRecentSearch(term)}
                              className="p-1 text-cv-text-tertiary hover:text-cv-accent opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label={`Remove ${term}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keyboard Shortcuts Hint */}
                  <div className="px-3 pt-2 border-t border-cv-border flex items-center justify-between text-xs text-cv-text-tertiary">
                    <span>Navigate with arrow keys</span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-cv-card rounded border border-cv-border">↵</kbd> Select
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
