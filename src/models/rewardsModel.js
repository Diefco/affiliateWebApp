module.exports = {
	get: function (con, id, callback) {
		con.query(
			//`SELECT rewards.*,clients.points, clients.email FROM rewards JOIN clients WHERE clients.id=${id}`,
			`SELECT points, email FROM clients WHERE id='${id}'`,
			(error, resultClientes) => {
				if (error) throw error;

				con.query(`SELECT * FROM rewards`, (error2, resultRewards) => {
					if (error2) throw error2;

					const results = {
						cliente: {
							email: resultClientes[0].email,
							points: resultClientes[0].points,
						},
						rewards: resultRewards || false,
					};

					callback(null, results);
				});
			}
		);
	},
};
