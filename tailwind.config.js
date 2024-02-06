/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'w-700': '700px',

        // Add more pixel-based width classes as needed
      },
    },
  },
  plugins: [],
}

