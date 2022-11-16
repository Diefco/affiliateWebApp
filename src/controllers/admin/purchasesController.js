const AdminPurchases = require('../../models/admin/purchasesModel.js');

module.exports = {
	index: (req, res) => {
		// renderiza el view .ejs:
		if (req.session.loggedin) {
			res.render('admin/purchasesList');
		} else {
			// No tiene sesión
			res.redirect('/admin/');
		}
	},
	getList: (req, res) => {
		if (req.session.loggedin) {
			AdminPurchases.get(req.con, (err, results) => {
				res.send(results);
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},
	new: (req, res) => {
		if (req.session.loggedin) {
			return res.render('admin/purchasesCreate');
		}
		res.redirect('/admin/');
	},
	create: (req, res) => {
		if (req.session.loggedin) {
			AdminPurchases.create(req.con, req.body, (err, results) => {
				if (results.state === false) {
					return res.render('admin/purchasesCreate', {
						alert: true,
						alertTitle: '¡Ups!...',
						alertMessage: results.msg,
						alertIcon: 'error',
						showConfirmButton: true,
						timer: 5000,
						ruta: '/admin/compras/nueva',
					});
				} else {
					// State = true
					res.render('admin/purchasesCreate', {
						alert: true,
						alertTitle: '¡Bien! creación exitosa',
						alertMessage: results.msg,
						alertIcon: 'success',
						showConfirmButton: true,
						timer: 5000,
						ruta: '/admin/compras',
					});
				}
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	edit: (req, res) => {
		AdminPurchases.getById(req.con, req.params.id, (err, rows) => {
			res.render('admin/purchasesDetail', { data: rows[0] });
		});
	},
	update: (req, res) => {
		if (req.session.loggedin) {
			AdminPurchases.update(req.con, req.body, req.params.id, (err) => {
				if (err) throw err;
				res.redirect('/admin/compras/');
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	getListByClient: (req, res) => {
		if (req.session.loggedin) {
			AdminPurchases.getListByClient(
				req.con,
				req.params.id,
				(err, results) => {
					res.send(results);
				}
			);
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	destroy: (req, res) => {
		if (req.session.loggedin) {
			AdminPurchases.destroy(
				req.con,
				req.params.id,
				(err, results) => {}
			);
		} else {
			// El usuario no tiene sessión
			return res.redirect('/admin/');
		}
	},
};
