/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ], 
   theme: {
    backgroundImage:{
      'darkButton':'url(./DarkModebuttonBackground/dark.jpg)',
      'lightButton':'url(./LightModeButtonBackground/light.jpg)',
      'lightIllustration':'url(./Illustration/Light/LightIllustration.jpg)',
      'DarkIllustration':'url(./Illustration/Dark/DarkIllustration.jpg)',
      'loginFormBg':'url(./Illustration/Bg.jpg)',
      'darkLoginFormBg':'url(./Illustration/darkbg.jpg)'
    },
    extend: {
      fontFamily:{
        gugi:['Gugi', 'sans-serif'],
        playWrite:['Playwrite HR Lijeva','cursive'],
        montserrat:["Montserrat", 'sans-serif']
      },
      height:{
        pagesHeight:'[90vh]'
      }
    },

  },
  darkMode: "class",
  plugins: [nextui()],

}

