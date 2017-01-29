var models = require('../models');
var Sequelize = require('sequelize');


// Autoload el user asociado a :userId
exports.load = function(req, res, next, userId) {
    models.user.findById(userId)
        .then(function(user) {
            if (user) {
                req.user = user;
                next();
            } else {
                
                throw new Error('No existe userId=' + userId);
            }
        })
        .catch(function(error) { next(error); });
};


// GET /users
exports.index = function(req, res, next) {
    models.user.findAll({order: ['username']})
        .then(function(users) {
            res.render('users/index', { users: users });
        })
        .catch(function(error) { next(error); });
};


// GET /users/:id
exports.show = function(req, res, next) {
    res.render('users/show', {user: req.user});
};


// GET /users/new
exports.new = function(req, res, next) {
    var user = models.user.build({ username: "", 
                                   password: "" });

    res.render('users/new', { user: user });
};


// POST /users
exports.create = function(req, res, next) {
    var user = models.user.build({ username: req.body.user.username,
                                   password: req.body.user.password
                                });

    // El login debe ser unico:
    models.user.find({where: {username: req.body.user.username}})
        .then(function(existing_user) {
            if (existing_user) {
                var emsg = "El usuario \""+ req.body.user.username +"\" ya existe."
                console.log(emsg)
                res.render('users/new', { user: user });
            } else {
                // Guardar en la BBDD
                return user.save({fields: ["username", "password", "salt"]})
                    .then(function(user) { // Renderizar pagina de usuarios
                        console.log('Usuario creado con éxito.')
                        res.redirect('/users');
                    })
                    .catch(Sequelize.ValidationError, function(error) {
                        console.log('Errores en el formulario:');
                        for (var i in error.errors) {
                            console.log('error', error.errors[i].value);
                        };
                        res.render('users/new', { user: user });
                    });
            }
        })
        .catch(function(error) { 
            next(error);
        });
};


// GET /users/:id/edit
exports.edit = function(req, res, next) {
    res.render('users/edit', { user: req.user });  // req.user: instancia de user cargada con autoload
};            


// PUT /users/:id
exports.update = function(req, res, next) {

    // req.user.username  = req.body.user.username; // No se permite su edicion
    req.user.password  = req.body.user.password;

    // El password no puede estar vacio
    if ( ! req.body.user.password) { 
        console.log("El campo Password debe rellenarse.");
        return res.render('users/edit', {user: req.user});
    }

    req.user.save({fields: ["password", "salt"]})
        .then(function(user) {
            console.log('Usuario actualizado con éxito.');
            res.redirect('/users');  // Redirección HTTP a /
        })
        .catch(Sequelize.ValidationError, function(error) {

            console.log('Errores en el formulario:');
            for (var i in error.errors) {
                console.log('error', error.errors[i].value);
            };

            res.render('users/edit', {user: req.user});
        })
        .catch(function(error) {
            next(error);
        });
};


// DELETE /users/:id
exports.destroy = function(req, res, next) {
	console.log('delete)')
    req.user.destroy()
        .then(function() {
           console.log('Usuario eliminado con éxito.');
            res.redirect('/users');
        })
        .catch(function(error){ 
            next(error); 
        });
};