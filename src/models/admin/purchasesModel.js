module.exports = {
	get: function (con, callback) {
		con.query(
			//'SELECT * FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',
			'SELECT purchases.id, purchases.namePurchase, clients.email, purchases.valuePurchase, purchases.pointsPurchases FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',
			(error, results) => {
				if (error) throw error;
				console.log(results);
				callback(null, results);
			}
		);
	},

	create: function (con, data, callback) {
		if (data.emailClient) {
			con.query(
				`SELECT * FROM clients WHERE email = '${data.emailClient}'`,
				(error, results, fields) => {
					if (error) throw error;
					if (results.length > 0) {
						con.query(
							'INSERT INTO purchases SET ?',
							{
								namePurchase: data.namePurchase,
								datePurchase: data.datePurchase,
								valuePurchase: data.valuePurchase,
								description: data.description,
								pointsPurchases: data.valuePurchase / 1000,
								idClient: results[0].id, //prueba
							},
							(error2, results2, fields2) => {
								if (error2) throw error2;

								// Aquí Query de ingreso de puntos al cliente.

								// con.query(
								// 	`UPDATE clients SET points ='${
								// 		results[0].points
								// 	}'+'${
								// 		data.valuePurchase / 1000
								// 	}' WHERE email = '${data.emailClient}'`,
								// 	// 	`SELECT * FROM clients WHERE email = '${data.emailClient}'`,
								// 	(error3, results3, fields) => {
								// 		if (error3) throw error3;
								// 	}
								// );

								// Continuas ejecución.

								// Si la consulta no devuelve datos
								if (results2 === undefined) {
									return callback(null, {
										state: false,
										msg: 'La compra no pudo ser creada',
									});
								} else {
									return callback(null, {
										state: true,
										msg: `La compra del cliente ${data.emailClient} fue creada con exito.`,
									});
								}
							}
						);
					} else {
						return callback(null, {
							state: false,
							msg: 'El cliente no esta registrado',
						});
					}
				}
			);
		} else {
			// No se recibio un correo electronico para realizar la consulta
			return callback(null, {
				state: false,
				msg: 'La compra no pudo ser creada',
			});
		}
	},
};
