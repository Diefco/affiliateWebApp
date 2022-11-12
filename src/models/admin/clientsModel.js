module.exports = {
	get: function (con, callback) {
		console.log('Ejecuta query');
		con.query('SELECT * FROM clients', callback);
	},
	// getById: function (con, id, callback) {
	// 	con.query(`SELECT * FROM clients WHERE id = ${id}`, callback);
	// },
	create: function (con, data, callback) {
		if (data.email) {
			con.query(
				`SELECT * FROM clients WHERE email = '${data.email}'`,
				(error, results, fields) => {
					if (error) throw error;

					if (!results.length > 0) {
						con.query(
							'INSERT INTO clients SET ?',
							{
								email: data.email,
								name: data.name,
								phone: data.phone,
								address: data.address,
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
										msg: 'El usuario no pudo ser creado',
									});
								}

								// Si la consulta devuelve datos
								return callback(null, {
									state: true,
									msg: `El cliente ${data.name} fue creado con exito.`,
								});
							}
						);
					} else {
						// El correo electronico ya existe
						return callback(null, {
							state: false,
							msg: 'Ya existe un usuario con este correo',
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
	// update: function (con, data, id, callback) {
	// 	con.query(
	// 		`UPDATE clients SET
	// 		email = '${data.email}',
	// 		password = '${data.password}'
	// 		WHERE id_clients = ${id}`,
	// 		callback
	// 	);
	// },
	// destroy: function (con, id, callback) {
	// 	con.query(`DELETE FROM clients WHERE id_clients = ${id}`, callback);
	// },
};
