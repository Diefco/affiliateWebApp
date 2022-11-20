const uploadFile = require('../../../uploadFile.js');

module.exports = {
	get: function (con, callback) {
		con.query('SELECT * FROM rewards', callback);
	},
	getById: function (con, id, callback) {
		// con.query(`SELECT * FROM clients WHERE id = ${id}`, callback);
	},
	create: function (con, data, callback) {
		// console.log('data models', data);

		uploadFile(data, (fileName) => {
			data.body.fechaFinalizacion = new Date(data.body.fechaFinalizacion);

			con.query(
				'INSERT INTO rewards SET ?',
				{
					nameReward: data.body.name,
					image: fileName,
					description: data.body.description,
					pricePoints: data.body.points,
					finishDate: data.body.fechaFinalizacion,
				},
				(error, results, fields) => {
					if (error) throw error;
					// Si la consulta no devuelve datos
					if (!results) {
						return callback(null, {
							state: false,
							alert: true,
							alertTitle: '¡Ups!...',
							alertMessage: 'El premio no pudo ser creada',
							alertIcon: 'error',
							showConfirmButton: true,
							timer: 5000,
							ruta: '/admin/premios/nuevo',
						});
					} else {
						// Si la consulta devuelve datos
						return callback(null, {
							state: true,
							alert: true,
							alertTitle: `El premio ${data.body.name} fue creado con exito.`,
							alertMessage: '',
							alertIcon: 'success',
							showConfirmButton: true,
							timer: 5000,
							ruta: '/admin/premios',
						});
					}
				}
			);
		});
	},
	// update: function (con, data, id, callback) {
	// 	// con.query(
	// 	// 	`UPDATE clients SET email ='${data.email}', name ='${data.name}', phone ='${data.phone}', address ='${data.address}' WHERE id = ${id}`,
	// 	// 	(error) => {
	// 	// 		if (error) throw error;
	// 	// 		return callback(null);
	// 	// 	}
	// 	// );
	// },
	// destroy: function (con, id) {
	// 	// con.query(`DELETE FROM clients WHERE id = ${id}`, (error, results) => {
	// 	// 	if (error) throw error;
	// 	// });
	// },
};
