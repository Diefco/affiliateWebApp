module.exports = {
	get: function (con, callback) {
		con.query(
			'SELECT * FROM `purchases` JOIN `clients` ON `purchases`.idClient = `clients`.id',

			// SELECT * FROM `purchases` INNER JOIN `clients` ON `purchases`.id= `clients`.id

			callback
		);
	},
};
