/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#252525",
        "primary-hover": "#454545",
        secondary: "#2196F3",
        "secondary-hover": "#2196F3",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
