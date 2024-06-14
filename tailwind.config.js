/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#353535",
        "primary-hover": "#252525",
        secondary: "#2196F3",
        "secondary-hover": "#2196F3",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
