import { lazy, Suspense } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';
import { RootLayout } from '@/layouts/root-layout';
import { ErrorBoundary } from '@/components/common/error-boundary';
import { DetailSkeleton, HeroSkeleton } from '@/components/common/loading';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/home'));
const Discover = lazy(() => import('@/pages/discover'));
const Trending = lazy(() => import('@/pages/trending'));
const Popular = lazy(() => import('@/pages/popular'));
const TopRated = lazy(() => import('@/pages/top-rated'));
const Upcoming = lazy(() => import('@/pages/upcoming'));
const Genres = lazy(() => import('@/pages/genres'));
const GenreDetail = lazy(() => import('@/pages/genre-detail'));
const MovieDetail = lazy(() => import('@/pages/movie-detail'));
const Search = lazy(() => import('@/pages/search'));
const Favorites = lazy(() => import('@/pages/favorites'));
const Watchlist = lazy(() => import('@/pages/watchlist'));
const Reviews = lazy(() => import('@/pages/reviews'));
const Profile = lazy(() => import('@/pages/profile'));
const Settings = lazy(() => import('@/pages/settings'));
const About = lazy(() => import('@/pages/about'));
const Login = lazy(() => import('@/pages/login'));
const Register = lazy(() => import('@/pages/register'));
const ForgotPassword = lazy(() => import('@/pages/forgot-password'));
const NotFound = lazy(() => import('@/pages/not-found'));

/** Suspense wrapper with appropriate skeleton */
function PageSuspense({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'hero' | 'detail' | 'default' }) {
  const fallback = variant === 'hero' ? <HeroSkeleton /> : variant === 'detail' ? <DetailSkeleton /> : <div className="min-h-screen" />;
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary><div /></ErrorBoundary>,
    children: [
      {
        index: true,
        element: <PageSuspense variant="hero"><Home /></PageSuspense>,
      },
      {
        path: 'discover',
        element: <PageSuspense><Discover /></PageSuspense>,
      },
      {
        path: 'trending',
        element: <PageSuspense><Trending /></PageSuspense>,
      },
      {
        path: 'popular',
        element: <PageSuspense><Popular /></PageSuspense>,
      },
      {
        path: 'top-rated',
        element: <PageSuspense><TopRated /></PageSuspense>,
      },
      {
        path: 'upcoming',
        element: <PageSuspense><Upcoming /></PageSuspense>,
      },
      {
        path: 'genres',
        element: <PageSuspense><Genres /></PageSuspense>,
      },
      {
        path: 'genres/:genreId',
        element: <PageSuspense><GenreDetail /></PageSuspense>,
      },
      {
        path: 'movie/:movieId',
        element: <PageSuspense variant="detail"><MovieDetail /></PageSuspense>,
      },
      {
        path: 'search',
        element: <PageSuspense><Search /></PageSuspense>,
      },
      {
        path: 'favorites',
        element: <PageSuspense><Favorites /></PageSuspense>,
      },
      {
        path: 'watchlist',
        element: <PageSuspense><Watchlist /></PageSuspense>,
      },
      {
        path: 'reviews',
        element: <PageSuspense><Reviews /></PageSuspense>,
      },
      {
        path: 'profile',
        element: <PageSuspense><Profile /></PageSuspense>,
      },
      {
        path: 'settings',
        element: <PageSuspense><Settings /></PageSuspense>,
      },
      {
        path: 'about',
        element: <PageSuspense><About /></PageSuspense>,
      },
      {
        path: 'login',
        element: <PageSuspense><Login /></PageSuspense>,
      },
      {
        path: 'register',
        element: <PageSuspense><Register /></PageSuspense>,
      },
      {
        path: 'forgot-password',
        element: <PageSuspense><ForgotPassword /></PageSuspense>,
      },
      {
        path: '*',
        element: <PageSuspense><NotFound /></PageSuspense>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
