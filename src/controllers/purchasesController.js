const AdminPurchases = require('../models/purchasesModel.js');

module.exports = {
	index: (req, res) => {
		res.render('myPurchases');
	},
	getList: (req, res) => {
		if (req.session.loggedin) {
			AdminPurchases.getList(
				req.con,
				req.session.idUser,
				(err, results) => {
					if (err) throw err;
					res.send(results);
				}
			);
		} else {
			// El usuario no tiene sessión
			res.send('No hay datos disponibles.');
		}
	},
};
