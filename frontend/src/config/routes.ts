export const ROUTES = {
  HOME: '/',
  DISCOVER: '/discover',
  TRENDING: '/trending',
  POPULAR: '/popular',
  TOP_RATED: '/top-rated',
  UPCOMING: '/upcoming',
  GENRES: '/genres',
  GENRE_DETAIL: '/genres/:genreId',
  MOVIE_DETAIL: '/movie/:movieId',
  SEARCH: '/search',
  FAVORITES: '/favorites',
  WATCHLIST: '/watchlist',
  REVIEWS: '/reviews',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

/** Build a dynamic route path */
export function movieRoute(movieId: number | string): string {
  return `/movie/${movieId}`;
}

export function genreRoute(genreId: number | string): string {
  return `/genres/${genreId}`;
}
