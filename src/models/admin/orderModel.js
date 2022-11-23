module.exports = {
	get: function (con, callback) {
		con.query(
			//'SELECT * FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',
			'SELECT * FROM orders',
			(error, results) => {
				if (error) throw error;

				callback(null, results);
			}
		);
	},

	create: function (con, data, callback) {
		console.log('create model');
		console.log(data);
		if (data.emailClient) {
			con.query(
				`SELECT * FROM clients WHERE email = '${data.emailClient}'`,
				(error, results, fields) => {
					if (error) throw error;
					console.log(resutls);
					if (results.length > 0) {
						data.datePurchase = new Date(data.datePurchase);
					}
				}
			);
		}
	},
	// 					con.query(
	// 						'INSERT INTO purchases SET ?',
	// 						{
	// 							namePurchase: data.namePurchase,
	// 							datePurchase: data.datePurchase,
	// 							valuePurchase: data.valuePurchase,
	// 							description: data.description,
	// 							pointsPurchase: data.valuePurchase / 1000,
	// 							idClient: results[0].id, //prueba
	// 						},
	// 						(error2, results2, fields2) => {
	// 							if (error2) throw error2;

	// 							con.query(
	// 								`UPDATE clients SET points ='${
	// 									results[0].points
	// 								}'+'${
	// 									data.valuePurchase / 1000
	// 								}' WHERE email = '${data.emailClient}'`,
	// 								`SELECT * FROM clients WHERE email = '${data.emailClient}'`,
	// 								(error3, results3, fields) => {
	// 									if (error3) throw error3;
	// 								}
	// 							);

	// 							// Si la consulta no devuelve datos
	// 							if (results2 === undefined) {
	// 								return callback(null, {
	// 									state: false,
	// 									alert: true,
	// 									alertTitle: '¡Ups!...',
	// 									alertMessage:
	// 										'La compra no pudo ser creada',
	// 									alertIcon: 'error',
	// 									showConfirmButton: true,
	// 									timer: 5000,
	// 									ruta: '/admin/compras/nueva',
	// 								});
	// 							} else {
	// 								return callback(null, {
	// 									state: true,
	// 									alert: true,
	// 									alertTitle: '¡Bien! creación exitosa',
	// 									alertMessage: `La compra del cliente ${data.emailClient} fue creada con exito.`,
	// 									alertIcon: 'success',
	// 									showConfirmButton: true,
	// 									timer: 5000,
	// 									ruta: '/admin/compras',
	// 								});
	// 							}
	// 						}
	// 					);
	// 				} else {
	// 					return callback(null, {
	// 						state: false,
	// 						alert: false,
	// 						alertTitle: 'No encontramos el cliente',
	// 						alertMessage: 'El cliente no esta registrado',
	// 						alertIcon: 'error',
	// 						showConfirmButton: true,
	// 						timer: 5000,
	// 						ruta: '/admin/compras/nueva',
	// 					});
	// 				}
	// 			}
	// 		);
	// 	} else {
	// 		// No se recibio un correo electronico para realizar la consulta
	// 		return callback(null, {
	// 			state: false,
	// 			alert: true,
	// 			alertTitle: '¡Bien! creación exitosa',
	// 			alertMessage: 'La compra no pudo ser creada',
	// 			alertIcon: 'success',
	// 			showConfirmButton: true,
	// 			timer: 5000,
	// 			ruta: '/admin/compras',
	// 		});
	// 	}
	// },
};
