/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
				'25%': '25%'
			}
		}
	},
	plugins: []
}
