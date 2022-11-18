module.exports = {
	get: function (con, callback) {
		con.query('SELECT * FROM rewards', callback);
	},
	getById: function (con, id, callback) {
		// con.query(`SELECT * FROM clients WHERE id = ${id}`, callback);
	},
	create: function (con, data, dataImg, callback) {
		console.log('data que llega al model en el body');
		console.log(data);
		console.log('data que llega al model en el dataImg');
		console.log(dataImg.filename);
		con.query('INSERT INTO rewards SET ?', {
			nameReward: data.name,
			image: dataImg.filename,
			description: data.description,
			pricePoints: data.points,
		}),
			(error2, results2, fields2) => {
				if (error2) throw error2;
				// 						// Si la consulta no devuelve datos
				if (!results2) {
					return callback(null, {
						state: false,
						alert: true,
						alertTitle: '¡Ups!...',
						alertMessage: 'La compra no pudo ser creado',
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
					alertTitle: `La compra ${data.name} fue creado con exito.`,
					alertMessage: results.msg,
					alertIcon: 'success',
					showConfirmButton: true,
					timer: 5000,
					ruta: '/admin/clientes',
				});
			};

		// } else {
		// 	// No se recibio un correo electronico para realizar la consulta
		// 	return callback(null, {
		// 		state: false,
		// 		msg: 'El usuario no pudo ser creado',
		// 	});
		// }
	},
	// update: function (con, data, id, callback) {
	// 	// con.query(
	// 	// 	`UPDATE clients SET email ='${data.email}', name ='${data.name}', phone ='${data.phone}', address ='${data.address}' WHERE id = ${id}`,
	// 	// 	(error) => {
	// 	// 		if (error) throw error;
	// 	// 		return callback(null);
	// 	// 	}
	// 	// );
	// },
	// destroy: function (con, id) {
	// 	// con.query(`DELETE FROM clients WHERE id = ${id}`, (error, results) => {
	// 	// 	if (error) throw error;
	// 	// });
	// },
};
