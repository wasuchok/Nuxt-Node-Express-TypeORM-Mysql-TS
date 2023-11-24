/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  daisyui: {
    themes: ["valentine"],
  },
  theme: {
    fontFamily: {
      'sans': ['Chakra Petch'],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}