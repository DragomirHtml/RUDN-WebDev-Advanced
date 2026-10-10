import { create } from "zustand";

type BoardFiltersStore = {
  hideDone: boolean;
  toggleHideDone: () => void;
};

export const useBoardFiltersStore = create<BoardFiltersStore>((set) => ({
  hideDone: false,
  toggleHideDone: () =>
    set((state) => ({ hideDone: !state.hideDone })),
}));