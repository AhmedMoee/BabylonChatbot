/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'babylon-green': '#79ae93',
				'babylon-blue-light': '#5991a1',
				'babylon-blue-dark': '#004258'
			},
			backgroundSize: {
				auto: 'auto',
				cover: 'cover',
				contain: 'contain',
				'50%': '50%',
				'30%': '30%',
				'25%': '25%'
			},
			spacing: {
				'1/16': '6.25%',
				'25%': '25%',
				'50%': '50%',
				'80%': '80%',
				'91%': '91%',
				44: '11rem', // 176px
				100: '25rem', // 400px
				120: '30rem', // 480px
				160: '40rem' // 640px
			},
			blur: {
				xs: '2px'
			},
			animation: {
				vote: 'vote 1.5s ease-in-out infinite'
			},
			keyframes: {
				vote: {
					'0%, 100%': {
						transform: 'rotate(-20deg)'
					},
					'50%': {
						transform: 'rotate(20deg)'
					}
				}
			}
		}
	},
	plugins: []
}
