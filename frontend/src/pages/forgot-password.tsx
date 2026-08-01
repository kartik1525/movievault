import { AnimatedPage } from '@/components/common/animated-page';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Film } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <AnimatedPage className="flex items-center justify-center pt-28 pb-16 min-h-[85vh]">
      <div className="w-full max-w-md page-container">
        <div className="bg-cv-surface border border-cv-border rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cv-accent/15 flex items-center justify-center mx-auto mb-4">
              <Film className="w-6 h-6 text-cv-accent" />
            </div>
            <h1 className="text-h2 text-cv-text font-heading">Reset Password</h1>
            <p className="text-body-sm text-cv-text-secondary">
              Enter the email address associated with your account to receive a reset link.
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </AnimatedPage>
  );
}
