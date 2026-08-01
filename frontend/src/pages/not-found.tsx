import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Film, ArrowLeft } from 'lucide-react';
import { fadeInUp } from '@/animations/variants';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-cv-surface border border-cv-border flex items-center justify-center">
            <Film className="w-10 h-10 text-cv-text-tertiary" />
          </div>
        </div>

        <div className="font-mono text-7xl font-bold text-cv-text-tertiary mb-4">
          404
        </div>

        <h1 className="text-h2 text-cv-text mb-3">
          Scene not found
        </h1>

        <p className="text-body text-cv-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to the show.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cv-accent text-white text-sm font-semibold rounded-xl hover:bg-cv-accent-hover transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
