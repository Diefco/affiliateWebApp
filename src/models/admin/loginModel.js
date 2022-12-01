const bcryptjs = require('bcryptjs');

module.exports = {
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
					// Enviamos mensaje y data para la sesión.
					return callback(null, {
						auth: true,
						msg: 'El correo y contraseña son correctos',
						sessionIdUser: results[0].id,
						sessionIdAdmin: results[0].id,
						sessionEmail: results[0].email,
					});
				}
			);
		} else {
			return callback(null, {
				auth: false,
				msg: 'Algo no esta bien. Revisa la información suministrada.',
			});
		}
	},
};
