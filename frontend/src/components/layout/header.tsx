import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Menu, X, User, Film } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/utils/cn';
import { MobileNav } from './mobile-nav';

const NAV_LINKS = [
  { label: 'Discover', path: ROUTES.DISCOVER },
  { label: 'Trending', path: ROUTES.TRENDING },
  { label: 'Popular', path: ROUTES.POPULAR },
  { label: 'Top Rated', path: ROUTES.TOP_RATED },
  { label: 'Genres', path: ROUTES.GENRES },
];

export function Header() {
  const location = useLocation();
  const { setSearchOpen, isMobileNavOpen, setMobileNavOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  // Transparent on home page hero, solid once scrolled
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, setMobileNavOpen]);

  const handleSearchOpen = useCallback(() => {
    setSearchOpen(true);
  }, [setSearchOpen]);

  const showBackground = scrolled || !isHomePage;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-300',
          showBackground
            ? 'glass border-b border-[var(--color-cv-border)]'
            : 'bg-transparent'
        )}
      >
        <div className="page-container">
          <nav className="flex items-center justify-between h-16 md:h-18" aria-label="Main navigation">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              aria-label="CineVault Home"
            >
              <div className="relative flex items-center justify-center w-8 h-8">
                <Film className="w-6 h-6 text-cv-accent transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-cv-text">
                Cine<span className="text-cv-accent">Vault</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      'relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-lg',
                      isActive
                        ? 'text-cv-text'
                        : 'text-cv-text-secondary hover:text-cv-text'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute inset-0 bg-cv-surface/60 rounded-lg -z-10"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                onClick={handleSearchOpen}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm text-cv-text-secondary',
                  'rounded-lg border border-cv-border hover:border-cv-border-hover',
                  'hover:text-cv-text transition-all duration-200',
                  'hidden sm:flex'
                )}
                aria-label="Search movies"
              >
                <Search className="w-4 h-4" />
                <span className="text-cv-text-tertiary">Search</span>
                <kbd className="ml-2 px-1.5 py-0.5 text-[10px] font-mono text-cv-text-tertiary bg-cv-surface rounded border border-cv-border">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile search */}
              <button
                onClick={handleSearchOpen}
                className="sm:hidden p-2 text-cv-text-secondary hover:text-cv-text transition-colors rounded-lg"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Favorites */}
              <Link
                to={ROUTES.FAVORITES}
                className="hidden md:flex p-2 text-cv-text-secondary hover:text-cv-text transition-colors rounded-lg"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Profile / Auth */}
              <Link
                to={ROUTES.PROFILE}
                className="hidden md:flex p-2 text-cv-text-secondary hover:text-cv-text transition-colors rounded-lg"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileNavOpen(!isMobileNavOpen)}
                className="lg:hidden p-2 text-cv-text-secondary hover:text-cv-text transition-colors rounded-lg"
                aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileNavOpen}
              >
                {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileNavOpen && <MobileNav />}
      </AnimatePresence>
    </>
  );
}
