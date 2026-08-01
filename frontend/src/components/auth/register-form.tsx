import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerUser } from '@/services/auth-service';
import { ROUTES } from '@/config/routes';
import { Lock, Mail, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

const registerSchema = z
  .object({
    displayName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setAuthError(null);
    try {
      await registerUser(data.email, data.password, data.displayName);
      navigate(ROUTES.HOME);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
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

      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-cv-text-secondary">Full Name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-tertiary" />
          <input
            {...register('displayName')}
            type="text"
            placeholder="Jane Doe"
            className="w-full pl-10 pr-4 py-3.5 bg-cv-surface border border-cv-border rounded-xl text-sm text-cv-text placeholder-cv-text-tertiary focus:outline-none focus:border-cv-accent focus:shadow-[0_0_15px_rgba(200,16,46,0.15)] transition-all duration-200"
          />
        </div>
        {errors.displayName && (
          <p className="text-xs text-cv-accent">{errors.displayName.message}</p>
        )}
      </div>

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
        <label className="text-xs font-medium text-cv-text-secondary">Password</label>
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

      {/* Confirm Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-cv-text-secondary">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-text-tertiary" />
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3.5 bg-cv-surface border border-cv-border rounded-xl text-sm text-cv-text placeholder-cv-text-tertiary focus:outline-none focus:border-cv-accent focus:shadow-[0_0_15px_rgba(200,16,46,0.15)] transition-all duration-200"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-cv-accent">{errors.confirmPassword.message}</p>
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
            Create Account
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Switch to Login */}
      <p className="text-center text-xs text-cv-text-tertiary pt-4">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-cv-text font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
