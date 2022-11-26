const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailerSend = require('../config/nodemailer');

module.exports = {
	auth: (con, data, callback) => {
		if (data.email && data.password) {
			con.query(
				`SELECT * FROM admin WHERE email = '${data.email}'`,
				(error, results, fields) => {
					if (error) throw error;
					// Validamos si es undefined = no encontro el correo
					if (results[0] === undefined) {
						return callback(null, {
							auth: false,
							alert: true,
							alertTitle: 'Ups...',
							alertMessage:
								'El correo o contraseña no son correctos',
							alertIcon: 'error',
							showConfirmButton: true,
							timer: 3000,
							ruta: '/',
						});
					}
					// Comparamos la contraseña enviada por el usar con la bd.
					if (
						!bcryptjs.compareSync(
							data.password,
							results[0].password
						)
					) {
						return callback(null, {
							auth: false,
							alert: true,
							alertTitle: 'Ups...',
							alertMessage:
								'El correo o contraseña no son correctos',
							alertIcon: 'error',
							showConfirmButton: true,
							timer: 3000,
							ruta: '/',
						});
					}
					// Encontro el correo y la contraseña es correcta.
					// Enviamos mensaje y data para la sesión.
					return callback(null, {
						auth: false,
						alert: true,
						alertTitle: '¡Bievenid@!',
						alertMessage: 'El correo o contraseña son correctos',
						alertIcon: 'succes',
						showConfirmButton: true,
						timer: 3000,
						ruta: '/',
						sessionIdUser: results[0].id,
						sessionEmail: results[0].email,
					});
				}
			);
		} else {
			return callback(null, {
				auth: false,
				alert: true,
				alertTitle: 'Ups...',
				alertMessage: 'Algo no esta bien...',
				alertIcon: 'error',
				showConfirmButton: true,
				timer: 3000,
				ruta: '/',
			});
		}
	},
	passwordAuth: (con, data, callback) => {
		const { email } = data;

		con.query(
			`SELECT * FROM clients WHERE email = '${email}'`,
			(error, results) => {
				if (error) throw error;

				if (results[0]) {
					//Si existe, crearemos un link de un solo uso por 30 minutos.
					const secret = process.env.JWT_SECRET + results[0].password;
					const payload = {
						email: results[0].email,
						id: results[0].id,
					};
					const token = jwt.sign(payload, secret, {
						expiresIn: '30m',
					});

					const link = `http://localhost:3000/reset-password/${results[0].id}/${token}`;
					console.log(link);

					const mailSubject = '¿Solicitaste recuperar tu contaseña?';
					const mailHTML = `
						<h1> Hola,</h1>
						<p> Has solicitado cambiar tu contraseña. El enlace para cambiar tu contraseña es el siguiente:</p>
						<p> <a href="${link}" alt="Enlace para restablecer contraseña">${link}</a> </p>
						<p> Tenga en cuenta que este enlace solo funcionara por 30 minutos. </p>
					`;

					nodemailerSend(results[0].email, mailSubject, mailHTML);

					return callback(null, {
						auth: false,
						alert: true,
						alertTitle: '¡Excelente!',
						alertMessage:
							'El enlace para cambiar tu contraseña fue enviado a tu correo. Recuerda revisar en correo no deseado o spam.',
						alertIcon: 'success',
						showConfirmButton: true,
						timer: 8000,
						ruta: '/forgot-password',
					});
				} else {
					return callback(null, {
						auth: false,
						alert: true,
						alertTitle: 'Ups..',
						alertMessage:
							'El correo no es correcto. Vuelve a intentarlo',
						alertIcon: 'error',
						showConfirmButton: true,
						timer: 3000,
						ruta: '/forgot-password',
					});
				}
			}
		);
	},
};
