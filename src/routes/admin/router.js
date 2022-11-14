const express = require('express');
const clientsController = require('../../controllers/admin/clientsController');
const purchasesController = require('../../controllers/admin/purchasesController');
const router = express.Router();
const adminController = require('../../controllers/admin/loginController');

/* Login */
router.get('/', adminController.index);
// Validación de datos del login
router.post('/auth', adminController.validate);
// Destruir sesión
router.get('/logout', adminController.logout);

/* Clientes */
// Vista listado de clientes
router.get('/clientes', clientsController.index);
// Api consumo lista de clientes = clientList
router.get('/clientList', clientsController.getList);
//vista crear clientes
router.get('/clientes/nuevo', clientsController.newClient);
//Consulta crear cliente
router.post('/clientes/nuevoCliente', clientsController.create);
// Vista editar cliente
router.get('/clientes/edit/:id', clientsController.edit);
//Consulta crear cliente
router.post('/clientes/edit/:id/update', clientsController.update);
//Eliminar cliente por id
router.delete('/clientes/delete/:id', clientsController.destroy);

//Compras
//Vista listado de compras
router.get('/compras', purchasesController.index);
//Api consumo lista de compras = comprasList
router.get('/comprasList', purchasesController.getList);
// router.post('/', adminController.store);
// router.get('/:id/edit', adminController.edit);
// router.put('/:id', adminController.update);
// router.delete('/:id', adminController.destroy);
module.exports = router;
