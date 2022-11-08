module.exports = {
	// get: function (con, callback) {
	// 	con.query('SELECT * FROM admin', callback);
	// },

	// getById: function (con, id, callback) {
	// 	con.query(`SELECT * FROM admin WHERE id = ${id}`, callback);
	// },

	getByEmail: function (con, email, callback) {
		con.query(`SELECT email FROM admin WHERE email = ${email}`, callback);
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
