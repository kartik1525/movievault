import { useEffect, useRef, useState } from 'react';

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

/** Observe an element's intersection with viewport */
export function useIntersection(options: UseIntersectionOptions = {}) {
  const { threshold = 0, rootMargin = '0px', root = null } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, root]);

  return { ref, isIntersecting };
}

/** Trigger callback when element enters viewport — useful for infinite scroll */
export function useInfiniteScroll(callback: () => void, enabled = true) {
  const { ref, isIntersecting } = useIntersection({ rootMargin: '200px' });

  useEffect(() => {
    if (isIntersecting && enabled) {
      callback();
    }
  }, [isIntersecting, enabled, callback]);

  return ref;
}
