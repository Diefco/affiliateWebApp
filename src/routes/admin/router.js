const express = require('express');
const adminController = require('../../controllers/admin/loginController');
const clientsController = require('../../controllers/admin/clientsController');
const purchasesController = require('../../controllers/admin/purchasesController');
const rewardsController = require('../../controllers/admin/rewardsController');
const ordersController = require('../../controllers/admin/ordersController');

const router = express.Router();

/* LOGIN */
router.get('/', adminController.index);
// Validación de datos del login
router.post('/auth', adminController.validate);
// Destruir sesión
router.get('/logout', adminController.logout);

/* CLIENTES */
// Vista listado de clientes
router.get('/clientes', clientsController.index);
// Api consumo lista de clientes = clientList
router.get('/clientList', clientsController.getList);
// Vista crear clientes
router.get('/clientes/nuevo', clientsController.new);
// Consulta crear cliente
router.post('/clientes/nuevoCliente', clientsController.create);
// Vista editar cliente
router.get('/clientes/edit/:id', clientsController.edit);
// Consulta actulizar cliente
router.post('/clientes/edit/:id/update', clientsController.update);
// Eliminar cliente por id
router.delete('/clientes/delete/:id', clientsController.destroy);

/* COMPRAS */
// Vista listado de compras
router.get('/compras', purchasesController.index);
// Api consumo lista de compras = comprasList
router.get('/comprasList', purchasesController.getList);
// Vista crear compra
router.get('/compras/nueva', purchasesController.new);
// Consulta crear compra
router.post('/compras/nuevaCompra', purchasesController.create);
// Vista editar compra
router.get('/compras/edit/:id', purchasesController.edit);
// Consulta actulizar compra
router.post('/compras/edit/:id/update', purchasesController.update);
// Lista de compras del cliente
router.get(
	'/clientes/edit/:id/comprasList',
	purchasesController.getListByClient
);
//delete compra
router.delete('/compras/delete/:id', purchasesController.destroy);

/* PREMIOS // RECOMPENSAS */
// Vista listado de premios
router.get('/premios', rewardsController.index);
// Api consumo lista de premios = rewardsList
router.get('/rewardList', rewardsController.getList);
// Vista crear premios
router.get('/premios/nuevo', rewardsController.new);
// Consulta crear premio
router.post('/premios/nuevoPremio', rewardsController.create);
// Vista editar premio
router.get('/premios/edit/:id', rewardsController.edit);
// Consulta update premio
router.post('/premios/edit/:id/update', rewardsController.update);
// Eliminar premio por id
router.delete('/premios/delete/:id', rewardsController.destroy);

/* PEDIDOS */
// Vista listado de pedidos
router.get('/pedidos', ordersController.index);
// Api consumo lista de pedidos = pedidosList
router.get('/orderList', ordersController.getList);
// Api get list por premio
router.get(
	'/pedidos/edit/:id/orderListByRewards',
	ordersController.getListByRewards
);
// Vista crear pedido
router.get('/pedidos/nuevo', ordersController.new);
// Consulta crear pedido
router.post('/pedidos/nuevoPedido', ordersController.create);
// Vista editar pedido
router.get('/pedidos/edit/:id', ordersController.edit);
// Consulta actulizar pedido
router.post('/pedidos/edit/:id/update', ordersController.update);
// Lista de pedidos del cliente
router.get('/pedidos/edit/:id/comprasList', ordersController.getListByClient);
//delete pedido
router.delete('/pedidos/delete/:id', purchasesController.destroy);

// router.post('/', adminController.store);
// router.get('/:id/edit', adminController.edit);
// router.put('/:id', adminController.update);
// router.delete('/:id', adminController.destroy);
module.exports = router;
