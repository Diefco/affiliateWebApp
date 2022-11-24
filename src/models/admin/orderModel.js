module.exports = {
	get: function (con, callback) {
		con.query(
			//'SELECT * FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',
			'SELECT orders.*,clients.email, orderstate.* FROM `orders` JOIN `clients`,`orderstate` where clients.id = orders.idClient AND orderstate.id = orders.idOrderState',
			(error, results) => {
				if (error) throw error;
				console.log(results);
				callback(null, results);
			}
		);
	},

	create: function (con, data, callback) {
		if (data.email) {
			con.query(
				`SELECT id , points FROM clients WHERE email = '${data.email}'`,
				(error, results, fields) => {
					if (error) throw error;

					if (results.length > 0) {
						let idClient = results[0].id;
						let pointsClient = results[0].points;

						if (data.inCart !== '') {
							con.query(
								`SELECT pricePoints FROM rewards WHERE id in (${data.inCart})`,
								(error2, results2, fields) => {
									if (error2) throw error;
									let pointsOrder = 0;
									for (let i = 0; i < results2.length; i++) {
										pointsOrder += results2[i].pricePoints;
									}

									if (pointsOrder > pointsClient) {
										return callback(null, {
											toast: true,
											state: false,
											alert: false,
											alertMessage:
												'el cliente no tiene puntos suficientes',
											alertIcon: 'error',
											showConfirmButton: true,
											timer: 5000,
											ruta: '/admin/pedidos/nuevo',
										});
									}

									let totalsPoint =
										pointsClient - pointsOrder;

									con.query(
										`INSERT INTO orders SET ? `,
										{
											phoneContact: data.receiverPhone,
											pricePoints: pointsOrder,
											deliveryAddress:
												data.receiverAddress,
											deliveryDate: data.receiverDate,
											scheduleAvailable:
												data.receiverHour,
											deliveryMessage: data.description,
											idOrderState: 1,
											idReward: data.inCart,
											idClient: idClient,
										},
										(error4, results4, fields) => {
											if (error4) throw error4;
											if (!results4) {
												return callback(null, {
													state: false,
													alert: true,
													alertTitle: '¡Ups!...',
													alertMessage:
														'La orden no pudo ser creada',
													alertIcon: 'error',
													showConfirmButton: true,
													timer: 5000,
													ruta: '/admin/clientes/nuevo',
												});
											}

											// Si la consulta devuelve datos
											con.query(
												`UPDATE clients SET points= ${totalsPoint} WHERE id = ${idClient}`,
												(error3) => {
													if (error3) throw error3;
													return callback(null, {
														state: true,
														alert: true,
														alertTitle: `La orden fue creada`,
														alertMessage:
															results.msg,
														alertIcon: 'success',
														showConfirmButton: true,
														timer: 5000,
														ruta: '/admin/clientes',
													});
												}
											);
										}
									);
								}
							);
						} else {
							return callback(null, {
								toast: true,
								state: false,
								alert: false,
								alertMessage: 'Seleccione almenos un premio',
								alertIcon: 'error',
								showConfirmButton: true,
								timer: 5000,
								ruta: '/admin/pedidos/nuevo',
							});
						}
					} else {
						return callback(null, {
							state: false,
							alert: false,
							alertTitle: 'No encontramos el cliente',
							alertMessage: 'El cliente no esta registrado',
							alertIcon: 'error',
							showConfirmButton: true,
							timer: 5000,
							ruta: '/admin/pedidos/nuevo',
						});
					}
				}
			);
		}
		// else {
		// 	// No se recibio un correo electronico para realizar la consulta
		// 	return callback(null, {
		// 		state: false,
		// 		alert: true,
		// 		alertTitle: '¡Bien! creación exitosa',
		// 		alertMessage: 'La compra no pudo ser creada',
		// 		alertIcon: 'success',
		// 		showConfirmButton: true,
		// 		timer: 5000,
		// 		ruta: '/admin/compras',
		// 	});
		// }
	},
};
