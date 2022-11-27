module.exports = {
	getList: (con, id, callback) => {
		con.query(
			`SELECT purchases.id, DATE_FORMAT(purchases.datePurchase, "%d/%m/%Y") as datePurchase, purchases.namePurchase, purchases.valuePurchase, purchases.pointsPurchase FROM purchases JOIN clients ON purchases.idClient = clients.id WHERE clients.id = ${id}`,
			(error, results) => {
				if (error) throw error;

				console.log(results);
				callback(null, results);
			}
		);
	},
};
