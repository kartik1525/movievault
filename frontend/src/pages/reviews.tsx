import { useState } from 'react';
import { AnimatedPage } from '@/components/common/animated-page';
import { PageHeader } from '@/components/common/page-header';
import { EmptyState } from '@/components/common/empty-state';
import { useAuth } from '@/context/auth-context';
import { Link } from 'react-router';
import { ROUTES } from '@/config/routes';
import type { Review } from '@/types/review';

export default function ReviewsPage() {
  const { user } = useAuth();
  const [reviews] = useState<Review[]>([]);

  return (
    <AnimatedPage>
      <div className="page-container pt-28 pb-16 space-y-8">
        <PageHeader
          title="Your Film Reviews"
          description="Log, critique, and rate the movies you've watched."
        />

        {!user ? (
          <EmptyState
            title="Sign in to view your reviews"
            description="Create an account or sign in to write and manage movie reviews."
            action={
              <Link
                to={ROUTES.LOGIN}
                className="px-6 py-3 bg-cv-accent text-white font-semibold text-sm rounded-xl shadow-lg hover:bg-cv-accent-hover transition-colors"
              >
                Sign In
              </Link>
            }
          />
        ) : reviews.length === 0 ? (
          <EmptyState
            title="No reviews logged yet"
            description="Visit any movie detail page to leave your rating and review."
            action={
              <Link
                to={ROUTES.DISCOVER}
                className="px-6 py-3 bg-cv-surface border border-cv-border text-cv-text font-semibold text-sm rounded-xl hover:border-cv-border-hover transition-colors"
              >
                Find Movies to Review
              </Link>
            }
          />
        ) : (
          <div className="space-y-4 max-w-3xl">
            {/* Reviews list */}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
