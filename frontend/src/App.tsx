import { RouterProvider } from 'react-router';
import { QueryProvider } from '@/providers/query-provider';
import { AuthProvider } from '@/context/auth-context';
import { ErrorBoundary } from '@/components/common/error-boundary';
import { router } from '@/routes';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
