const AdminOrder = require('../../models/admin/orderModel.js');

module.exports = {
	index: (req, res) => {
		// renderiza el view .ejs:
		if (req.session.loggedin) {
			res.render('admin/orderList');
		} else {
			// No tiene sesión
			res.redirect('/admin/');
		}
	},
	getList: (req, res) => {
		if (req.session.loggedin) {
			AdminOrder.get(req.con, (err, results) => {
				res.send(results);
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},
	getListByRewards: (req, res) => {
		if (req.session.loggedin) {
			AdminOrder.getListByRewards(
				req.con,
				req.params.id,
				(err, results) => {
					console.log(results);
					res.send(results);
				}
			);
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	new: (req, res) => {
		if (req.session.loggedin) {
			return res.render('admin/orderCreate');
		}

		res.redirect('/admin/');
	},

	create: (req, res) => {
		if (req.session.loggedin) {
			// Definimidos el idAdmin para la consulta en BD.
			req.body.idAdmin = req.session.idUser;

			AdminOrder.create(req.con, req.body, (err, results) => {
				if (results.state === false) {
					return res.render('admin/orderCreate', results);
				} else {
					// State = true
					res.render('admin/orderCreate', results);
				}
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	destroy: (req, res) => {
		if (req.session.loggedin) {
			AdminOrder.destroy(req.con, req.params.id, (err, results) => {
				res.redirect('/admin/pedidos');
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	edit: (req, res) => {
		AdminOrder.getById(req.con, req.params.id, (err, rows) => {
			res.render('admin/orderDetail', { data: rows[0] });
		});
	},

	getListByClient: (req, res) => {
		if (req.session.loggedin) {
			AdminOrder.getListByClient(
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

	update: (req, res) => {
		if (req.session.loggedin) {
			AdminOrder.update(
				req.con,
				req.body,
				req.params.id,
				(err, results) => {
					if (err) throw err;
					console.log(results);
					res.render(`admin/orderDetail`, results);
				}
			);
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},
};
