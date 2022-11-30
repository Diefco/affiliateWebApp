const nodemailerSend = require('../../config/nodemailer');

module.exports = {
	get: function (con, callback) {
		con.query('SELECT * FROM clients', callback);
	},
	getById: function (con, id, callback) {
		con.query(`SELECT * FROM clients WHERE id = ${id}`, callback);
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

				const mailSubject = '¡Mira cuantos puntos!';

				const mailHTML = `<h1 style="text-align:center; color:#333333;">Hola ${results[0].name},</h1>
					<p style="text-align:center; color:#333333;"><b>Recuerda que en Susy Repostería tenemos un grandioso sistema de puntos para tí.</b>
					<p Cada compra que realizas te suma puntos.
					</b>
					<b><p style="text-align:center; color:#333333;">Actualmente tienes:</b>
					<P style="text-align:center; Font-size:24px; color:#E61B76; Font-weight:bold;">${results[0].points} Pts.</P></b>

					<b><p style="text-align:center; color:#333333;">Ingresa a tu cuenta en:
					<a href="https://mispuntos.susyreposteria.com/
					"style="color:#E61B76 "text-align:center">https://mispuntos.susyreposteria.com/
					</a></p></b>
					<p style="text-align:center; color:#333333;">¡Gracias por confiar en nosotros! <br/>`;

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
};
