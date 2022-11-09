const AdminLogin = require('../../models/admin/loginModel.js');

// Primera URL para el usuario logeado
const homeAdmin = '/admin/clientes';

module.exports = {
	index: (req, res) => {
		// renderiza el view .ejs:
		if (req.session.loggedin) {
			return res.redirect(homeAdmin);
		}
		res.render('admin/login');
	},
	validate: (req, res) => {
		AdminLogin.auth(req.con, req.body, (err, results) => {
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
				// autenticación correcta, creamos sesión
				req.session.loggedin = true;
				req.session.idUser = results.sessionIdUser;
				req.session.email = results.sessionEmail;
				//ToDo: Cambiar a /admin/pedidos/
				res.redirect(homeAdmin);
			}
		});
	},
	logout: (req, res) => {
		req.session = null;
		res.redirect(homeAdmin);
	},
};
