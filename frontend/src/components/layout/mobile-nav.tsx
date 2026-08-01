import { motion } from 'framer-motion';
import { NavLink } from 'react-router';
import { Home, Compass, TrendingUp, Star, Clock, Grid3X3, Heart, List, MessageSquare, User, Settings, Info } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { cn } from '@/utils/cn';
import { slideInRight, backdropVariants } from '@/animations/variants';
import { useUIStore } from '@/store/ui-store';

const MOBILE_LINKS = [
  { label: 'Home', path: ROUTES.HOME, icon: Home },
  { label: 'Discover', path: ROUTES.DISCOVER, icon: Compass },
  { label: 'Trending', path: ROUTES.TRENDING, icon: TrendingUp },
  { label: 'Popular', path: ROUTES.POPULAR, icon: Star },
  { label: 'Top Rated', path: ROUTES.TOP_RATED, icon: Star },
  { label: 'Upcoming', path: ROUTES.UPCOMING, icon: Clock },
  { label: 'Genres', path: ROUTES.GENRES, icon: Grid3X3 },
  { divider: true, label: 'divider-1' },
  { label: 'Favorites', path: ROUTES.FAVORITES, icon: Heart },
  { label: 'Watchlist', path: ROUTES.WATCHLIST, icon: List },
  { label: 'Reviews', path: ROUTES.REVIEWS, icon: MessageSquare },
  { divider: true, label: 'divider-2' },
  { label: 'Profile', path: ROUTES.PROFILE, icon: User },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
  { label: 'About', path: ROUTES.ABOUT, icon: Info },
] as const;

export function MobileNav() {
  const { setMobileNavOpen } = useUIStore();

  return (
    <>
      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[calc(var(--z-header)-1)] lg:hidden"
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.nav
        variants={slideInRight}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          'fixed top-0 right-0 bottom-0 w-72 z-[var(--z-header)]',
          'bg-cv-bg-secondary border-l border-cv-border',
          'overflow-y-auto lg:hidden'
        )}
        aria-label="Mobile navigation"
      >
        <div className="pt-20 pb-8 px-4">
          <div className="flex flex-col gap-0.5">
            {MOBILE_LINKS.map((link) => {
              if ('divider' in link && link.divider) {
                return (
                  <div key={link.label} className="h-px bg-cv-border my-3 mx-2" />
                );
              }
              const Icon = 'icon' in link ? link.icon : Home;
              return (
                <NavLink
                  key={link.label}
                  to={'path' in link ? link.path : '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200',
                      isActive
                        ? 'bg-cv-surface text-cv-text'
                        : 'text-cv-text-secondary hover:text-cv-text hover:bg-cv-surface/50'
                    )
                  }
                >
                  <Icon className="w-4.5 h-4.5" />
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
