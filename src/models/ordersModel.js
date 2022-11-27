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
};
