//const AdminOrder = require('../../models/admin/orderModel.js');

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
		//AdminOrder.getById(req.con, req.params.id, (err, rows) => {
		res.render('admin/orderDetail', {
			data: {
				emailClient: 'email@test.com',
				receiverPhone: '3004448484',
				datePurchase: '13/15/2022',
				receiverHour: '19:30',
				receiverAddress:
					'Calle Larga Test #152-47 Conjunto Residencial Prueba T1 APTO 1008',
				receiverName: 'Pedrita Molina',
				description:
					'Este pedido debe marcar el producto 1,3 y 4 (no existe)',
				inCart: '1,3,4',
			},
		});
		//});
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

	update: (req, res) => {
		if (req.session.loggedin) {
			AdminOrder.update(req.con, req.body, req.params.id, (err) => {
				if (err) throw err;
				res.redirect('/admin/pedidos/');
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},
};
