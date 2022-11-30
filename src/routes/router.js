const express = require('express');
const loginController = require('../controllers/loginController');
const clientsController = require('../controllers/clientsController');
const purchasesController = require('../controllers/purchasesController');
const rewardsController = require('../controllers/rewardsController');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

/* LOGIN */
router.get('/', loginController.index);
// Validación de datos del login
router.post('/auth', loginController.validate);
// Asignar contraseña
router.get('/forgot-password', loginController.forgotPassword);
// Autenticación de email -> enviar correo de recuperación
router.post('/passwordAuth', loginController.forgotPasswordAuth);
// Solicitud nueva contraseña
router.get('/reset-password/:id/:token', loginController.resetPassword);
// Autenticación de nueva contraseña
router.post('/reset-password/:id/:token', loginController.resetPasswordAuth);
// Destruir sesión
router.get('/logout', loginController.logout);

/* CLIENTES */
// Vista listado de clientes
router.get('/mi-cuenta', clientsController.index);
// Actulizar datos del cliente
router.post('/mi-cuenta/update', clientsController.update);

/* COMPRAS */
// Vista listado de compras del cliente
router.get('/compras', purchasesController.index);
// Api consumo lista de compras del cliente = comprasList
router.get('/purchasesList', purchasesController.getList);

// /* PREMIOS // RECOMPENSAS */
// Vista listado de premios
router.get('/premios', rewardsController.index);
// Vista crear pedido
router.post('/premios/newOrderClient', ordersController.create);

/* PEDIDOS */
// Vista listado de pedidos
router.get('/pedidos', ordersController.index);
// Api consumo lista de pedidos = pedidosList
router.get('/orderList', ordersController.getListById);
// Consulta actulizar pedido
router.get('/pedidos/:id', ordersController.getDetailOrders);
// consulta de rewards
router.get(
	'/pedidos/:id/orderListByRewards',
	ordersController.getListByRewards
);

module.exports = router;
