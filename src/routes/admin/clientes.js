const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('admin/clientes', {
		arrayClientes: [
			{ id: '1', nombre: 'Juan', correo: 'alt@yahoo.com' },
			{ id: '2', nombre: 'Pedro', correo: 'sgag@hotmail.com' },
			{ id: '3', nombre: 'Carlos', correo: 'agggggg@gmail.com' },
		],
	});
});

module.exports = router;
