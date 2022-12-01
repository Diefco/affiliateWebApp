const uploadFile = require('../../../uploadFile.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	get: function (con, callback) {
		con.query('SELECT * FROM rewards', callback);
	},
	getById: function (con, id, callback) {
		con.query(
			`SELECT id, nameReward, image, pricePoints, description FROM rewards WHERE id = ${id}`,
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

			con.query(
				'INSERT INTO rewards SET ?',
				{
					nameReward: data.body.name,
					image: fileName,
					description: data.body.description,
					pricePoints: data.body.points,
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
		con.query(
			`SELECT image FROM rewards WHERE id = ${id}`,
			(error, results) => {
				if (error) throw error;
				let imageName = results[0].image;
				if (results === 'no-photo.jpg') {
					uploadFile(data, (fileName) => {
						// Guardamos como fecha

						con.query(
							`UPDATE rewards SET image='${fileName}', nameReward ='${data.body.name}', description ='${data.body.description}', pricePoints ='${data.body.points}' WHERE id = ${id}`,
							(error) => {
								if (error) throw error;
								return callback(null);
							}
						);
					});
				} else {
					uploadFile(data, (filename) => {
						// Guardamos como fecha
						if (filename === 'no-photo.jpg') {
							con.query(
								`UPDATE rewards SET image='${imageName}', nameReward ='${data.body.name}', description ='${data.body.description}', pricePoints ='${data.body.points}' WHERE id = ${id}`,
								(error) => {
									if (error) throw error;
									return callback(null);
								}
							);
						} else {
							if (imageName === 'no-photo.jpg') {
								con.query(
									`UPDATE rewards SET image='${filename}', nameReward ='${data.body.name}', description ='${data.body.description}', pricePoints ='${data.body.points}' WHERE id = ${id}`,
									(error) => {
										if (error) throw error;
										return callback(null);
									}
								);
							} else {
								// fs.unlinkSync(
								// 	path.join(
								// 		__dirname,
								// 		'../../assets/img/uploads/' + imageName
								// 	)
								// );

								con.query(
									`UPDATE rewards SET image='${filename}', nameReward ='${data.body.name}', description ='${data.body.description}', pricePoints ='${data.body.points}' WHERE id = ${id}`,
									(error) => {
										if (error) throw error;
										return callback(null);
									}
								);
							}
						}
					});
				}
			}
		);
	},
	destroy: function (con, id) {
		con.query(
			`SELECT image FROM rewards WHERE id = ${id}`,
			(error, results) => {
				if (error) throw error;
				let imageName = results[0].image;
				if (imageName == 'no-photo.jpg') {
					con.query(
						`DELETE FROM rewards WHERE id = ${id}`,
						(error) => {
							if (error) throw error;
						}
					);
				} else {
					// fs.unlinkSync(
					// 	path.join(
					// 		__dirname,
					// 		'../../assets/img/uploads/' + imageName
					// 	)
					// );
					con.query(
						`DELETE FROM rewards WHERE id = ${id}`,
						(error) => {
							if (error) throw error;
						}
					);
				}
			}
		);
	},
};
