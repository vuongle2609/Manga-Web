import create from "zustand";

const store = create(set => ({
    isDark: false,
    isSearch: false,
    canvas: false,
    setDark: () => {
        set(state => ({
            isDark: !state.isDark,
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