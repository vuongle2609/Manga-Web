import create from "zustand";

const store = create((set) => ({
  isDark: "light",
  isGenres: false,
  isSearch: false,
  canvas: false,
  load: false,
  userData: "wait",
  setUserData: (data) => {
    set(() => ({
      userData: data,
    }));
  },
  setLoad: (bol) => {
    set(() => ({
      load: bol,
    }));
  },
  setDark: (theme) => {
    set(() => ({
      isDark: theme,
    }));
  },
  setSearch: () => {
    set((state) => ({
      isSearch: !state.isSearch,
    }));
  },
  setGenres: () => {
    set((state) => ({
      isGenres: !state.isGenres,
    }));
  },
  setCanvas: () => {
    set((state) => ({
      canvas: !state.canvas,
    }));
  },
}));

export default store;
