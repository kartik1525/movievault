import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginUser } from '@/services/auth-service';
import { ROUTES } from '@/config/routes';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setAuthError(null);
    try {
      await loginUser(data.email, data.password);
      navigate(ROUTES.HOME);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setAuthError(message.replace('Firebase: ', ''));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      {authError && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-cv-accent/15 border border-cv-accent/30 text-cv-accent text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-cv-text-secondary">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-tertiary" />
          <input
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3.5 bg-cv-surface border border-cv-border rounded-xl text-sm text-cv-text placeholder-cv-text-tertiary focus:outline-none focus:border-cv-accent focus:shadow-[0_0_15px_rgba(200,16,46,0.15)] transition-all duration-200"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-cv-accent">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-cv-text-secondary">Password</label>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-xs text-cv-accent hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-tertiary" />
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3.5 bg-cv-surface border border-cv-border rounded-xl text-sm text-cv-text placeholder-cv-text-tertiary focus:outline-none focus:border-cv-accent focus:shadow-[0_0_15px_rgba(200,16,46,0.15)] transition-all duration-200"
          />
        </div>
        {errors.password && (
          <p className="text-xs text-cv-accent">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-cv-accent text-white text-sm font-semibold rounded-xl hover:bg-cv-accent-hover transition-all duration-200 shadow-lg shadow-cv-accent/20 disabled:opacity-60 cursor-pointer mt-2"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Sign In
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Switch to Register */}
      <p className="text-center text-xs text-cv-text-tertiary pt-4">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="text-cv-text font-semibold hover:underline">
          Create one now
        </Link>
      </p>
    </form>
  );
}
