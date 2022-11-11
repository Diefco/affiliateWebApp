/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/views/**/*.{html,js,ejs}', './src/assets/js/*.js'],
	theme: {
		extend: {
			colors: {
				cBlue: '#233789',
				cPink: '#E61B76',
				cGray: '#606060',
			},
		},
		container: {
			center: true,
		},
		fontFamily: {
			body: ['"Poppins"', 'Arial', 'Helvetica', 'sans-serif'],
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
