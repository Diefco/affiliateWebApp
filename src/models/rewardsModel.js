module.exports = {
	get: function (con, id, callback) {
		con.query(
			`SELECT rewards.*,clients.points, clients.email  FROM rewards JOIN clients WHERE clients.id=${id}`,
			callback
		);
	},
};
