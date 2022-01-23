import create from "zustand";

const store = create(set => ({
    isDark: 'light',
    isSearch: false,
    canvas: false,
    setDark: (theme) => {
        set(state => ({
            isDark: theme,
        }))
    },
    setSearch: () => {
        set(state => ({
            isSearch: !state.isSearch,
        }))
    },
    setCanvas: () => {
        set(state => ({
            canvas: !state.canvas,
        }))
    }
}))

export default store