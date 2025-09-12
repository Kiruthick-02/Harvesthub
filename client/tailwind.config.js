/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // New Color Palette
        'dark-bg': '#111827',        // A very dark blue-gray for backgrounds
        'dark-card': '#1F2937',      // A slightly lighter gray for cards and sidebars
        'primary-green': '#10B981',  // A vibrant, modern emerald green for buttons and highlights
        'light-text': '#F3F4F6',     // A soft off-white for primary text
        'secondary-text': '#9CA3AF', // A muted gray for subtitles and secondary info
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};