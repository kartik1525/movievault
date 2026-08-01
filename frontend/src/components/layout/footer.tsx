import { Link } from 'react-router';
import { Film, Heart } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { APP_NAME } from '@/config/constants';

const FOOTER_LINKS = {
  discover: [
    { label: 'Trending', path: ROUTES.TRENDING },
    { label: 'Popular', path: ROUTES.POPULAR },
    { label: 'Top Rated', path: ROUTES.TOP_RATED },
    { label: 'Upcoming', path: ROUTES.UPCOMING },
    { label: 'Genres', path: ROUTES.GENRES },
  ],
  account: [
    { label: 'Favorites', path: ROUTES.FAVORITES },
    { label: 'Watchlist', path: ROUTES.WATCHLIST },
    { label: 'Reviews', path: ROUTES.REVIEWS },
    { label: 'Profile', path: ROUTES.PROFILE },
    { label: 'Settings', path: ROUTES.SETTINGS },
  ],
  about: [
    { label: 'About', path: ROUTES.ABOUT },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-cv-border mt-24" role="contentinfo">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Film className="w-5 h-5 text-cv-accent" />
              <span className="font-heading text-lg font-bold tracking-tight">
                Cine<span className="text-cv-accent">Vault</span>
              </span>
            </Link>
            <p className="text-sm text-cv-text-secondary leading-relaxed max-w-[280px]">
              Your personal cinema companion. Discover films, curate your collection, and share your thoughts.
            </p>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-label text-cv-text-tertiary mb-4">Discover</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.discover.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cv-text-secondary hover:text-cv-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-label text-cv-text-tertiary mb-4">Account</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.account.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cv-text-secondary hover:text-cv-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-label text-cv-text-tertiary mb-4">About</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cv-text-secondary hover:text-cv-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-cv-border">
          <p className="text-caption text-cv-text-tertiary">
            © {new Date().getFullYear()} {APP_NAME}. Powered by TMDB.
          </p>
          <p className="text-caption text-cv-text-tertiary flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-cv-accent fill-cv-accent" /> for film lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
