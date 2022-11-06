const express = require('express');
const app = express();

const path = require('path');

/* Variables de entorno */
let dotenv = require('dotenv');
dotenv = dotenv.config({ path: path.join(__dirname, '/src/config/.env') });

/* MySQl Connection */
const connection = require('./src/config/db.js');

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
	if (error) throw error;
	console.log('The solution is: ', results[0].solution);
});

/* Configruación del view engine EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
/* Recursos estaticos (css, js, imgs, etc) */
app.use('/assets', express.static(path.join(__dirname, '/src/assets')));

/* Rutas */
/* Home es el login para ambos tipos de usuarios*/
app.use('/', require('./src/routes/login.js'));

/* Rutas Administrador */
app.use('/admin/clientes', require('./src/routes/admin/clientes.js'));
app.use('/admin/compras', require('./src/routes/admin/compras.js'));
app.use('/admin/premios', require('./src/routes/admin/premios.js'));
/* Pedidos sera la URL Home del dashboard admin*/
app.use('/admin/pedidos', require('./src/routes/admin/pedidos.js'));

/* Rutas cliente */

// Puerto y lanzamiento de la app
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), (req, res) => {
	console.log('The value of DBUSER is:', process.env.DB_USER);
	console.log(`Server runing in http://localhost:${app.get('port')}`);
});
