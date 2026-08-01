import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/context/auth-context';
import { ROUTES } from '@/config/routes';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cv-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-cv-accent border-t-transparent animate-spin" />
          <span className="text-xs text-cv-text-tertiary font-mono">Verifying Session...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
