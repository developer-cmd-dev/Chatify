/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    backgroundImage:{
      'darkButton':'url(./DarkModebuttonBackground/dark.jpg)',
      'lightButton':'url(./LightModeButtonBackground/light.jpg)',
      'lightIllustration':'url(./Illustration/Light/LightIllustration.jpg)',
      'DarkIllustration':'url(./Illustration/Dark/DarkIllustration.jpg)',
    },
    extend: {},

  },
  plugins: [],
}

