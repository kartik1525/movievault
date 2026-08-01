const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';
export type ProfileSize = 'w45' | 'w185' | 'h632' | 'original';

/** Build a TMDB poster image URL */
export function getPosterUrl(path: string | null | undefined, size: PosterSize = 'w500'): string {
  if (!path) return '/placeholder-poster.svg';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

/** Build a TMDB backdrop image URL */
export function getBackdropUrl(path: string | null | undefined, size: BackdropSize = 'w1280'): string {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

/** Build a TMDB profile image URL */
export function getProfileUrl(path: string | null | undefined, size: ProfileSize = 'w185'): string {
  if (!path) return '/placeholder-avatar.svg';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

/** Generate srcset for responsive poster images */
export function getPosterSrcSet(path: string | null | undefined): string {
  if (!path) return '';
  const sizes: PosterSize[] = ['w185', 'w342', 'w500', 'w780'];
  return sizes
    .map((size) => {
      const width = parseInt(size.replace('w', ''));
      return `${TMDB_IMAGE_BASE}/${size}${path} ${width}w`;
    })
    .join(', ');
}

/** Generate srcset for responsive backdrop images */
export function getBackdropSrcSet(path: string | null | undefined): string {
  if (!path) return '';
  const sizes: BackdropSize[] = ['w300', 'w780', 'w1280'];
  return sizes
    .map((size) => {
      const width = parseInt(size.replace('w', ''));
      return `${TMDB_IMAGE_BASE}/${size}${path} ${width}w`;
    })
    .join(', ');
}
