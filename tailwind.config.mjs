/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e293b', // slate-800
        secondary: '#fbbf24', // yellow-400
        accent: '#10b981', // emerald-500
      },
    },
  },
  plugins: [],
};
export default config;
