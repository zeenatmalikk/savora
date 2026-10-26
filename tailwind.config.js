/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        display: ['DMSerifDisplay'],
        'display-italic': ['DMSerifDisplayItalic'],
        inter: ['Inter'],
        'inter-bold': ['InterBold'],
      },
    },
  },
  plugins: [],
};