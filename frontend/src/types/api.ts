import type { Movie } from './movie';

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type TMDBMovieResponse = TMDBResponse<Movie>;

export interface BackendResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface BackendError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FavoriteItem {
  _id: string;
  userId: string;
  movieId: number;
  movieTitle: string;
  posterPath: string | null;
  addedAt: string;
}

export interface WatchlistItem {
  _id: string;
  userId: string;
  movieId: number;
  movieTitle: string;
  posterPath: string | null;
  watched: boolean;
  addedAt: string;
}
