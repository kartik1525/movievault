import type { Transition } from 'framer-motion';

/** Standard easing for most animations */
export const easeDefault: Transition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94],
};

/** Smooth easing for emphasis */
export const easeSmooth: Transition = {
  duration: 0.6,
  ease: [0.43, 0.13, 0.23, 0.96],
};

/** Quick snap for micro-interactions */
export const easeSnap: Transition = {
  duration: 0.2,
  ease: [0.25, 0.46, 0.45, 0.94],
};

/** Spring for playful but controlled movement */
export const springGentle: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 0.8,
};

/** Spring for quick, responsive interactions */
export const springResponsive: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.5,
};

/** Slow cinematic transition */
export const easeCinematic: Transition = {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96],
};
