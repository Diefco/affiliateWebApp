const AdminReward = require('../../models/admin/rewardsModel.js');

module.exports = {
	index: (req, res) => {
		// renderiza el view .ejs:
		if (req.session.loggedin && req.session.idAdmin) {
			res.render('admin/rewardsList');
		} else {
			// No tiene sesión
			res.redirect('/admin/');
		}
	},
	getList: (req, res) => {
		if (req.session.loggedin && req.session.idAdmin) {
			AdminReward.get(req.con, (err, results) => {
				res.send(results);
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	new: (req, res) => {
		if (req.session.loggedin && req.session.idAdmin) {
			return res.render('admin/rewardsCreate');
		}

		res.redirect('/admin/');
	},

	create: (req, res) => {
		if (req.session.loggedin && req.session.idAdmin) {
			// Definimidos el idAdmin para la consulta en BD.
			req.body.idAdmin = req.session.idUser;
			AdminReward.create(req.con, req, (err, results) => {
				return res.render('admin/rewardsCreate', results);
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	destroy: (req, res) => {
		if (req.session.loggedin && req.session.idAdmin) {
			AdminReward.destroy(req.con, req.params.id, (err, results) => {
				res.redirect('/admin/premios');
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	edit: (req, res) => {
		if (req.session.loggedin && req.session.idAdmin) {
			AdminReward.getById(req.con, req.params.id, (err, rows) => {
				res.render('admin/rewardsDetail', { data: rows[0] });
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	update: (req, res) => {
		if (req.session.loggedin && req.session.idAdmin) {
			AdminReward.update(req.con, req, req.params.id, (err) => {
				if (err) throw err;
				res.redirect('/admin/premios/');
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},
};
