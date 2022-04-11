module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      minHeight: ({ theme }) => ({
        ...theme("spacing"),
      }),
      colors: {
        modal: "RGBA(0,0,0,0.44)",
        modalw: "RGBA(255,255,255,0.44)",
        transparent: "transparent",
        bdark: "#161c24",
        sdarks: "#252c35",
        primary: "#ff6740",
        slights: "#f2f3f5",
        textGray: "#212b36",
        textDarkGray: "#919eab",
        redActive: "rgba(255, 48, 48, 0.16)",
        greenActive: "RGBA(55,255,48,0.16)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
