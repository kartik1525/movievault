import { create } from 'zustand';

interface UIStore {
  /** Whether the mobile navigation is open */
  isMobileNavOpen: boolean;
  /** Whether the search modal is open */
  isSearchOpen: boolean;
  /** Whether the header should be transparent (hero pages) */
  isHeaderTransparent: boolean;
  /** Current scroll position */
  scrollY: number;

  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setHeaderTransparent: (transparent: boolean) => void;
  setScrollY: (y: number) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileNavOpen: false,
  isSearchOpen: false,
  isHeaderTransparent: false,
  scrollY: 0,

  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setHeaderTransparent: (transparent) => set({ isHeaderTransparent: transparent }),
  setScrollY: (y) => set({ scrollY: y }),
}));
