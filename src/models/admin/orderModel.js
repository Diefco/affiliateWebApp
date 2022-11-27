module.exports = {
	get: function (con, callback) {
		con.query(
			//'SELECT * FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',
			'SELECT orders.id as orderId, DATE_FORMAT(orders.orderDate, "%d/%m/%Y") as orderDate, orders.deliveryDate, clients.email, orderstate.* FROM `orders` JOIN `clients`,`orderstate` where clients.id = orders.idClient AND orderstate.id = orders.idOrderState ',
			(error, results) => {
				if (error) throw error;
				callback(null, results);
			}
		);
	},
	getListByRewards: function (con, id, callback) {
		con.query(
			`SELECT idReward FROM orders WHERE id = ${id}`,
			(error, results) => {
				if (error) throw error;

				if (results[0]) {
					const premiosSelecionados = results[0].idReward;
					const premiosArray = results[0].idReward.split(',');

					con.query(`SELECT * FROM rewards`, (error2, results2) => {
						if (error2) throw error2;
						let rewardsResults = results2;
						let pedidoResults = [];

						rewardsResults.forEach((reward, index) => {
							premiosArray.forEach((idPremio) => {
								if (reward.id == idPremio) {
									pedidoResults.push(reward);
									delete rewardsResults[index];
								}
							});
						});
						// agregar todos los productos que no se selecionaron
						// rewardsResults.forEach((elemento, index) => {
						// 	pedidoResults.push(elemento);
						// });

						callback(null, pedidoResults);
					});
				} else {
					// no existen resultados
					console.log('No hay resultados. Un error en el pedido', id);
					callback(null, 'No hay resultados');
				}
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
											nameContact: data.receiverName,
											phoneContact: data.receiverPhone,
											pricePoints: pointsOrder,
											deliveryAddress:
												data.receiverAddress,
											deliveryDate: data.receiverDate,
											scheduleAvailable:
												data.receiverHour,
											deliveryMessage: data.description,
											idOrderState: 1, //estado pendiente
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
													ruta: '/admin/pedidos/nuevo',
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
														ruta: '/admin/pedidos',
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
	},
	getById: function (con, id, callback) {
		con.query(
			`SELECT orders.*,clients.email, orderstate.* FROM orders JOIN clients,orderstate WHERE orders.id = '${id}' AND clients.id = orders.idClient AND orderstate.id = orders.idOrderState`,
			(error, results) => {
				if (error) throw error;
				callback(null, results);
			}
		);
	},

	update: function (con, data, id, callback) {
		con.query(
			`SELECT idOrderState, idReward FROM orders WHERE id = '${id}'`,
			(error, results, fields) => {
				if (error) throw error;
				console.log(results);
				let actualState = results[0].idOrderState;
				let idReward = results[0].idReward;
				if (actualState == 5 && data.orderState != 5) {
					con.query(
						`SELECT pricePoints FROM rewards WHERE id in (${idReward})`,
						(error2, results2, fields) => {
							if (error2) throw error2;
							let pointsOrder = 0;
							for (let i = 0; i < results2.length; i++) {
								pointsOrder += results2[i].pricePoints;
							}
							con.query(
								`SELECT points FROM clients WHERE email= '${data.emailClient}'`,
								(error3, results3, fields) => {
									if (error3) throw error3;
									let pointsClient = results3[0].points;
									let totalPoints =
										pointsClient - pointsOrder;
									console.log(totalPoints);

									if (totalPoints >= 0) {
										con.query(
											`UPDATE clients SET points='${totalPoints}' WHERE email= '${data.emailClient}'`,
											(error4) => {
												if (error4) throw error4;
												con.query(
													`UPDATE orders SET nameContact = '${data.receiverName}', phoneContact ='${data.receiverPhone}',deliveryDate='${data.receiverDate}' ,scheduleAvailable = '${data.receiverHour}', deliveryAddress = '${data.receiverAddress}', deliveryMessage='${data.description}', idOrderState = '${data.orderState}' WHERE id='${id}'`,
													(error, results) => {
														if (error) throw error;
														if (results) {
															return callback(
																null,
																{
																	data: false,
																	state: false,
																	alert: true,
																	alertTitle:
																		'Actualizado correctamente',
																	alertMessage:
																		'',
																	alertIcon:
																		'success',
																	showConfirmButton: true,
																	timer: 5000,
																	ruta: '/admin/pedidos',
																}
															);
														}
													}
												);
											}
										);
									} else {
										return callback(null, {
											data: false,
											state: false,
											alert: true,
											alertTitle:
												'El cliente no tiene puntos suficientes para devolver esta orden',
											alertMessage: '',
											alertIcon: 'error',
											showConfirmButton: true,
											timer: 5000,
											ruta: '/admin/pedidos',
										});
									}
								}
							);
						}
					);
				} else if (data.orderState == 5) {
					console.log('entra aca');
					con.query(
						`SELECT pricePoints FROM rewards WHERE id in (${data.inCart})`,
						(error, results, fields) => {
							if (error) throw error;
							let pointsOrder = 0;
							for (let i = 0; i < results.length; i++) {
								pointsOrder += results[i].pricePoints;
							}
							con.query(
								`SELECT points FROM clients WHERE email= '${data.emailClient}'`,
								(error, results, fields) => {
									if (error) throw error;
									let pointsFinal =
										pointsOrder + results[0].points;
									con.query(
										`UPDATE clients SET points='${pointsFinal}' WHERE email= '${data.emailClient}'`,
										(error2) => {
											if (error2) throw error2;
											con.query(
												`UPDATE orders SET nameContact = '${data.receiverName}', phoneContact ='${data.receiverPhone}',deliveryDate='${data.receiverDate}' ,scheduleAvailable = '${data.receiverHour}', deliveryAddress = '${data.receiverAddress}', deliveryMessage='${data.description}', idOrderState = '${data.orderState}' WHERE id='${id}' `,
												(error3) => {
													if (error3) throw error3;
													return callback(null, {
														data: false,
														state: false,
														alert: true,
														alertTitle:
															'Actualizado correctamente',
														alertMessage: '',
														alertIcon: 'success',
														showConfirmButton: true,
														timer: 5000,
														ruta: '/admin/pedidos',
													});
												}
											);
										}
									);
								}
							);
						}
					);
				} else {
					con.query(
						`UPDATE orders SET nameContact = '${data.receiverName}', phoneContact ='${data.receiverPhone}',deliveryDate='${data.receiverDate}' ,scheduleAvailable = '${data.receiverHour}', deliveryAddress = '${data.receiverAddress}', deliveryMessage='${data.description}', idOrderState = '${data.orderState}' WHERE id='${id}'`,
						(error, results) => {
							if (error) throw error;
							if (results) {
								return callback(null, {
									data: false,
									state: false,
									alert: true,
									alertTitle: 'Actualizado correctamente',
									alertMessage: '',
									alertIcon: 'success',
									showConfirmButton: true,
									timer: 5000,
									ruta: '/admin/pedidos',
								});
							}
						}
					);
				}
			}
		);
	},

	getListByClient: function (con, id, callback) {
		con.query(
			`SELECT orders.id, DATE_FORMAT(orders.orderDate, "%d/%m/%Y") as orderDate, orders.deliveryDate, clients.email, orderstate.stateName FROM orders JOIN clients ON orders.idClient = clients.id JOIN orderstate ON orders.idOrderState=orderstate.id WHERE clients.id = ${id}`,
			(error, results) => {
				if (error) throw error;
				console.log(results);
				callback(null, results);
			}
		);
	},
};
