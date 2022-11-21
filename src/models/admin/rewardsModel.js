const uploadFile = require('../../../uploadFile.js');

module.exports = {
	get: function (con, callback) {
		con.query('SELECT * FROM rewards', callback);
	},
	getById: function (con, id, callback) {
		con.query(
			`SELECT id, nameReward, image, pricePoints, description, DATE_FORMAT(finishDate, "%d/%m/%Y") as finishDate FROM rewards WHERE id = ${id}`,
			(error, results) => {
				if (error) throw error;

				callback(null, results);
			}
		);
	},
	create: function (con, data, callback) {
		// console.log('data models', data);
		uploadFile(data, (fileName) => {
			// Guardamos como fecha
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
	update: function (con, data, id, callback) {
		// uploadFile(data, (fileName, fechaFinalizacion) => {
		// Guardamos como fecha
		console.log(data);

		data.fechaFinalizacion = new Date(data.fechaFinalizacion);
		data.fechaFinalizacion = JSON.stringify(data.fechaFinalizacion);
		console.log(data.fechaFinalizacion);

		con.query(
			`UPDATE rewards SET nameReward ='${data.name}', description ='${data.description}', pricePoints ='${data.points}', finishDate=${data.fechaFinalizacion} WHERE id = ${id}`,
			(error) => {
				if (error) throw error;
				return callback(null);
			}
		);
		// });
	},
	// destroy: function (con, id) {
	// 	// con.query(`DELETE FROM clients WHERE id = ${id}`, (error, results) => {
	// 	// 	if (error) throw error;
	// 	// });
	// },
};
