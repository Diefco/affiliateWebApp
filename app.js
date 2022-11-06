const express = require('express');
const app = express();

/* Para obtener la url actual */
const path = require('path');
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

let dotenv = require('dotenv');
dotenv = dotenv.config({ path: path.join(__dirname, '/src/config/.env') });

const connection = require('./src/config/db.js');

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
	if (error) throw error;
	console.log('The solution is: ', results[0].solution);
});

/* Config EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

/* Routes */
app.get('/', function (req, res) {
	res.render('index', {
		username: 'Stiven',
	});
});

// Puerto y lanzamiento de la app
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), (req, res) => {
	console.log('The value of DBUSER is:', process.env.DB_USER);
	console.log(`Server runing in http://localhost:${app.get('port')}`);
});
