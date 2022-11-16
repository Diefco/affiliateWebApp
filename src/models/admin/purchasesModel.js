module.exports = {
	get: function (con, callback) {
		con.query(
			//'SELECT * FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',
			'SELECT purchases.id, purchases.namePurchase, clients.email, purchases.valuePurchase, purchases.pointsPurchases , DATE_FORMAT(purchases.datePurchase, "%Y-%m-%d") as  datePurchase FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',
			(error, results) => {
				if (error) throw error;

				callback(null, results);
			}
		);
	},
	getById: function (con, id, callback) {
		con.query(
			`SELECT purchases.id, purchases.namePurchase, DATE_FORMAT(purchases.datePurchase, "%Y-%m-%d") as  datePurchase,purchases.description ,clients.email, purchases.valuePurchase, purchases.pointsPurchases FROM purchases JOIN clients ON purchases.idClient = clients.id WHERE purchases.id = ${id}`,
			(error, results) => {
				if (error) throw error;

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

	update: function (con, data, id, callback) {
		con.query(
			`SELECT points FROM clients WHERE email = '${data.email}'`,
			(error, results2) => {
				if (error) throw error;
				const oldPointsPurchase = data.oldValuePurchase / 1000;
				const newPointsPurchase = data.valuePurchase / 1000;
				const calcPoints =
					results2[0].points - oldPointsPurchase + newPointsPurchase;
				con.query(
					`UPDATE purchases, clients SET purchases.namePurchase ='${data.namePurchase}', purchases.valuePurchase ='${data.valuePurchase}', purchases.pointsPurchases ='${newPointsPurchase}', purchases.description='${data.description}',purchases.datePurchase='${data.datePurchase}',clients.points='${calcPoints}' WHERE purchases.id = '${id}' AND clients.email= '${data.email}'`,
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
			`SELECT DATE_FORMAT(purchases.datePurchase, "%Y-%m-%d") as  datePurchase, purchases.namePurchase, purchases.valuePurchase, purchases.pointsPurchases FROM purchases JOIN clients ON purchases.idClient = clients.id WHERE clients.id = ${id}`,
			(error, results) => {
				if (error) throw error;

				callback(null, results);
			}
		);
	},

	destroy: function (con, id, callback) {
		con.query(
			`SELECT idClient, pointsPurchases FROM purchases WHERE id = ${id}`,
			(error, results) => {
				if (error) throw error;
				const clientId = results[0].idClient;
				const pointsDelete = results[0].pointsPurchases;
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
									(error4, results4) => {
										if (error4) throw error4;
										callback(null, results4);
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
