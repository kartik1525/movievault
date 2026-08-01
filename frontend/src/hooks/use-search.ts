import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/api/tmdb';
import { useDebounce } from './use-debounce';
import { SEARCH_DEBOUNCE_MS } from '@/config/constants';

/** Search movies with debouncing */
export function useSearch(query: string) {
  const debouncedQuery = useDebounce(query.trim(), SEARCH_DEBOUNCE_MS);

  return useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    placeholderData: (previousData) => previousData,
  });
}
