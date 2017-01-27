var fs = require('fs');
//var photo_model = require('./../models/photo');
var models = require('../models');
// Devuelve una lista de las imagenes disponibles y sus metadatos
exports.list = function (req, res,next) {
models.Photos.findAll() // Busca la primera pregunta existente
		.then(function(photos) {
			if (photos) {
				res.render('photos/index', {photos: photos});
			}

			})
		.catch(function(error) { next(error); });

 }
	//var photos = photo_model.photos;
	//res.render('photos/index', {photos: photos});
};

// Devuelve la vista del formulario para subir una nueva foto
exports.new = function (req, res) {
	res.render('photos/new');
};

// Devuelve la vista de visualización de una foto.
// El campo photo.url contiene la url donde se encuentra el fichero de audio
exports.show = function (req, res,next) {
	models.Photos.findById(req.params.photoId) // Busca la primera pregunta existente
		.then(function(photo) {
			if (photo) {
				res.render('photos/index', {photo: photo}); 
			}
		    
		})
		.catch(function(error) { next(error); });
	}
};

// Escribe una nueva foto en el registro de imagenes.
exports.create = function (req, res) {
	var photo = req.files.photo;
	console.log('Nuevo fichero: ', req.body);
	var name = req.body.name;
	var url = req.body.url;
	var id = Math.random().toString(36).substr(2, 10);
	
	// Escribe los metadatos de la nueva foto en el registro.
	photo_model.photos[id] = {
		name: name,
		url: url
	};

	res.redirect('/photos');
};

// Borra una foto (photoId) del registro de imagenes 
exports.destroy = function (req, res) {
	var photoId = req.params.photoId;

	// Aquí debe implementarse el borrado del fichero de audio indetificado por photoId en photos.cdpsfy.es

	// Borra la entrada del registro de datos
	delete photo_model.photos[photoId];
	res.redirect('/photos');
};