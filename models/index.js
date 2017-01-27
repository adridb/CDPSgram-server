var path = require('path');

//cargar modelo orm	
var Sequelize = require('sequelize');

//usar bbdd Sqllite
//var sequelize = new Sequelize(null,null,null,
//	                   {dialect: "SqLite",storage: "cdpsserver.sqLite"});

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



// importar definición de la tabla de photo.js
var Photos = sequelize.import(path.join(__dirname,'photo'));


                       

exports.Photos = Photos; // exportar definición de tabla Quiz
