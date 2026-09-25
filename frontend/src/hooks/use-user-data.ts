import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as backend from '@/api/backend';
import { useAuth } from '@/context/auth-context';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/config/routes';

// ── Favorites ──

export function useFavorites() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => backend.getFavorites(),
    enabled: !!user,
  });
}

export function useCheckFavorite(movieId: number) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => backend.getFavorites(),
    enabled: !!user,
    select: (data) => data?.some((fav) => fav.movieId === movieId) ?? false,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ movieId, movieTitle, posterPath, isFavorite }: { movieId: number; movieTitle: string; posterPath: string | null; isFavorite: boolean }) => {
      if (!user) {
        navigate(ROUTES.LOGIN);
        return Promise.reject(new Error('Must be logged in'));
      }
      if (isFavorite) {
        await backend.removeFavorite(movieId);
      } else {
        await backend.addFavorite({ movieId, movieTitle, posterPath });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

// ── Watchlist ──

export function useWatchlist() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['watchlist'],
    queryFn: () => backend.getWatchlist(),
    enabled: !!user,
  });
}

export function useCheckWatchlist(movieId: number) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['watchlist'],
    queryFn: () => backend.getWatchlist(),
    enabled: !!user,
    select: (data) => {
      const item = data?.find((w) => w.movieId === movieId);
      return { isInWatchlist: !!item, watched: item?.watched ?? false };
    },
  });
}

export function useToggleWatchlist() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ movieId, movieTitle, posterPath, isWatchlisted }: { movieId: number; movieTitle: string; posterPath: string | null; isWatchlisted: boolean }) => {
      if (!user) {
        navigate(ROUTES.LOGIN);
        return Promise.reject(new Error('Must be logged in'));
      }
      if (isWatchlisted) {
        await backend.removeFromWatchlist(movieId);
      } else {
        await backend.addToWatchlist({ movieId, movieTitle, posterPath });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });
}
