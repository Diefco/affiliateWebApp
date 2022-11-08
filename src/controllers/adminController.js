Admin = require('../models/adminModel.js');

module.exports = {
	index: (req, res) => {
		res.render('admin/login');
	},
	validate: async (req, res) => {
		console.log(req.body);
		// console.log('RES________________________________');
		// console.log(res);
		// Admin.getByEmail(req.con, (err, rows) => {
		// 	console.log(rows);
		// });
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
