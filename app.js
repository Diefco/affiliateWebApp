const express = require('express');
const app = express();
const path = require('path');
let dotenv = require('dotenv');
const cookieSession = require('cookie-session'); // invocamos morgan
const morgan = require('morgan');
const multer = require('multer');

// middlewares
app.use(morgan('dev'));

app.use(
	multer({
		dest: path.join(__dirname, '/src/assets/img/uploads/'),
	}).single('image')
);

/* url encoded y json */
app.use(express.urlencoded({ extended: true })); // pasar a true con imagenes
app.use(express.json());

/* Variables de entorno */
dotenv = dotenv.config({ path: path.join(__dirname, '/src/config/.env') });

/* conexión base de datos */
const con = require('./src/config/db.js');

app.use(function (req, res, next) {
	req.con = con;
	next();
});

/* MySQl Creación base de datos. */
const createDb = require('./src/config/createDb.js');
createDb();

/* configuración de la sessión */
app.use(
	cookieSession({
		name: 'session',
		keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2],
		maxAge: 24 * 60 * 60 * 1000 * 30, // 30 días
	})
);

/* Configruación del view engine EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

/* Recursos estaticos (css, js, imgs, etc) */
app.use('/assets', express.static(path.join(__dirname, '/src/assets')));

/* Rutas admin*/
const loginRouter = require('./src/routes/admin/router');
const { allowedNodeEnvironmentFlags } = require('process');
app.use('/admin/', loginRouter);

// Puerto y lanzamiento de la app
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), (req, res) => {
	console.log(`Server runing in http://localhost:${app.get('port')}`);
});
