module.exports = {
	get: function (con, callback) {
		con.query(
			//'SELECT * FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',
			'SELECT purchases.id, purchases.namePurchase, clients.email, purchases.valuePurchase, purchases.pointsPurchase , DATE_FORMAT(purchases.datePurchase, "%d/%m/%Y") as  datePurchase FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',
			(error, results) => {
				if (error) throw error;

				callback(null, results);
			}
		);
	},
	getById: function (con, id, callback) {
		con.query(
			`SELECT purchases.id, purchases.namePurchase, DATE_FORMAT(purchases.datePurchase, "%d/%m/%Y") as datePurchase,purchases.description ,clients.email, purchases.valuePurchase, purchases.pointsPurchase FROM purchases JOIN clients ON purchases.idClient = clients.id WHERE purchases.id = ${id}`,
			(error, results) => {
				if (error) throw error;

				callback(null, results);
			}
		);
	},

	create: function (con, data, callback) {
		if (data.emailClient) {
			const dateParts = data.datePurchase.split('/');
			data.datePurchase = new Date(
				+dateParts[2],
				dateParts[1] - 1,
				+dateParts[0]
			);
			//data.datePurchase = JSON.stringify(data.datePurchase);

			con.query(
				`SELECT * FROM clients WHERE email = '${data.emailClient}'`,
				(error, results, fields) => {
					if (error) throw error;
					if (results.length > 0) {
						console.log();
						con.query(
							'INSERT INTO purchases SET ?',
							{
								namePurchase: data.namePurchase,
								datePurchase: data.datePurchase,
								valuePurchase: data.valuePurchase,
								description: data.description,
								pointsPurchase: data.valuePurchase / 1000,
								idClient: results[0].id, //prueba
							},
							(error2, results2, fields2) => {
								if (error2) throw error2;

								con.query(
									`UPDATE clients SET points ='${
										results[0].points
									}'+'${
										data.valuePurchase / 1000
									}' WHERE email = '${data.emailClient}'`,
									`SELECT * FROM clients WHERE email = '${data.emailClient}'`,
									(error3, results3, fields) => {
										if (error3) throw error3;
									}
								);

								// Si la consulta no devuelve datos
								if (results2 === undefined) {
									return callback(null, {
										state: false,
										alert: true,
										alertTitle: '¡Ups!...',
										alertMessage:
											'La compra no pudo ser creada',
										alertIcon: 'error',
										showConfirmButton: true,
										timer: 5000,
										ruta: '/admin/compras/nueva',
									});
								} else {
									return callback(null, {
										state: true,
										alert: true,
										alertTitle: '¡Bien! creación exitosa',
										alertMessage: `La compra del cliente ${data.emailClient} fue creada con exito.`,
										alertIcon: 'success',
										showConfirmButton: true,
										timer: 5000,
										ruta: '/admin/compras',
									});
								}
							}
						);
					} else {
						return callback(null, {
							state: false,
							alert: false,
							alertTitle: 'No encontramos el cliente',
							alertMessage: 'El cliente no esta registrado',
							alertIcon: 'error',
							showConfirmButton: true,
							timer: 5000,
							ruta: '/admin/compras/nueva',
						});
					}
				}
			);
		} else {
			// No se recibio un correo electronico para realizar la consulta
			return callback(null, {
				state: false,
				alert: true,
				alertTitle: '¡Bien! creación exitosa',
				alertMessage: 'La compra no pudo ser creada',
				alertIcon: 'success',
				showConfirmButton: true,
				timer: 5000,
				ruta: '/admin/compras',
			});
		}
	},

	update: function (con, data, id, callback) {
		con.query(
			`SELECT points FROM clients WHERE email = '${data.email}'`,
			(error, results2) => {
				if (error) throw error;
				const oldPointsPurchase = data.oldValuePurchase / 1000;
				const newPointsPurchase = data.valuePurchase / 1000;
				const calcPoints =
					results2[0].points - oldPointsPurchase + newPointsPurchase;

				const dateParts = data.datePurchase.split('/');
				data.datePurchase = new Date(
					+dateParts[2],
					dateParts[1] - 1,
					+dateParts[0]
				);
				// Se debe realizar un stringify a este date por la forma
				// en que se pasa la variable en la consulta
				// de lo contrario enviara este tipo de fecha:
				// Fri Nov 25 2022 00:00:00 GMT-0500 (hora estándar de Colombia)
				// y no sera guardada por la base de datos.
				// Recuerda: No poner comillas simples al rededor de esta variable en la consulta
				// ya que strinfy devuelve la variable con comillas dobles.
				data.datePurchase = JSON.stringify(data.datePurchase); // ej: "2022-11-18T05:00:00.000Z"

				con.query(
					`UPDATE purchases, clients SET purchases.namePurchase ='${data.namePurchase}', purchases.valuePurchase ='${data.valuePurchase}', purchases.pointsPurchase ='${newPointsPurchase}', purchases.description='${data.description}', purchases.datePurchase=${data.datePurchase}, clients.points='${calcPoints}' WHERE purchases.id = '${id}' AND clients.email= '${data.email}'`,
					(error, results) => {
						if (error) throw error;
					}
				);

				callback(null);
			}
		);
	},

	getListByClient: function (con, id, callback) {
		con.query(
			`SELECT purchases.id, DATE_FORMAT(purchases.datePurchase, "%d/%m/%Y") as  datePurchase, purchases.namePurchase, purchases.valuePurchase, purchases.pointsPurchase FROM purchases JOIN clients ON purchases.idClient = clients.id WHERE clients.id = ${id}`,
			(error, results) => {
				if (error) throw error;

				callback(null, results);
			}
		);
	},

	destroy: function (con, id, callback) {
		con.query(
			`SELECT idClient, pointsPurchase FROM purchases WHERE id = ${id}`,
			(error, results) => {
				if (error) throw error;
				const clientId = results[0].idClient;
				const pointsDelete = results[0].pointsPurchase;
				con.query(
					`SELECT points FROM clients WHERE id = ${clientId}`,
					(error2, results2) => {
						if (error2) throw error2;
						const pointsClient = results2[0].points;
						const pointsTotals = pointsClient - pointsDelete;
						con.query(
							`UPDATE clients SET points= ${pointsTotals} WHERE id = ${clientId}`,
							(error3, results3) => {
								if (error3) throw error3;
								con.query(
									`DELETE FROM purchases WHERE id = ${id}`,
									(error4) => {
										if (error4) throw error4;
									}
								);
							}
						);
					}
				);
			}
		);
	},
};
