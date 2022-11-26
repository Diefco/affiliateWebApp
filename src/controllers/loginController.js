const ClientLogin = require('../models/loginModel.js');

// Primera URL para el usuario logeado
const homeClient = '/mi-cuenta';

module.exports = {
	index: (req, res) => {
		// Renderiza el view .ejs:
		if (req.session.loggedin) {
			return res.redirect(homeClient);
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
	password: (req, res) => {
		res.render('forgotPassword');
	},
	passwordAuth: (req, res) => {
		ClientLogin.passwordAuth(req.con, req.body, (err, results) => {
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
		});
	},
	logout: (req, res) => {
		req.session = null;
		res.redirect(homeClient);
	},
};
