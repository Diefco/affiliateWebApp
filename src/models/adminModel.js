const bcryptjs = require('bcryptjs');

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
					// Validamos si es undefined = no encontro el correo
					if (results[0] === undefined) {
						return callback(null, {
							auth: false,
							msg: 'El correo o contraseña no son correctos',
						});
					}
					// Comparamos la contraseña enviada por el usar con la bd.
					if (
						!bcryptjs.compareSync(
							data.password,
							results[0].password
						)
					) {
						return callback(null, {
							auth: false,
							msg: 'El correo o contraseña no son correctos',
						});
					}
					// Encontro el correo y la contraseña es correcta.
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
