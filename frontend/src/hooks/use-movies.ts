import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import * as tmdb from '@/api/tmdb';

/** Trending movies */
export function useTrending(timeWindow: 'day' | 'week' = 'week') {
  return useQuery({
    queryKey: ['trending', timeWindow],
    queryFn: () => tmdb.getTrending(timeWindow),
  });
}

/** Popular movies */
export function usePopular() {
  return useQuery({
    queryKey: ['popular'],
    queryFn: () => tmdb.getPopular(),
  });
}

/** Top rated movies */
export function useTopRated() {
  return useQuery({
    queryKey: ['topRated'],
    queryFn: () => tmdb.getTopRated(),
  });
}

/** Upcoming movies */
export function useUpcoming() {
  return useQuery({
    queryKey: ['upcoming'],
    queryFn: () => tmdb.getUpcoming(),
  });
}

/** Now playing */
export function useNowPlaying() {
  return useQuery({
    queryKey: ['nowPlaying'],
    queryFn: () => tmdb.getNowPlaying(),
  });
}

/** Movie details */
export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => tmdb.getMovieDetails(movieId),
    enabled: !!movieId,
  });
}

/** Movie credits */
export function useMovieCredits(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => tmdb.getMovieCredits(movieId),
    enabled: !!movieId,
  });
}

/** Movie videos */
export function useMovieVideos(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => tmdb.getMovieVideos(movieId),
    enabled: !!movieId,
  });
}

/** Movie images */
export function useMovieImages(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'images'],
    queryFn: () => tmdb.getMovieImages(movieId),
    enabled: !!movieId,
  });
}

/** Similar movies */
export function useSimilarMovies(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'similar'],
    queryFn: () => tmdb.getSimilarMovies(movieId),
    enabled: !!movieId,
  });
}

/** Recommendations */
export function useRecommendations(movieId: number) {
  return useQuery({
    queryKey: ['movie', movieId, 'recommendations'],
    queryFn: () => tmdb.getRecommendations(movieId),
    enabled: !!movieId,
  });
}

/** Genres list */
export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => tmdb.getGenres(),
    staleTime: 24 * 60 * 60 * 1000, // Genres rarely change
  });
}

/** Movies by genre — infinite scroll */
export function useGenreMovies(genreId: number, sortBy = 'popularity.desc') {
  return useInfiniteQuery({
    queryKey: ['genre', genreId, sortBy],
    queryFn: ({ pageParam = 1 }) => tmdb.discoverByGenre(genreId, pageParam, sortBy),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !!genreId,
  });
}

/** Discover movies — infinite scroll */
export function useDiscoverMovies(params: Parameters<typeof tmdb.discoverMovies>[0]) {
  return useInfiniteQuery({
    queryKey: ['discover', params],
    queryFn: ({ pageParam = 1 }) => tmdb.discoverMovies({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}

/** Category page — infinite scroll */
export function useCategoryMovies(category: 'trending' | 'popular' | 'top_rated' | 'upcoming' | 'now_playing') {
  const fetchers = {
    trending: tmdb.getTrending,
    popular: tmdb.getPopular,
    top_rated: tmdb.getTopRated,
    upcoming: tmdb.getUpcoming,
    now_playing: tmdb.getNowPlaying,
  };

  return useInfiniteQuery({
    queryKey: [category, 'infinite'],
    queryFn: ({ pageParam = 1 }) => {
      if (category === 'trending') {
        return tmdb.getTrending('week', pageParam);
      }
      return fetchers[category](pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}
