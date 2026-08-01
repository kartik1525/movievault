import { AnimatedPage } from '@/components/common/animated-page';
import { Film } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/animations/variants';
import { APP_NAME, APP_TAGLINE } from '@/config/constants';

export default function AboutPage() {
  return (
    <AnimatedPage>
      <div className="page-container pt-28 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center py-16"
        >
          <motion.div variants={staggerItem} className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-cv-accent-muted flex items-center justify-center">
              <Film className="w-10 h-10 text-cv-accent" />
            </div>
          </motion.div>

          <motion.h1 variants={staggerItem} className="text-display text-cv-text mb-4">
            {APP_NAME}
          </motion.h1>

          <motion.p variants={staggerItem} className="text-h3 text-cv-text-secondary mb-8">
            {APP_TAGLINE}
          </motion.p>

          <motion.div variants={staggerItem} className="text-body text-cv-text-secondary leading-relaxed space-y-4">
            <p>
              CineVault is a premium movie discovery platform built for film lovers.
              Explore thousands of movies, watch trailers, curate your personal collection,
              and share your thoughts with the community.
            </p>
            <p>
              Powered by The Movie Database (TMDB) API. Built with React, TypeScript,
              and a passion for cinema.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-12 flex items-center justify-center gap-8">
            {[
              { label: 'Movies', value: '800K+' },
              { label: 'Genres', value: '19' },
              { label: 'Updated', value: 'Daily' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-2xl font-bold text-cv-text">{stat.value}</div>
                <div className="text-caption text-cv-text-tertiary mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
