module.exports = {
	get: (con, session, callback) => {
		const { idUser } = session;

		con.query(
			`SELECT * FROM clients WHERE id = '${idUser}'`,
			(error, results, fields) => {
				if (error) throw error;
				callback(null, {
					id: results[0].id,
					email: results[0].email,
					name: results[0].name,
					phone: results[0].phone,
					address: results[0].address,
					points: results[0].points,
				});
			}
		);
	},
	update: function (con, data, id, callback) {
		con.query(
			`SELECT id, email FROM clients WHERE id = "${id}"`,
			(error, results, fields) => {
				if (error) throw error;

				if (results.length > 0) {
					if (results[0].id == data.idClient) {
						// se pueden guardar cambios (nombre y demas)
						con.query(
							`UPDATE clients SET name ='${data.name}', phone ='${data.phone}', address ='${data.address}' WHERE id = '${id}'`,
							(error) => {
								if (error) throw error;
								return callback(null, {
									data: true,
									alert: true,
									alertTitle: '¡Excelente!',
									alertMessage: 'Hemos actualizado tus datos',
									alertIcon: 'success',
									showConfirmButton: true,
									timer: 5000,
									ruta: '/mi-cuenta',
								});
							}
						);
					} else {
						// error
						return callback(null, {
							data: true,
							alert: true,
							alertTitle: 'Ups...',
							alertMessage: 'El correo ya esta siendo usado...',
							alertIcon: 'error',
							showConfirmButton: true,
							timer: 5000,
							ruta: '/mi-cuenta',
						});
					}
				} else {
					// se deja actualizar totalmente
					con.query(
						`UPDATE clients SET name ='${data.name}', phone ='${data.phone}', address ='${data.address}' WHERE id = '${id}'`,
						(error) => {
							if (error) throw error;
							return callback(null, {
								data: true,
								alert: true,
								alertTitle: '¡Excelente!',
								alertMessage: 'Hemos actualizado tus datos',
								alertIcon: 'success',
								showConfirmButton: true,
								timer: 5000,
								ruta: '/mi-cuenta',
							});
						}
					);
				}
			}
		);
	},
};
