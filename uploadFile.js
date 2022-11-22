const path = require('path');
const multer = require('multer');

//Establecer motor de almacenamiento
const storage = multer.diskStorage({
	destination: path.join(__dirname, '/src/assets/img/uploads'),
	filename: function (req, file, cb) {
		cb(
			null,
			Date.now() + '_' + file.originalname // Asignando nombre a la imagen
		);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 3000000, //tamaño maximo en bytes
	},
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single('image');

function checkFileType(file, cb) {
	// Extensiones a recibir
	const filetypes = /jpeg|jpg|png|gif|webp|svg/;
	// Revisar extension
	var extname = filetypes.test(
		path.extname(file.originalname).toLocaleLowerCase()
	);
	var mimetype = filetypes.test(file.mimetype);
	if (extname && mimetype) {
		return cb(null, true);
	} else {
		return cb('Error: El tipo de imagen no es correcto!');
	}
}

function uploadFile(req, callback) {
	upload(req, callback, (err) => {
		if (req.file === undefined) {
			const filename = 'no-photo.jpg';
			if (err) {
				console.log(err);
				//res.send(err);
			} else {
				callback(filename, req.body.fechaFinalizacion);
			}
		} else {
			if (err) {
				console.log(err);
				//res.send(err);
			} else {
				callback(req.file.filename, req.body.fechaFinalizacion);
			}
		}
	});
}
module.exports = uploadFile;
