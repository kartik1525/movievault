import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchStore {
  /** Recent search terms, most recent first */
  recentSearches: string[];
  /** Add a search term to recent history */
  addRecentSearch: (term: string) => void;
  /** Remove a specific search term */
  removeRecentSearch: (term: string) => void;
  /** Clear all recent searches */
  clearRecentSearches: () => void;
}

const MAX_RECENT = 10;

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      recentSearches: [],

      addRecentSearch: (term) =>
        set((state) => {
          const filtered = state.recentSearches.filter((s) => s !== term);
          return {
            recentSearches: [term, ...filtered].slice(0, MAX_RECENT),
          };
        }),

      removeRecentSearch: (term) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((s) => s !== term),
        })),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'cinevault-search',
    }
  )
);
