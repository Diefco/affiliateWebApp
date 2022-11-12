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
		'CREATE TABLE IF NOT EXISTS `clients` (`id` INT NOT NULL AUTO_INCREMENT,`email` VARCHAR(45) NOT NULL,`name` VARCHAR(45) NOT NULL,`phone` VARCHAR(45) NOT NULL,`address` VARCHAR(50) NOT NULL,`password` VARCHAR(45) NOT NULL,`idAdmin` INT NOT NULL,PRIMARY KEY (`id`),`creationDate` TIMESTAMP NOT NULL, FOREIGN KEY (`idAdmin`) REFERENCES `admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla clients creada');
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `purchases` (`id` INT NOT NULL,`idClient` VARCHAR(45) NOT NULL,`namePurchase` VARCHAR(45) NOT NULL,`description` VARCHAR(45) NOT NULL,`datePurchase` DATETIME NOT NULL,`valuePurchase` DECIMAL(50) NOT NULL,`createDate` DATETIME NOT NULL,PRIMARY KEY (`id`)) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla purchases creada');
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `rewards` (`id` INT NOT NULL,`nameReward` VARCHAR(45) NOT NULL,`image` TEXT NOT NULL,`pricePoints` DECIMAL(50) NOT NULL,`description` VARCHAR(280) NOT NULL,`finishDate` DATETIME NOT NULL,`deliveryTime` DATETIME(6) NOT NULL,PRIMARY KEY (`id`)) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla rewards creada');
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `orders` (`id` INT NOT NULL,`phoneContact` VARCHAR(45) NOT NULL,`orderDate` DATETIME NOT NULL,`pricePoints` VARCHAR(45) NOT NULL,`deliveryAddress` VARCHAR(45) NOT NULL,`deliveryDate` VARCHAR(45) NOT NULL,`scheduleAvailable` TIME NOT NULL,`deliveryMessage` VARCHAR(280) NULL,`idReward` INT NOT NULL,PRIMARY KEY (`id`),CONSTRAINT `idreward`FOREIGN KEY (`idReward`) REFERENCES `rewards` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla orders creada');
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `points` (`id` INT NOT NULL,`points` VARCHAR(45) NOT NULL,`datePurchase` DATETIME NOT NULL,`idPurchase` INT NOT NULL,`idClient` INT NOT NULL,PRIMARY KEY (`id`), CONSTRAINT `idClient` FOREIGN KEY (`idClient`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `idPurchase` FOREIGN KEY (`idPurchase`)REFERENCES `purchases` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla points creada');
			}
		}
	);

	con.query(
		'CREATE TABLE IF NOT EXISTS `orderState` (`id` INT NOT NULL,`stateName` VARCHAR(45) NOT NULL,`idClient` INT NOT NULL,`idorder` INT NOT NULL,PRIMARY KEY (`id`),FOREIGN KEY (`idClient`) REFERENCES `clients` (`id`)ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY (`idOrder`)REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla orderState creada');
			}
		}
	);
};
module.exports = createDb;
