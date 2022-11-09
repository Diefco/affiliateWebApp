const express = require('express');
const clientsController = require('../../controllers/admin/clientsController');
const router = express.Router();
const adminController = require('../../controllers/admin/loginController');

/* Login */
router.get('/', adminController.index);
router.post('/auth', adminController.validate);
router.get('/logout', adminController.logout);

/* Clientes */
router.get('/clientes', clientsController.index);

// router.get('/create', adminController.create);
// router.post('/', adminController.store);
// router.get('/:id/edit', adminController.edit);
// router.put('/:id', adminController.update);
// router.delete('/:id', adminController.destroy);
module.exports = router;
