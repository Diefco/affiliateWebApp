const AdminClients = require('../../models/admin/clientsModel.js');

module.exports = {
	index: (req, res) => {
		// renderiza el view .ejs:
		if (req.session.loggedin) {
			res.render('admin/clientList');
		} else {
			// No tiene sesión
			res.redirect('/admin/');
		}
	},
	getList: (req, res) => {
		if (req.session.loggedin) {
			AdminClients.get(req.con, (err, results) => {
				res.send(results);
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	new: (req, res) => {
		if (req.session.loggedin) {
			return res.render('admin/clientCreate');
		}

		res.redirect('/admin/');
	},

	create: (req, res) => {
		if (req.session.loggedin) {
			// Definimidos el idAdmin para la consulta en BD.
			req.body.idAdmin = req.session.idUser;

			AdminClients.create(req.con, req.body, (err, results) => {
				if (results.state === false) {
					return res.render('admin/clientCreate', {
						alert: true,
						alertTitle: '¡Ups!...',
						alertMessage: results.msg,
						alertIcon: 'error',
						showConfirmButton: true,
						timer: 5000,
						ruta: '/admin/clientes/nuevo',
					});
				} else {
					// State = true
					res.render('admin/clientCreate', {
						alert: true,
						alertTitle: '¡Bien! creación exitosa',
						alertMessage: results.msg,
						alertIcon: 'success',
						showConfirmButton: true,
						timer: 5000,
						ruta: '/admin/clientes',
					});
				}
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	destroy: (req, res) => {
		if (req.session.loggedin) {
			AdminClients.destroy(req.con, req.params.id, (err, results) => {
				console.log('controllerLog', results);
				console.log('Entra a callback de destroy en controller');
				res.redirect('/admin/clientes');
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	edit: (req, res) => {
		AdminClients.getById(req.con, req.params.id, (err, rows) => {
			console.log(rows);
			res.render('admin/clientDetail', { data: rows[0] });
		});
	},

	update: (req, res) => {
		if (req.session.loggedin) {
			AdminClients.update(req.con, req.body, req.params.id, (err) => {
				if (err) throw err;
				res.redirect('/admin/clientes/');
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},
};
