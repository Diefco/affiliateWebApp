const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailerSend = require('../config/nodemailer');

module.exports = {
	auth: (con, data, callback) => {
		if (data.email && data.password) {
			con.query(
				`SELECT * FROM clients WHERE email = '${data.email}'`,
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
					if (
						bcryptjs.compareSync(data.password, results[0].password)
					) {
						// Encontro el correo y la contraseña es correcta.
						// Enviamos mensaje y data para la sesión.
						return callback(null, {
							auth: true,
							alert: true,
							alertTitle: '¡Bievenid@!',
							alertMessage:
								'El correo o contraseña son correctos',
							alertIcon: 'succes',
							showConfirmButton: true,
							timer: 3000,
							ruta: '/premios/',
							sessionIdUser: results[0].id,
							sessionEmail: results[0].email,
						});
					} else {
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
	forgotPasswordAuth: (con, data, url, callback) => {
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

					const link = `${url}/reset-password/${results[0].id}/${token}`;

					const mailSubject =
						'¿Necesitas recuperar tu contraseña? 🔑';

					const mailHTML = `<h1 style="text-align:center; color:#333333;">Hola ${results[0].name},</h1>
					<p style="text-align:center; color:#333333;"><b>¿Solicitaste cambiar tu contraseña?</b> <br/>
					En el siguiente enlace puedes actualizar tu contraseña:<br/>
					<b><a href="${link}" target="_blank" style="color:#E61B76;">Clic aquí para recuperar tu contraseña</a></b><br/>
					Recuerda que este enlace solo estará disponible por 30 minutos.</p>
					<br/>
					<p style="text-align:center; color:#333333;">Si necesitas más ayuda, siempre puedes contactarnos al correo: <br/>
					<a href="info@susyreposteria.com"style="color:#E61B76;">info@susyreposteria.com</a></p>`;

					nodemailerSend(
						results[0].email,
						mailSubject,
						mailHTML
					).catch(console.log(error));

					return callback(null, {
						auth: false,
						alert: true,
						alertTitle: '¡Excelente!',
						alertMessage:
							'El enlace para cambiar tu contraseña fue enviado a tu correo. Recuerda revisar en correo no deseado o spam.',
						alertIcon: 'success',
						showConfirmButton: true,
						timer: 8000,
						ruta: '/',
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
	resetPassword: (con, params, callback) => {
		const { id, token } = params;

		// Revisamos que exista el usuario
		con.query(
			`SELECT * FROM clients WHERE id = '${id}'`,
			(err, results) => {
				if (err) throw err;

				/* Validamos si existe el usuario, de lo contrario registramos */
				if (results[0]) {
					const secret = process.env.JWT_SECRET + results[0].password;
					try {
						const payload = jwt.verify(token, secret);
						return callback(null, { email: results[0].email });
					} catch (error) {
						console.log(error);
						return callback(null, {
							alert: true,
							alertTitle: 'Ups..',
							alertMessage:
								'El enlace no es correcto, solicita uno nuevo.',
							alertIcon: 'error',
							showConfirmButton: true,
							timer: 3000,
							ruta: '/',
						});
					}
				} else {
					// No existe, lo enviamos al directorio
					return callback(null, {
						alert: true,
						alertTitle: 'Ups..',
						alertMessage: 'Algo no esta bien. Vuelve a intentarlo',
						alertIcon: 'error',
						showConfirmButton: true,
						timer: 3000,
						ruta: '/',
					});
				}
			}
		);
	},
	resetPasswordAuth: async (con, params, data, callback) => {
		const { id, token } = params;
		const { password, password2 } = data;
		let passwordHash = await bcryptjs.hash(password, 8);

		console.log(password, password2);

		con.query(
			`SELECT * FROM clients WHERE id = '${id}'`,
			(err, results) => {
				if (err) throw err;

				if (results[0]) {
					const secret = process.env.JWT_SECRET + results[0].password;
					try {
						const payload = jwt.verify(token, secret);
						// Validamos si las contraseñas son iguales.
						if (password === password2) {
							console.log(
								`UPDATE clients SET password = '${passwordHash}' WHERE id = '${results[0].id}'`
							);
							con.query(
								`UPDATE clients SET password = '${passwordHash}' WHERE id = '${results[0].id}'`,
								async (err2, results2) => {
									if (err2) {
										console.log(err2);
									} else {
										return callback(null, {
											alert: true,
											alertTitle:
												'Contraseña actualizada',
											alertMessage:
												'Tu contraseña se ha restablecido con exito. Inicia sesión con tu nueva contraseña',
											alertIcon: 'success',
											showConfirmButton: false,
											timer: 4000,
											ruta: '/',
										});
									}
								}
							);
						} else {
							return callback(null, {
								alert: true,
								alertTitle: 'La contraseña no es igual',
								alertMessage:
									'Intenta nuevamente, las contraseñas son diferentes.',
								alertIcon: 'warning',
								showConfirmButton: true,
								timer: 3000,
								ruta: undefined,
							});
						}
					} catch (error) {
						console.log(error.message);
						res.send(error.message);
					}
				} else {
					return callback(null, {
						alert: true,
						alertTitle: 'Algo fallo..',
						alertMessage: 'Algo no esta bien. Vuelve a intentarlo',
						alertIcon: 'error',
						showConfirmButton: true,
						timer: 3000,
						ruta: '/',
					});
				}
			}
		);
	},
};
