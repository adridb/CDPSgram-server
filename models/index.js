var path = require('path');

//cargar modelo orm 
var Sequelize = require('sequelize');

//usar bbdd Sqllite
//var sequelize = new Sequelize(null,null,null,
//                     {dialect: "SqLite",storage: "cdpsserver.sqLite"});

//BBDD SQLite;
var url,storage;
if(!process.env.DATABASE_URL){
  url = "sqlite:///";
  storage = "cdpsserver.sqlite";
} else {
  url = process.env.DATABASE_URL;
  storage = process.env.DATABASE_URL || "";
}
var sequelize = new Sequelize(url,
                            {storage: storage,
                              omitNull: true
                            });

var photos_url = process.env.PHOTOS_URL || "http://localhost:8000"

// importar definición de la tabla de photo.js
var Photos = sequelize.import(path.join(__dirname,'photo'));

var User = sequelize.import(path.join(__dirname,'user'));
// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
        // Ya se han creado las tablas necesarias.
        return Photos.count().then(function (c) {
           if (c === 0) {   // la tabla se inicializa solo si está vacía
                        return Photos.bulkCreate([{name: 'Wood',url: photos_url + '/photos/photo1.jpg'},
                                                  {name: 'Man',url: photos_url + '/photos/photo2.jpg'},
                                                  {name: 'Desktop',url: photos_url + '/photos/photo3.jpg'},
                                                  {name: 'Woman',url: photos_url + '/photos/photo4.jpg'},
                                                  {name: 'People',url: photos_url + '/photos/photo5.jpg'}
                                                  ])
                                   .then(function() {
                                        console.log('Base de datos Photos inicializada con datos');
                                    });
                    }
                    
                });
    })
    .catch(function(error) {
        console.log("Error Sincronizando las tablas de la BBDD:", error);
        process.exit(1);
    });
    var crypto = require('crypto');
 function encryptPassword(password,salt){
  return crypto.createHmac('sha1',salt).update(password).digest('hex');
 };
    sequelize.sync().then(function() {
        // Ya se han creado las tablas necesarias.
        return User.count().then(function (c) {
                   
                    if (c === 0) {   // la tabla se inicializa solo si está vacía
                        return User.bulkCreate([{username: 'admin',
                                                  password: encryptPassword('admin','aaaa'),
                                                  salt: 'aaaa',
                                                  isAdmin: true}
                                                  ])
                                   .then(function() {
                                        console.log('Base de datos User inicializada con datos');
                                    });
                    }
                });
    })
    .catch(function(error) {
        console.log("Error Sincronizando las tablas de la BBDD:", error);
        process.exit(1);
    });




exports.User = User;
exports.Photos = Photos; // exportar definición de tabla Photos