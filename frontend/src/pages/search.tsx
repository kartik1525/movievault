import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { AnimatedPage } from '@/components/common/animated-page';
import { PageHeader } from '@/components/common/page-header';
import { MovieGrid } from '@/components/movie/movie-grid';
import { EmptyState } from '@/components/common/empty-state';
import { useSearch } from '@/hooks/use-search';
import { Search as SearchIcon, X } from 'lucide-react';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const { data, isLoading } = useSearch(query);

  useEffect(() => {
    if (query.trim()) {
      setSearchParams({ q: query.trim() }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [query, setSearchParams]);

  const movies = data?.results || [];

  return (
    <AnimatedPage>
      <div className="page-container pt-28 pb-16 space-y-8">
        <PageHeader
          title="Search Vault"
          description="Find movies, directors, and actors in our database."
        />

        {/* Big Search Input */}
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cv-text-tertiary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a movie title..."
            className="w-full pl-12 pr-10 py-4 bg-cv-surface border border-cv-border rounded-2xl text-cv-text placeholder-cv-text-tertiary focus:outline-none focus:border-cv-accent text-body-lg shadow-lg"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-cv-text-tertiary hover:text-cv-text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Header */}
        {query.trim() !== '' && (
          <div className="text-sm text-cv-text-secondary font-mono">
            Showing results for <span className="text-cv-text font-semibold">"{query}"</span>
            {movies.length > 0 && ` (${movies.length} matches)`}
          </div>
        )}

        {/* Movie Grid */}
        <MovieGrid movies={movies} isLoading={isLoading} skeletonCount={12} />

        {/* Empty States */}
        {!isLoading && query.trim() !== '' && movies.length === 0 && (
          <EmptyState
            variant="search"
            title="No movies found"
            description={`We couldn't find any films matching "${query}". Try searching for another title.`}
          />
        )}

        {!query && (
          <EmptyState
            variant="search"
            title="Start Searching"
            description="Type a movie title in the search box above or press ⌘K anywhere."
          />
        )}
      </div>
    </AnimatedPage>
  );
}
