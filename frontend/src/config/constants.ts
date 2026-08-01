/** TMDB API Configuration */
export const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
export const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

/** Backend API Configuration */
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/** App metadata */
export const APP_NAME = 'CineVault';
export const APP_TAGLINE = 'Discover. Watch. Remember.';
export const APP_DESCRIPTION =
  'CineVault is a premium movie discovery platform where you can explore films, watch trailers, save favorites, and share reviews.';

/** TMDB genre ID → name mapping (cached to avoid API calls) */
export const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

/** Genre visual config for cards */
export const GENRE_GRADIENTS: Record<number, string> = {
  28: 'from-red-900/80 to-orange-900/60',
  12: 'from-amber-900/80 to-yellow-900/60',
  16: 'from-violet-900/80 to-fuchsia-900/60',
  35: 'from-yellow-900/80 to-amber-900/60',
  80: 'from-slate-900/80 to-zinc-900/60',
  99: 'from-teal-900/80 to-cyan-900/60',
  18: 'from-blue-900/80 to-indigo-900/60',
  10751: 'from-green-900/80 to-emerald-900/60',
  14: 'from-purple-900/80 to-violet-900/60',
  36: 'from-stone-900/80 to-amber-900/60',
  27: 'from-gray-900/80 to-red-950/60',
  10402: 'from-pink-900/80 to-rose-900/60',
  9648: 'from-indigo-900/80 to-slate-900/60',
  10749: 'from-rose-900/80 to-pink-900/60',
  878: 'from-cyan-900/80 to-blue-900/60',
  10770: 'from-neutral-900/80 to-stone-900/60',
  53: 'from-zinc-900/80 to-gray-900/60',
  10752: 'from-olive-900/80 to-stone-900/60',
  37: 'from-orange-900/80 to-amber-950/60',
};

/** Debounce delay for search (ms) */
export const SEARCH_DEBOUNCE_MS = 350;

/** Number of items per page for infinite scroll */
export const ITEMS_PER_PAGE = 20;

/** Keyboard shortcut mappings */
export const SHORTCUTS = {
  SEARCH: 'k',
  HOME: 'h',
  FAVORITES: 'f',
  WATCHLIST: 'w',
} as const;
