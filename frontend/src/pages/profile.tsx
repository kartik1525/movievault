import { useAuth } from '@/context/auth-context';
import { AnimatedPage } from '@/components/common/animated-page';
import { logoutUser } from '@/services/auth-service';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '@/config/routes';
import { User, LogOut, Heart, List, MessageSquare, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate(ROUTES.HOME);
  };

  if (!user) {
    return (
      <AnimatedPage>
        <div className="page-container pt-28 pb-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-2xl bg-cv-surface border border-cv-border flex items-center justify-center mb-6">
            <User className="w-10 h-10 text-cv-text-tertiary" />
          </div>
          <h2 className="text-h2 text-cv-text mb-2">Access Your Profile</h2>
          <p className="text-body text-cv-text-secondary max-w-sm mb-8">
            Sign in to view your account details, saved movies, and personal cinema statistics.
          </p>
          <div className="flex gap-4">
            <Link
              to={ROUTES.LOGIN}
              className="px-6 py-3 bg-cv-accent text-white font-semibold text-sm rounded-xl shadow-lg hover:bg-cv-accent-hover transition-colors"
            >
              Sign In
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="px-6 py-3 bg-cv-surface border border-cv-border text-cv-text font-semibold text-sm rounded-xl hover:border-cv-border-hover transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="page-container pt-28 pb-16 space-y-8 max-w-4xl">
        {/* Profile Card Header */}
        <div className="bg-cv-surface border border-cv-border rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xl">
          <div className="w-24 h-24 rounded-full bg-cv-card border-2 border-cv-accent flex items-center justify-center text-cv-accent font-bold text-3xl font-mono flex-shrink-0">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h1 className="text-h1 text-cv-text">{user.displayName || 'Cinema Member'}</h1>
            <p className="text-body-sm text-cv-text-secondary">{user.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cv-card border border-cv-border text-xs text-cv-text-tertiary font-mono">
                <Shield className="w-3.5 h-3.5 text-cv-gold" />
                Verified Member
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 bg-cv-card border border-cv-border rounded-xl text-xs font-semibold text-cv-text-secondary hover:text-cv-accent hover:border-cv-accent/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Quick Links / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to={ROUTES.FAVORITES}
            className="bg-cv-surface border border-cv-border hover:border-cv-border-hover p-6 rounded-2xl flex items-center gap-4 transition-all group"
          >
            <div className="p-3 rounded-xl bg-cv-accent/15 text-cv-accent">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-cv-text group-hover:text-cv-accent transition-colors">
                Favorites
              </h3>
              <p className="text-xs text-cv-text-tertiary">View saved films</p>
            </div>
          </Link>

          <Link
            to={ROUTES.WATCHLIST}
            className="bg-cv-surface border border-cv-border hover:border-cv-border-hover p-6 rounded-2xl flex items-center gap-4 transition-all group"
          >
            <div className="p-3 rounded-xl bg-cv-gold/15 text-cv-gold">
              <List className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-cv-text group-hover:text-cv-gold transition-colors">
                Watchlist
              </h3>
              <p className="text-xs text-cv-text-tertiary">Manage queued films</p>
            </div>
          </Link>

          <Link
            to={ROUTES.REVIEWS}
            className="bg-cv-surface border border-cv-border hover:border-cv-border-hover p-6 rounded-2xl flex items-center gap-4 transition-all group"
          >
            <div className="p-3 rounded-xl bg-cv-surface text-cv-text-secondary">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-cv-text transition-colors">Reviews</h3>
              <p className="text-xs text-cv-text-tertiary">Your logged critiques</p>
            </div>
          </Link>
        </div>
      </div>
    </AnimatedPage>
  );
}
