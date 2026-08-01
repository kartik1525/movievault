import { backendClient } from './axios';
import type { FavoriteItem, WatchlistItem, BackendResponse } from '@/types/api';
import type { Review, ReviewFormData } from '@/types/review';
import type { UserProfile } from '@/types/user';

// ── Auth ──
export async function syncUser() {
  const { data } = await backendClient.post<BackendResponse<UserProfile>>('/auth/sync');
  return data.data;
}

// ── User ──
export async function getProfile() {
  const { data } = await backendClient.get<BackendResponse<UserProfile>>('/users/me');
  return data.data;
}

export async function updateProfile(updates: Partial<UserProfile>) {
  const { data } = await backendClient.put<BackendResponse<UserProfile>>('/users/me', updates);
  return data.data;
}

// ── Favorites ──
export async function getFavorites() {
  const { data } = await backendClient.get<BackendResponse<FavoriteItem[]>>('/favorites');
  return data.data;
}

export async function addFavorite(movie: { movieId: number; movieTitle: string; posterPath: string | null }) {
  const { data } = await backendClient.post<BackendResponse<FavoriteItem>>('/favorites', movie);
  return data.data;
}

export async function removeFavorite(movieId: number) {
  await backendClient.delete(`/favorites/${movieId}`);
}

export async function checkFavorite(movieId: number) {
  const { data } = await backendClient.get<BackendResponse<{ isFavorite: boolean }>>(`/favorites/check/${movieId}`);
  return data.data.isFavorite;
}

// ── Watchlist ──
export async function getWatchlist() {
  const { data } = await backendClient.get<BackendResponse<WatchlistItem[]>>('/watchlist');
  return data.data;
}

export async function addToWatchlist(movie: { movieId: number; movieTitle: string; posterPath: string | null }) {
  const { data } = await backendClient.post<BackendResponse<WatchlistItem>>('/watchlist', movie);
  return data.data;
}

export async function updateWatchlistItem(movieId: number, watched: boolean) {
  const { data } = await backendClient.put<BackendResponse<WatchlistItem>>(`/watchlist/${movieId}`, { watched });
  return data.data;
}

export async function removeFromWatchlist(movieId: number) {
  await backendClient.delete(`/watchlist/${movieId}`);
}

// ── Reviews ──
export async function getMovieReviews(movieId: number) {
  const { data } = await backendClient.get<BackendResponse<Review[]>>(`/reviews/movie/${movieId}`);
  return data.data;
}

export async function getUserReviews() {
  const { data } = await backendClient.get<BackendResponse<Review[]>>('/reviews/user');
  return data.data;
}

export async function createReview(review: ReviewFormData) {
  const { data } = await backendClient.post<BackendResponse<Review>>('/reviews', review);
  return data.data;
}

export async function updateReview(reviewId: string, updates: Partial<ReviewFormData>) {
  const { data } = await backendClient.put<BackendResponse<Review>>(`/reviews/${reviewId}`, updates);
  return data.data;
}

export async function deleteReview(reviewId: string) {
  await backendClient.delete(`/reviews/${reviewId}`);
}
