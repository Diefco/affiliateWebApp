const nodemailerSend = require('../config/nodemailer');
module.exports = {
	getListById: (con, id, callback) => {
		con.query(
			`SELECT orders.id, DATE_FORMAT(orders.orderDate, "%d/%m/%Y") as orderDate, orders.deliveryDate, clients.email, orderstate.stateName FROM orders JOIN clients ON orders.idClient = clients.id JOIN orderstate ON orders.idOrderState=orderstate.id WHERE clients.id = ${id}`,
			(error, results) => {
				if (error) throw error;
				console.log(results);
				callback(null, results);
			}
		);
	},

	getDetailOrders: (con, id, callback) => {
		con.query(
			`SELECT orders.*,clients.email, orderstate.* FROM orders JOIN clients,orderstate WHERE orders.id = '${id}' AND clients.id = orders.idClient AND orderstate.id = orders.idOrderState`,
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
				`SELECT clients.id , clients.points, clients.name, admin.email FROM clients JOIN admin ON admin.id = clients.idAdmin WHERE clients.email = '${data.email}'`,
				(error, results, fields) => {
					if (error) throw error;
					if (results.length > 0) {
						let idClient = results[0].id;
						let pointsClient = results[0].points;

						if (data.inOrder !== '') {
							con.query(
								`SELECT pricePoints FROM rewards WHERE id in (${data.inOrder})`,
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
											ruta: '/pedidos',
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
											idReward: data.inOrder,
											idClient: idClient,
										},
										(error4, results4, fields) => {
											if (error4) throw error4;

											const mailSubject =
												'¡Mira cuantos puntos!';

											const mailHTML = `<h1 style="text-align:center; color:#333333;">Hola administrador,</h1>
												<p style="text-align:center; color:#333333;"><b>El liente ${results[0].name}  ha canjeado sus puntos y ha realizado un nuevo pedido.</b>
												<p 
												</b>
												<b><p style="text-align:center; color:#333333;"> 
												Puedes revisarlo en la siguiente url:
												<a href="https://mispuntos.susyreposteria.com/admin/pedidos
												"style="color:#E61B76 "text-align:center">https://mispuntos.susyreposteria.com/admin/pedidos
												</a></p></b>
												<p style="text-align:center; color:#333333;">¡Gracias por confiar en nosotros! <br/>`;

											nodemailerSend(
												results[0].email,
												mailSubject,
												mailHTML
											).catch(console.log(error));

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
													ruta: '/pedidos',
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
														ruta: '/pedidos',
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
								ruta: '/pedidos',
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
							ruta: '/pedidos',
						});
					}
				}
			);
		}
	},
};
