/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ], 
   theme: {
   	backgroundImage: {
   		darkButton: 'url(./DarkModebuttonBackground/dark.jpg)',
   		lightButton: 'url(./LightModeButtonBackground/light.jpg)',
   		lightIllustration: 'url(./Illustration/Light/LightIllustration.jpg)',
   		DarkIllustration: 'url(./Illustration/Dark/DarkIllustration.jpg)',
   		loginFormBg: 'url(./Illustration/Bg.jpg)',
   		darkLoginFormBg: 'url(./Illustration/darkbg.jpg)'
   	},
   	extend: {
   		fontFamily: {
   			gugi: [
   				'Gugi',
   				'sans-serif'
   			],
   			playWrite: [
   				'Playwrite HR Lijeva',
   				'cursive'
   			],
   			montserrat: [
   				'Montserrat',
   				'sans-serif'
   			]
   		},
   		height: {
   			pagesHeight: '\[90vh]'
   		},
   		borderRadius: {
   			lg: 'var(--radius)',
   			md: 'calc(var(--radius) - 2px)',
   			sm: 'calc(var(--radius) - 4px)'
   		},
   		colors: {
   			background: 'hsl(var(--background))',
   			foreground: 'hsl(var(--foreground))',
   			card: {
   				DEFAULT: 'hsl(var(--card))',
   				foreground: 'hsl(var(--card-foreground))'
   			},
   			popover: {
   				DEFAULT: 'hsl(var(--popover))',
   				foreground: 'hsl(var(--popover-foreground))'
   			},
   			primary: {
   				DEFAULT: 'hsl(var(--primary))',
   				foreground: 'hsl(var(--primary-foreground))'
   			},
   			secondary: {
   				DEFAULT: 'hsl(var(--secondary))',
   				foreground: 'hsl(var(--secondary-foreground))'
   			},
   			muted: {
   				DEFAULT: 'hsl(var(--muted))',
   				foreground: 'hsl(var(--muted-foreground))'
   			},
   			accent: {
   				DEFAULT: 'hsl(var(--accent))',
   				foreground: 'hsl(var(--accent-foreground))'
   			},
   			destructive: {
   				DEFAULT: 'hsl(var(--destructive))',
   				foreground: 'hsl(var(--destructive-foreground))'
   			},
   			border: 'hsl(var(--border))',
   			input: 'hsl(var(--input))',
   			ring: 'hsl(var(--ring))',
   			chart: {
   				'1': 'hsl(var(--chart-1))',
   				'2': 'hsl(var(--chart-2))',
   				'3': 'hsl(var(--chart-3))',
   				'4': 'hsl(var(--chart-4))',
   				'5': 'hsl(var(--chart-5))'
   			}
   		}
   	}
   },
  darkMode: ["class", "class"],
  plugins: [nextui(), require("tailwindcss-animate")],

}

