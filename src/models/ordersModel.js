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
};
