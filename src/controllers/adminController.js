const Admin = require('../models/adminModel.js');
const session = require('express-session');

module.exports = {
	index: (req, res) => {
		// renderiza el view .ejs:
		res.render('admin/login');
	},
	validate: (req, res) => {
		Admin.auth(req.con, req.body, (err, results) => {
			if (results.auth === false) {
				// Fallo autenticación, renderiza el view .ejs:
				res.render('admin/login', {
					alert: true,
					alertTitle: 'Ups...',
					alertMessage: results.msg,
					alertIcon: 'error',
					showConfirmButton: true,
					timer: 3000,
					ruta: 'admin/',
				});
			} else {
				// autenticación correcta
				req.session.loggedin = true;
				req.session.idUser = results.sessionIdUser;
				req.session.email = results.sessionEmail;
				//ToDo: Cambiar a /admin/pedidos/
				res.redirect('/admin/clientes');
			}
		});
	},

	// create: (req, res) => {
	// 	res.render('admin/create');
	// },

	// store: (req, res) => {
	// 	Admin.create(req.con, req.body, (err) => {
	// 		res.redirect('/admin');
	// 	});
	// },

	// edit: (req, res) => {
	// 	Admin.getById(req.con, req.params.id, (err, rows) => {
	// 		res.render('admin/edit', { data: rows[0] });
	// 	});
	// },

	// update: (req, res) => {
	// 	Admin.update(req.con, req.body, req.params.id, (err) => {
	// 		res.redirect('/admin');
	// 	});
	// },

	// destroy: (req, res) => {
	// 	Admin.destroy(req.con, req.params.id, (err) => {
	// 		res.redirect('/admin');
	// 	});
	// },
};
