const mysql = require('mysql');

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
});

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
	if (error) throw error;
	console.log('Base de datos MySQL conectada');
});

module.exports = connection;
