import { tmdbClient } from './axios';
import type { MovieDetails, Credits, Video, MovieImage, Genre } from '@/types/movie';
import type { TMDBMovieResponse } from '@/types/api';

/** Trending movies */
export async function getTrending(timeWindow: 'day' | 'week' = 'week', page = 1) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>(
    `/trending/movie/${timeWindow}`,
    { params: { page } }
  );
  return data;
}

/** Popular movies */
export async function getPopular(page = 1) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>('/movie/popular', {
    params: { page },
  });
  return data;
}

/** Top rated movies */
export async function getTopRated(page = 1) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>('/movie/top_rated', {
    params: { page },
  });
  return data;
}

/** Upcoming movies */
export async function getUpcoming(page = 1) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>('/movie/upcoming', {
    params: { page },
  });
  return data;
}

/** Now playing */
export async function getNowPlaying(page = 1) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>('/movie/now_playing', {
    params: { page },
  });
  return data;
}

/** Movie details */
export async function getMovieDetails(movieId: number) {
  const { data } = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`);
  return data;
}

/** Movie credits (cast & crew) */
export async function getMovieCredits(movieId: number) {
  const { data } = await tmdbClient.get<Credits>(`/movie/${movieId}/credits`);
  return data;
}

/** Movie videos (trailers, teasers) */
export async function getMovieVideos(movieId: number) {
  const { data } = await tmdbClient.get<{ results: Video[] }>(`/movie/${movieId}/videos`);
  return data.results;
}

/** Movie images */
export async function getMovieImages(movieId: number) {
  const { data } = await tmdbClient.get<{ backdrops: MovieImage[]; posters: MovieImage[] }>(
    `/movie/${movieId}/images`
  );
  return data;
}

/** Similar movies */
export async function getSimilarMovies(movieId: number, page = 1) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>(`/movie/${movieId}/similar`, {
    params: { page },
  });
  return data;
}

/** Recommended movies */
export async function getRecommendations(movieId: number, page = 1) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>(`/movie/${movieId}/recommendations`, {
    params: { page },
  });
  return data;
}

/** Search movies */
export async function searchMovies(query: string, page = 1) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>('/search/movie', {
    params: { query, page },
  });
  return data;
}

/** Get genre list */
export async function getGenres() {
  const { data } = await tmdbClient.get<{ genres: Genre[] }>('/genre/movie/list');
  return data.genres;
}

/** Discover movies by genre */
export async function discoverByGenre(
  genreId: number,
  page = 1,
  sortBy = 'popularity.desc'
) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
      sort_by: sortBy,
    },
  });
  return data;
}

/** Discover movies with filters */
export async function discoverMovies(params: {
  page?: number;
  sort_by?: string;
  with_genres?: string;
  primary_release_year?: number;
  'vote_average.gte'?: number;
}) {
  const { data } = await tmdbClient.get<TMDBMovieResponse>('/discover/movie', {
    params,
  });
  return data;
}
