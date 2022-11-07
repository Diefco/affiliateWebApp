const createDb = () => {
	const connection = require('./db');

	connection.query(
		'CREATE DATABASE IF NOT EXISTS `db_webAfiliate` DEFAULT CHARACTER SET utf8',
		function (error, results, fields) {
			if (error) throw error;
			if (results.warningCount == 0) {
				console.log('base de datos creada');
			}
		}
	);

	connection.query(
		'CREATE TABLE IF NOT EXISTS `db_webAfiliate`.`administradores` (`id` INT NOT NULL AUTO_INCREMENT,`correo` VARCHAR(45) NOT NULL,`contraseña` VARCHAR(45) NOT NULL,PRIMARY KEY (`id`))ENGINE = InnoDB',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla administradores creada');
			}
		}
	);

	connection.query(
		'CREATE TABLE IF NOT EXISTS `db_webAfiliate`.`clientes` (`id` INT NOT NULL AUTO_INCREMENT,`correo` VARCHAR(45) NOT NULL,`nombre` VARCHAR(45) NOT NULL,`telefono` VARCHAR(45) NOT NULL,`direccion` VARCHAR(50) NOT NULL,`fechaCreacion` DATETIME(6) NOT NULL,`contraseña` VARCHAR(45) NOT NULL,`idAdministrador` INT NOT NULL,PRIMARY KEY (`id`),FOREIGN KEY (`idAdministrador`)REFERENCES `db_webAfiliate`.`administradores` (`id`)ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla clientes creada');
			}
		}
	);

	connection.query(
		'CREATE TABLE IF NOT EXISTS `db_webAfiliate`.`compras` (`id` INT NOT NULL,`idCliente` VARCHAR(45) NOT NULL,`nombreCompra` VARCHAR(45) NOT NULL,`descripcion` VARCHAR(45) NOT NULL,`fechaCompra` DATETIME(6) NOT NULL,`valorCompra` DECIMAL(50) NOT NULL,`creado` DATETIME NOT NULL,PRIMARY KEY (`id`)) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla compras creada');
			}
		}
	);

	connection.query(
		'CREATE TABLE IF NOT EXISTS `db_webAfiliate`.`premios` (`id` INT NOT NULL,`nombrePremio` VARCHAR(45) NOT NULL,`imagen` TEXT NOT NULL,`precioPunto` DECIMAL(50) NOT NULL,`descripcion` VARCHAR(280) NOT NULL,`fechaFinalizacion` DATETIME(6) NOT NULL,`tiempoEntrega` DATETIME(6) NOT NULL,PRIMARY KEY (`id`))ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla premios creada');
			}
		}
	);

	connection.query(
		'CREATE TABLE IF NOT EXISTS `db_webAfiliate`.`pedidos` (`id` INT NOT NULL,`telefonoContacto` VARCHAR(45) NOT NULL,`fechaInicio` DATETIME NOT NULL,`precioPuntos` VARCHAR(45) NOT NULL,`direccionEntrega` VARCHAR(45) NOT NULL,`fechaEntrega` VARCHAR(45) NOT NULL,`horarioDisponible` TIME NOT NULL,`mensajeEntrega` VARCHAR(280) NULL,`idPremio` INT NOT NULL,PRIMARY KEY (`id`),CONSTRAINT `idPremio`FOREIGN KEY (`idPremio`)REFERENCES `db_webAfiliate`.`premios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla pedidos creada');
			}
		}
	);

	connection.query(
		'CREATE TABLE IF NOT EXISTS `db_webAfiliate`.`puntos` (`id` INT NOT NULL,`puntos` VARCHAR(45) NOT NULL,`fechaCompra` DATETIME NOT NULL,`idCompra` INT NOT NULL,`idCliente` INT NOT NULL,PRIMARY KEY (`id`),CONSTRAINT `idCliente` FOREIGN KEY (`idCliente`) REFERENCES `db_webAfiliate`.`clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `idCompra`FOREIGN KEY (`idCompra`)REFERENCES `db_webAfiliate`.`compras` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION)ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla puntos creada');
			}
		}
	);

	connection.query(
		'CREATE TABLE IF NOT EXISTS `db_webAfiliate`.`estadoPedido` (`id` INT NOT NULL,`estado` VARCHAR(45) NOT NULL,`idCliente` INT NOT NULL,`idPedido` INT NOT NULL,PRIMARY KEY (`id`),FOREIGN KEY (`idCliente`) REFERENCES `db_webAfiliate`.`clientes` (`id`)ON DELETE NO ACTION ON UPDATE NO ACTION, FOREIGN KEY (`idPedido`)REFERENCES `db_webAfiliate`.`pedidos` (`id`)ON DELETE NO ACTION ON UPDATE NO ACTION)ENGINE = InnoDB;',
		function (error, results, fields) {
			if (error) throw error;

			if (results.warningCount == 0) {
				console.log('Tabla estadoPedido creada');
			}
		}
	);
};
module.exports = createDb;
