const nodemailerSend = require('../../config/nodemailer');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
	get: function (con, callback) {
		con.query(
			'SELECT clients.*, IF(SUM(purchases.pointsPurchase)>0, SUM(purchases.pointsPurchase), 0) AS totalPoints FROM clients LEFT JOIN purchases ON purchases.idClient = clients.id;',
			(error, results) => {
				if (error) throw error;

				callback(null, results);
			}
		);
	},
	getById: function (con, id, callback) {
		con.query(
			`SELECT clients.*,SUM(purchases.pointsPurchase) AS totalPoints FROM clients JOIN purchases ON purchases.idClient=clients.id WHERE clients.id = ${id}`,
			callback
		);
	},
	create: function (con, data, callback) {
		if (data.email) {
			con.query(
				`SELECT * FROM clients WHERE email = '${data.email}'`,
				(error, results, fields) => {
					if (error) throw error;
					if (results.length == 0) {
						con.query(
							'INSERT INTO clients SET ?',
							{
								email: data.email,
								name: data.name,
								phone: data.phone,
								address: data.address,
								points: 0,
								password: Math.random()
									.toString(36)
									.substring(1, 9),
								idAdmin: data.idAdmin,
							},
							(error2, results2, fields2) => {
								if (error2) throw error2;
								// Si la consulta no devuelve datos
								if (!results2) {
									return callback(null, {
										state: false,
										alert: true,
										alertTitle: '¡Ups!...',
										alertMessage:
											'El usuario no pudo ser creado',
										alertIcon: 'error',
										showConfirmButton: true,
										timer: 5000,
										ruta: '/admin/clientes/nuevo',
									});
								}

								// Si la consulta devuelve datos
								return callback(null, {
									state: true,
									alert: true,
									alertTitle: `El cliente ${data.name} fue creado con exito.`,
									alertMessage: results.msg,
									alertIcon: 'success',
									showConfirmButton: true,
									timer: 5000,
									ruta: '/admin/clientes',
								});
							}
						);
					} else {
						// El correo electronico ya existe
						return callback(null, {
							state: false,
							alert: true,
							alertTitle: '¡Ups!...',
							alertMessage:
								'Ya existe un usuario con este correo',
							alertIcon: 'error',
							showConfirmButton: true,
							timer: 5000,
							ruta: '/admin/clientes/nuevo',
						});
					}
				}
			);
		} else {
			// No se recibio un correo electronico para realizar la consulta
			return callback(null, {
				state: false,
				msg: 'El usuario no pudo ser creado',
			});
		}
	},
	update: function (con, data, id, callback) {
		// update: function (con, data, id) {
		if (data.email) {
			con.query(
				`SELECT id, email FROM clients WHERE email = "${data.email}"`,
				(error, results, fields) => {
					if (error) throw error;

					if (results.length > 0) {
						if (results[0].id == data.idClient) {
							// se pueden guardar cambios (nombre y demas)

							con.query(
								`UPDATE clients SET email ='${data.email}', name ='${data.name}', phone ='${data.phone}', address ='${data.address}' WHERE id = ${id}`,
								(error) => {
									if (error) throw error;
									return callback(null, {
										toast: true,
										state: false,
										alert: true,
										alertMessage: 'Usuario actualizado',
										alertIcon: 'success',
										showConfirmButton: true,
										timer: 5000,
										ruta: '/admin/clientes',
									});
								}
							);
						} else {
							// error

							return callback(null, {
								toast: true,
								state: false,
								alert: true,
								alertMessage:
									'El correo ya esta siendo usado...',
								alertIcon: 'error',
								showConfirmButton: true,
								timer: 5000,
								ruta: '/admin/clientes',
							});
						}
					} else {
						// se deja actualizar totalmente

						con.query(
							`UPDATE clients SET email ='${data.email}', name ='${data.name}', phone ='${data.phone}', address ='${data.address}' WHERE id = ${id}`,
							(error) => {
								if (error) throw error;
								return callback(null, {
									toast: true,
									state: false,
									alert: true,
									alertMessage: 'Usuario actualizado',
									alertIcon: 'success',
									showConfirmButton: true,
									timer: 5000,
									ruta: '/admin/clientes',
								});
							}
						);
					}
				}
			);
		}
	},
	destroy: function (con, id) {
		con.query(`DELETE FROM clients WHERE id = ${id}`, (error, results) => {
			if (error) throw error;
		});
	},
	logout: (req, res) => {
		req.session = null;
		res.redirect(homeAdmin);
	},

	emailPoints: (con, data, callback) => {
		con.query(
			`SELECT * FROM clients WHERE id = '${data}'`,
			(error, results) => {
				if (error) throw error;

				const mailSubject = '¡Mira cuantos puntos tienes! 🍰';

				const mailHTML = `<h1 style="text-align:center; color:#333333;">Hola ${results[0].name},</h1>
				<p style="text-align:center; color:#333333;">Recuerda que en <b>Susy Repostería</b> tenemos un grandioso sistema de puntos para tí.<br/>
					<b> Cada compra que realizas te suma puntos. </b> 
				</p>
				<p style="text-align:center; color:#333333;"> <b>Actualmente tienes:</b> <br/>
					<span style="text-align:center; font-size:24px; color:#E61B76; font-weight:bold;">${results[0].points} Pts.</span>
				</p>	
				<p style="text-align:center; color:#333333;">Ingresa a tu cuenta para redimir tus premios en: <br/>
					<b><a href="https://mispuntos.susyreposteria.com/" style="color:#E61B76 "text-align:center">https://mispuntos.susyreposteria.com/</a></b>
				</p>
				<p style="text-align:center; color:#333333;">¡Gracias por confiar en nosotros!</p>`;

				nodemailerSend(results[0].email, mailSubject, mailHTML).catch(
					console.log(error)
				);

				return callback(null, {
					auth: false,
					alert: true,
					alertTitle: '¡Excelente!',
					alertMessage: 'Los puntos se han informado a tu cliente.',
					alertIcon: 'success',
					showConfirmButton: true,
					timer: 8000,
					ruta: '/admin/clientes',
				});
			}
		);
	},
	emailChangePassword: (con, data, callback) => {
		con.query(
			`SELECT * FROM clients WHERE id = '${data}'`,
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
						expiresIn: '7d',
					});

					const link = `http://localhost:3018/reset-password/${results[0].id}/${token}`;

					const mailSubject =
						'Te ayudamos a recuperar tu contraseña 🔑';

					const mailHTML = `<h1 style="text-align:center; color:#333333;">Hola ${results[0].name},</h1>
					<p style="text-align:center; color:#333333;"><b>Haces parte del programa de puntos de Susy Repostería</b> <br/>
					Este correo te facilita un enlace para crear una nueva <br/>
					contraseña en tu cuenta de <b>Mis Puntos</b>, la plataforma<br/>
					donde podras solicitar premios por tus compras.</p>
					<p style="text-align:center; color:#333333;">Puedes crear la nueva contraseña en el siguiente enlace:<br/>
					<b><a href="${link}" target="_blank" style="color:#E61B76;">Clic aquí para crear una nueva contraseña</a></b><br/>
					Recuerda que este enlace solo estará disponible por 30 minutos.</p>
					<p style="text-align:center; color:#333333;"> <b>En tu cuenta tienes:</b> <br/>
					<span style="text-align:center; font-size:24px; color:#E61B76; font-weight:bold;">${results[0].points} Pts.</span> </p>
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
							'Los puntos se han informado a tu cliente.',
						alertIcon: 'success',
						showConfirmButton: true,
						timer: 8000,
						ruta: '/admin/clientes',
					});
				} else {
					return callback(null, {
						auth: false,
						alert: true,
						alertTitle: 'Algo esta fallando...',
						alertMessage:
							'Vuelve a intentarlo nuevamente. Si el problema persiste contacta con el desarrollador.',
						alertIcon: 'error',
						showConfirmButton: true,
						timer: 3000,
						ruta: '/admin/clientes',
					});
				}
			}
		);
	},
};
