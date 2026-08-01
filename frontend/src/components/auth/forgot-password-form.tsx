import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { resetPassword } from '@/services/auth-service';
import { ROUTES } from '@/config/routes';
import { Mail, ArrowRight, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [authError, setAuthError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    setAuthError(null);
    setSuccess(false);
    try {
      await resetPassword(data.email);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send reset link. Please try again.';
      setAuthError(message.replace('Firebase: ', ''));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      {success && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-cv-success-muted border border-cv-success/30 text-cv-success text-xs font-medium">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>Password reset email sent! Check your inbox.</span>
        </div>
      )}

      {authError && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-cv-accent/15 border border-cv-accent/30 text-cv-accent text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-cv-text-secondary">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-tertiary" />
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 bg-cv-surface border border-cv-border rounded-xl text-sm text-cv-text placeholder-cv-text-tertiary focus:outline-none focus:border-cv-accent transition-colors"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-cv-accent">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-cv-accent text-white text-sm font-semibold rounded-xl hover:bg-cv-accent-hover transition-all duration-200 shadow-lg shadow-cv-accent/20 disabled:opacity-60 cursor-pointer mt-2"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Send Reset Link
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-cv-text-tertiary pt-4">
        Remembered your password?{' '}
        <Link to={ROUTES.LOGIN} className="text-cv-text font-semibold hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
