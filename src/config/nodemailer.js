'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './src/config/.env' });

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function nodemailerSend(client, subject, contentHtml) {
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

	// transporter.verify(function (error, success) {
	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log('Server is ready to take our messages');
	// 	}
	// });

	//send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Susy Reposteria" <no-reply@susyreposteria.com>', // sender address
		to: client, // list of receivers
		subject: subject, // Subject line
		//text: 'Mensaje de prueba', // plain text body
		html: contentHtml, // html body
	});

	console.log('Correo de recuperación enviado a:', client);
	console.log('Message sent: %s', info.messageId);
	//Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
