const AdminRewards = require('../models/rewardsModel.js');

module.exports = {
	index: (req, res) => {
		if (req.session.loggedin) {
			AdminRewards.get(req.con, req.session.idUser, (error, results) => {
				if (error) throw error;
				res.render('rewards', { data: results });
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/');
		}
	},
	getList: (req, res) => {
		if (req.session.loggedin) {
			AdminRewards.getList(
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
