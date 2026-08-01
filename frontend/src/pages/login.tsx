import { AnimatedPage } from '@/components/common/animated-page';
import { LoginForm } from '@/components/auth/login-form';
import { Film } from 'lucide-react';
import { APP_NAME } from '@/config/constants';

export default function LoginPage() {
  return (
    <AnimatedPage className="relative flex items-center justify-center pt-28 pb-16 min-h-[85vh] overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-cv-accent/8 rounded-full blur-[80px] -z-10" />

      <div className="w-full max-w-md page-container">
        <div className="relative glass border border-cv-border/50 rounded-2xl p-10 md:p-12 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cv-accent/15 flex items-center justify-center mx-auto mb-4">
              <Film className="w-6 h-6 text-cv-accent" />
            </div>
            <h1 className="text-h2 text-cv-text font-heading">Welcome back to {APP_NAME}</h1>
            <p className="text-body-sm text-cv-text-secondary">
              Enter your credentials to access your saved movies and reviews.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </AnimatedPage>
  );
}
