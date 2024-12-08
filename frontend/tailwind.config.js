/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.25rem',
  		},
  		colors: {
			black: {
				DEFAULT: '#1A1A38f2', // sehr intensive gleichmäßige Mischung
				light: '#1A1A38f2',
				lightish: '#1A1A38f2',
				dark: '#1A1A38f2',
				darkish: '#1A1A38f2',
			  },
				dark: {
					DEFAULT: '#121212',
					light: '#121212',
					lightish: '#121212',
					dark: '#121212',
					darkish: '#121212',
				},
				primary: {
					DEFAULT: '#BD34FE',
					light: '#F0326E',
					lightish: '#F0326E',
					dark: '#F0326E',
					darkish: '#F0326E',
				},
				secondary: {
					DEFAULT: '#5AC0FE',
					light: '#F0326E',
					lightish: '#F0326E',
					dark: '#F0326E',
					darkish: '#F0326E',
				},
				tertiary: {
					DEFAULT: '#262642',
					light: '#F0326E',
					lightish: '#F0326E',
					dark: '#F0326E',
					darkish: '#F0326E',
				},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
				"slow-pulse": "pulse 10s infinite",
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar')],
}
