import { useEffect, useCallback } from 'react';

/** Register a global keyboard shortcut. Handles Ctrl/Cmd key automatically. */
export function useKeyboard(key: string, callback: () => void, options?: { ctrl?: boolean; meta?: boolean }) {
  const { ctrl = false, meta = false } = options ?? {};

  const handler = useCallback(
    (e: KeyboardEvent) => {
      const needsModifier = ctrl || meta;
      const hasModifier = e.ctrlKey || e.metaKey;

      if (needsModifier && !hasModifier) return;
      if (!needsModifier && hasModifier) return;

      if (e.key.toLowerCase() === key.toLowerCase()) {
        // Don't capture if user is typing in an input
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
          return;
        }

        e.preventDefault();
        callback();
      }
    },
    [key, callback, ctrl, meta]
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}
