const ClientLogin = require('../models/loginModel.js');

// Primera URL para el usuario logeado
const homeClient = '/premios';

module.exports = {
	index: (req, res) => {
		// Renderiza el view .ejs:
		if (req.session.loggedin) {
			res.redirect(homeClient);
		} else {
			res.render('login');
		}
	},
	validate: (req, res) => {
		ClientLogin.auth(req.con, req.body, (err, results) => {
			if (results.auth === false) {
				// Fallo autenticación, renderiza el view .ejs:
				res.render('login', results);
			} else {
				// autenticación correcta, creamos sesión
				req.session.loggedin = true;
				req.session.idUser = results.sessionIdUser;
				req.session.email = results.sessionEmail;

				//ToDo: Cambiar a /mi-cuenta/pedidos/
				res.redirect(homeClient);
			}
		});
	},
	forgotPassword: (req, res) => {
		res.render('forgotPassword');
	},
	forgotPasswordAuth: (req, res) => {
		ClientLogin.forgotPasswordAuth(
			req.con,
			req.body,
			req.protocol + '://' + req.headers.host,
			(err, results) => {
				if (results.auth === false) {
					// Fallo autenticación, renderiza el view .ejs:
					res.render('forgotPassword', results);
				} else {
					// autenticación correcta, creamos sesión
					req.session.loggedin = true;
					req.session.idUser = results.sessionIdUser;
					req.session.email = results.sessionEmail;

					//ToDo: Cambiar a /mi-cuenta/pedidos/
					res.redirect(homeClient);
				}
			}
		);
	},
	resetPassword: (req, res) => {
		ClientLogin.resetPassword(req.con, req.params, (err, results) => {
			res.render('resetPassword', results);
		});
	},
	resetPasswordAuth: (req, res) => {
		ClientLogin.resetPasswordAuth(
			req.con,
			req.params,
			req.body,
			(err, results) => {
				res.render('resetPassword', results);
			}
		);
	},
	logout: (req, res) => {
		req.session = null;
		res.redirect(homeClient);
	},
};
