/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/views/**/*.{html,js,ejs}', './src/assets/js/*.js'],
	theme: {
		extend: {
			colors: {
				primary: '#2333789',
				secondary: '#E61B76',
			},
		},
		container: {
			center: true,
		},
		fontFamily: {
			body: ['"Poppins"', 'Arial', 'Helvetica', 'sans-serif'],
		},
	},
	plugins: [],
};
