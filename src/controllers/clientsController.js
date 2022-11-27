const AdminClients = require('../models/clientsModel.js');

module.exports = {
	index: (req, res) => {
		if (req.session.loggedin) {
			AdminClients.get(req.con, req.session, (error, results) => {
				res.render('myAccount', { data: results });
			});
		} else {
			res.redirect('/');
		}
	},
	update: (req, res) => {
		if (req.session.loggedin) {
			AdminClients.update(
				req.con,
				req.body,
				req.session.idUser,
				(err, results) => {
					if (err) throw err;
					res.render('myAccount', results);
				}
			);
		} else {
			// El usuario no tiene sessión
			res.redirect('/');
		}
	},
};
