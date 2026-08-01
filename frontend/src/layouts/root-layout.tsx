import { Outlet, useLocation, ScrollRestoration } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SearchModal } from '@/components/search/search-modal';

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1" id="main-content">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      <Footer />
      <SearchModal />
      <ScrollRestoration />
    </div>
  );
}
