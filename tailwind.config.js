module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      minHeight: ({theme}) => ({
        ...theme('spacing'),
      }),
      colors: {
        modal: "RGBA(0,0,0,0.44)",
        modalw: "RGBA(255,255,255,0.44)",
        transparent: 'transparent',
        bdark: "#27272a",
        sdarks: "#444444",
        primary: "#ff6740",
        slights: "#e2e8f0"
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
