module.exports = {
	get: function (con, id, callback) {
		con.query(
			`SELECT rewards.*,clients.points  FROM rewards JOIN clients WHERE clients.id=${id}`,
			callback
		);
	},
};
