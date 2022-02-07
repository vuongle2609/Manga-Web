import create from "zustand";

const store = create(set => ({
    isDark: 'light',
    isGenres: false,
    isSearch: false,
    canvas: false,
    setDark: (theme) => {
        set(() => ({
            isDark: theme,
        }))
    },
    setSearch: () => {
        set(state => ({
            isSearch: !state.isSearch,
        }))
    },
    setGenres: () => {
        set(state => ({
            isGenres: !state.isGenres,
        }))
    },
    setCanvas: () => {
        set(state => ({
            canvas: !state.canvas,
        }))
    }
}))

export default store