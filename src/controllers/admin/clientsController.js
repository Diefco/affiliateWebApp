const AdminClients = require('../../models/admin/clientsModel.js');

module.exports = {
	index: (req, res) => {
		// renderiza el view .ejs:
		if (req.session.loggedin) {
			return res.render('admin/clientList', {
				arrayClientes: [
					{ id: '1', nombre: 'Juan', correo: 'alt@yahoo.com' },
					{ id: '2', nombre: 'Pedro', correo: 'sgag@hotmail.com' },
					{ id: '3', nombre: 'Carlos', correo: 'agggggg@gmail.com' },
				],
			});
		}

		res.redirect('/admin/');
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
