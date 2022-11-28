const AdminOrders = require('../models/ordersModel.js');

module.exports = {
	index: (req, res) => {
		if (req.session.loggedin) {
			res.render('orders');
		} else {
			// El usuario no tiene sessión
			res.send('No hay datos disponibles.');
		}
	},
	getListById: (req, res) => {
		if (req.session.loggedin) {
			AdminOrders.getListById(
				req.con,
				req.session.idUser,
				(error, results) => {
					if (error) throw error;
					console.log(results);
					res.send(results);
				}
			);
		} else {
			// El usuario no tiene sessión
			res.send('No hay datos disponibles.');
		}
	},

	getDetailOrders: (req, res) => {
		console.log('entra a controller');
		if (req.session.loggedin) {
			AdminOrders.getDetailOrders(req.con, req.params.id, (err, rows) => {
				res.render('ordersDetail', { data: rows[0] });
			});
		} else {
			// El usuario no tiene sessión
			res.send('No hay datos disponibles.');
		}
	},
	getListByRewards: (req, res) => {
		if (req.session.loggedin) {
			AdminOrders.getListByRewards(
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
};
