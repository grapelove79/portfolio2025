import { create } from 'zustand';

const useAppStore = create((set) => ({
  isHeaderHidden: false,
  setHeaderHidden: (value) => set({ isHeaderHidden: value }),

  isScrollDisabled: false,
  setScrollDisabled: (value) => set({ isScrollDisabled: value }),
}));

export default useAppStore;