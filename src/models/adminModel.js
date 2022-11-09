module.exports = {
	// get: function (con, callback) {
	// 	con.query('SELECT * FROM admin', callback);
	// },

	// getById: function (con, id, callback) {
	// 	con.query(`SELECT * FROM admin WHERE id = ${id}`, callback);
	// },

	auth: (con, data, callback) => {
		if (data.email && data.password) {
			con.query(
				`SELECT * FROM admin WHERE email = '${data.email}'`,
				(error, results, fields) => {
					if (error) throw error;
					if (
						results[0] === undefined ||
						data.password != results[0].password
					) {
						return callback(null, {
							auth: false,
							msg: 'El correo o contraseña no son correctos',
						});
					}
					return callback(null, {
						auth: true,
						msg: 'El correo y contraseña son correctos',
					});
				}
			);
		}
	},

	// create: function (con, data, callback) {
	// 	con.query(
	// 		`INSERT INTO admin SET
	// 		email = '${data.email}',
	// 		password = '${data.password}'`,
	// 		callback
	// 	);
	// },

	// update: function (con, data, id, callback) {
	// 	con.query(
	// 		`UPDATE admin SET
	// 		email = '${data.email}',
	// 		password = '${data.password}'
	// 		WHERE id_admin = ${id}`,
	// 		callback
	// 	);
	// },

	// destroy: function (con, id, callback) {
	// 	con.query(`DELETE FROM admin WHERE id_admin = ${id}`, callback);
	// },
};
