const express = require('express');
const loginController = require('../controllers/loginController');
// const clientsController = require('../controllers/clientsController');
// const purchasesController = require('../controllers/purchasesController');
// const rewardsController = require('../controllers/rewardsController');
// const ordersController = require('../controllers/ordersController');

const router = express.Router();

/* LOGIN */
router.get('/', loginController.index);
// Validación de datos del login
router.post('/auth', loginController.validate);
// Asignar contraseña
router.get('/forgot-password', loginController.password);

router.post('/passwordAuth', loginController.passwordAuth);
// Destruir sesión
router.get('/logout', loginController.logout);

/* CLIENTES */
// // Vista listado de clientes
// router.get('/mi-cuenta', clientsController.index);
// // Actulizar datos del cliente
// router.post('/mi-cuenta/updateClient', clientsController.update);

// /* COMPRAS */
// // Vista listado de compras del cliente
// router.get('/compras', purchasesController.index);
// // Api consumo lista de compras del cliente = comprasList
// router.get('/comprasList', purchasesController.getList);

// /* PREMIOS // RECOMPENSAS */
// // Vista listado de premios
// router.get('/premios', rewardsController.index);
// // Vista crear pedido
// router.get('/premios/solicitar', ordersController.new);

// /* PEDIDOS */
// // Vista listado de pedidos
// router.get('/pedidos', ordersController.index);
// // Api consumo lista de pedidos = pedidosList
// router.get('/orderList', ordersController.getList);
// // Consulta actulizar pedido
// router.post('/pedidos/create', ordersController.update);

module.exports = router;
