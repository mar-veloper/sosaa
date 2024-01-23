/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['retro', 'coffee']
	},
	plugins: [require('daisyui')]
};
