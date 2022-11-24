'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './src/config/.env' });

// async..await is not allowed in global scope, must use a wrapper
async function main() {
	// create reusable transporter object using the default SMTP transport

	const transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		secure: true,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Susy Reposteria" <no-reply@susyreposteria.com>', // sender address
		to: 'diefco.web@gmail.com', // list of receivers
		subject: '¡Hola! 👋 ¿Conoces tus puntos?', // Subject line
		text: 'Mensaje de prueba', // plain text body
		html: '<b>Tienes 5000 puntos</b>', // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

main().catch(console.error);
