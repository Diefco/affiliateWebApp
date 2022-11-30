const createDb = () => {
	const con = require('./db');

	// con.query(
	// 	'CREATE DATABASE IF NOT EXISTS `db_webAfiliate` DEFAULT CHARACTER SET utf8',
	// 	function (error, results, fields) {
	// 		if (error) throw error;
	// 		if (results.warningCount == 0) {
	// 			console.log('Base de datos creada');
	// 		}
	// 	}
	// );

	con.query(
		'CREATE TABLE IF NOT EXISTS `admin` (`id` INT NOT NULL AUTO_INCREMENT,`email` VARCHAR(45) NOT NULL,`password` VARCHAR(60) NOT NULL,PRIMARY KEY (`id`))ENGINE = InnoDB',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla admin creada');
				con.query(
					'INSERT INTO admin (email, password) VALUES ("admin@admin.com","$2a$10$EFtp6DTl7L93qrI/IsblX.aGEARq7Mqw3u08WkRBq9dg/aJ.g3cY6")',
					function (error, results, fields) {
						if (error) throw error;

						if (results.warningCount == 0) {
							console.log('Administrador creado');
						}
					}
				);
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `clients` (`id` INT NOT NULL AUTO_INCREMENT,`email` VARCHAR(45) NOT NULL,`name` VARCHAR(45) NOT NULL,`phone` VARCHAR(45) NOT NULL,`address` VARCHAR(50) NOT NULL,`password` VARCHAR(60) NOT NULL,`idAdmin` INT NOT NULL,PRIMARY KEY (`id`),`points` FLOAT NOT NULL,`creationDate` TIMESTAMP NOT NULL, FOREIGN KEY (`idAdmin`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;
			if (results.warningCount == 0) {
				console.log('Tabla clients creada');
				con.query(
					`INSERT INTO clients (email, name, phone, address, password, idAdmin, points) VALUES ("admin@admin.com","admin","123","admin","$2a$10$EFtp6DTl7L93qrI/IsblX.aGEARq7Mqw3u08WkRBq9dg/aJ.g3cY6","1","0")`,
					function (error, results, fields) {
						if (error) throw error;

						if (results.warningCount == 0) {
							console.log('Administrador en clientes creado');
						}
					}
				);
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `purchases` (`id` INT NOT NULL AUTO_INCREMENT,`namePurchase` VARCHAR(45) NOT NULL,`description` VARCHAR(250) NOT NULL,`datePurchase` DATETIME NOT NULL,`valuePurchase` FLOAT NOT NULL,`pointsPurchase` FLOAT NOT NULL,`createDate` TIMESTAMP NOT NULL,`idClient` INT NOT NULL,PRIMARY KEY (`id`), FOREIGN KEY (`idClient`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla purchases creada');
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `rewards` (`id` INT NOT NULL AUTO_INCREMENT,`nameReward` VARCHAR(45) NOT NULL,`image` TEXT NULL,`pricePoints` DECIMAL(50) NOT NULL,`description` VARCHAR(280) NOT NULL,`createDate` TIMESTAMP  NOT NULL,PRIMARY KEY (`id`)) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla rewards creada');
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `orderState` (`id` INT NOT NULL AUTO_INCREMENT,`stateName` VARCHAR(45) NOT NULL,PRIMARY KEY (`id`))',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla orderState creada');
				con.query(
					'INSERT IGNORE INTO orderState (id, stateName) VALUES(1, "Pendiente"),(2, "En proceso"),(3, "Enviado"),(4, "Completado"),(5, "Cancelado")',
					function (error, results, fields) {
						if (error) throw error;

						if (results.warningCount == 0) {
							console.log('Estados creados');
						}
					}
				);
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `orders` (`id` INT NOT NULL AUTO_INCREMENT,`phoneContact` VARCHAR(45) NOT NULL,`nameContact` VARCHAR(45) NOT NULL ,`orderDate` TIMESTAMP NOT NULL,`pricePoints` VARCHAR(45) NOT NULL,`deliveryAddress` VARCHAR(45) NOT NULL,`deliveryDate` VARCHAR(45) NOT NULL,`scheduleAvailable` TIME NOT NULL,`deliveryMessage` VARCHAR(280) NULL,`idorderState` INT NOT NULL, `idClient` INT NOT NULL ,`idReward`  VARCHAR(250) NOT NULL,PRIMARY KEY (`id`),FOREIGN KEY (`idOrderSta	te`) REFERENCES `orderState` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`idClient`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla orders creada');
			}
		}
	);
};
module.exports = createDb;
