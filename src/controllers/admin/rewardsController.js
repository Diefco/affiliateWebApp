const AdminReward = require('../../models/admin/rewardsModel.js');

module.exports = {
	index: (req, res) => {
		// renderiza el view .ejs:
		if (req.session.loggedin) {
			res.render('admin/rewardsList');
		} else {
			// No tiene sesión
			res.redirect('/admin/');
		}
	},
	getList: (req, res) => {
		if (req.session.loggedin) {
			AdminReward.get(req.con, (err, results) => {
				res.send(results);
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	new: (req, res) => {
		if (req.session.loggedin) {
			return res.render('admin/rewardsCreate');
		}

		res.redirect('/admin/');
	},

	create: (req, res) => {
		if (req.session.loggedin) {
			// Definimidos el idAdmin para la consulta en BD.
			req.body.idAdmin = req.session.idUser;

			AdminReward.create(req.con, req.body, (err, results) => {
				if (results.state === false) {
					return res.render('admin/rewardsCreate', results);
				} else {
					// State = true
					res.render('admin/reawrdsCreate', results);
				}
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	destroy: (req, res) => {
		if (req.session.loggedin) {
			AdminReward.destroy(req.con, req.params.id, (err, results) => {
				res.redirect('/admin/premios');
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},

	edit: (req, res) => {
		AdminReward.getById(req.con, req.params.id, (err, rows) => {
			res.render('admin/rewardDetail', { data: rows[0] });
		});
	},

	update: (req, res) => {
		if (req.session.loggedin) {
			AdminReward.update(req.con, req.body, req.params.id, (err) => {
				if (err) throw err;
				res.redirect('/admin/premios/');
			});
		} else {
			// El usuario no tiene sessión
			res.redirect('/admin/');
		}
	},
};
