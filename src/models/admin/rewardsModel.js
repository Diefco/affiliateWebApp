module.exports = {
	get: function (con, callback) {
		// con.query('SELECT * FROM clients', callback);
	},
	getById: function (con, id, callback) {
		// con.query(`SELECT * FROM clients WHERE id = ${id}`, callback);
	},
	create: function (con, data, callback) {
		// if (data.email) {
		// 	con.query(
		// 		`SELECT * FROM clients WHERE email = '${data.email}'`,
		// 		(error, results, fields) => {
		// 			if (error) throw error;
		// 			if (!results.length > 0) {
		// 				con.query(
		// 					'INSERT INTO clients SET ?',
		// 					{
		// 						email: data.email,
		// 						name: data.name,
		// 						phone: data.phone,
		// 						address: data.address,
		// 						points: 0,
		// 						password: Math.random()
		// 							.toString(36)
		// 							.substring(1, 9),
		// 						idAdmin: data.idAdmin,
		// 					},
		// 					(error2, results2, fields2) => {
		// 						if (error2) throw error2;
		// 						// Si la consulta no devuelve datos
		// 						if (!results2) {
		// 							return callback(null, {
		// 								state: false,
		// 								alert: true,
		// 								alertTitle: '¡Ups!...',
		// 								alertMessage:
		// 									'El usuario no pudo ser creado',
		// 								alertIcon: 'error',
		// 								showConfirmButton: true,
		// 								timer: 5000,
		// 								ruta: '/admin/clientes/nuevo',
		// 							});
		// 						}
		// 						// Si la consulta devuelve datos
		// 						return callback(null, {
		// 							state: true,
		// 							alert: true,
		// 							alertTitle: `El cliente ${data.name} fue creado con exito.`,
		// 							alertMessage: results.msg,
		// 							alertIcon: 'success',
		// 							showConfirmButton: true,
		// 							timer: 5000,
		// 							ruta: '/admin/clientes',
		// 						});
		// 					}
		// 				);
		// 			} else {
		// 				// El correo electronico ya existe
		// 				return callback(null, {
		// 					state: false,
		// 					alert: true,
		// 					alertTitle: '¡Ups!...',
		// 					alertMessage:
		// 						'Ya existe un usuario con este correo',
		// 					alertIcon: 'error',
		// 					showConfirmButton: true,
		// 					timer: 5000,
		// 					ruta: '/admin/clientes/nuevo',
		// 				});
		// 			}
		// 		}
		// 	);
		// } else {
		// 	// No se recibio un correo electronico para realizar la consulta
		// 	return callback(null, {
		// 		state: false,
		// 		msg: 'El usuario no pudo ser creado',
		// 	});
		// }
	},
	update: function (con, data, id, callback) {
		// con.query(
		// 	`UPDATE clients SET email ='${data.email}', name ='${data.name}', phone ='${data.phone}', address ='${data.address}' WHERE id = ${id}`,
		// 	(error) => {
		// 		if (error) throw error;
		// 		return callback(null);
		// 	}
		// );
	},
	destroy: function (con, id) {
		// con.query(`DELETE FROM clients WHERE id = ${id}`, (error, results) => {
		// 	if (error) throw error;
		// });
	},
};
