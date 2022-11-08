const express = require('express');
const app = express();

const path = require('path');

/* url encoded y json */
app.use(express.urlencoded({ extended: false })); // pasar a true con imagenes
app.use(express.json());

/* configuración de la sessión */
const session = require('express-session');
app.set('trust proxy', 1); // trust first proxy
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

/* Variables de entorno */
let dotenv = require('dotenv');
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

/* Configruación del view engine EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
/* Recursos estaticos (css, js, imgs, etc) */
app.use('/assets', express.static(path.join(__dirname, '/src/assets')));

/* Rutas */
/* Home es el login para ambos tipos de usuarios*/
app.use('/', require('./src/routes/login.js'));

/* Incluir rutas admin*/
const loginRouter = require('./src/routes/admin/loginRouter');

/* routing admin */
app.use('/admin/', loginRouter);

// Puerto y lanzamiento de la app
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), (req, res) => {
	console.log(`Server runing in http://localhost:${app.get('port')}`);
});
