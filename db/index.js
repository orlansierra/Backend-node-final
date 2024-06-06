//conectar o conectar  a la base de datos
const Database = require('better-sqlite3');
const db = Database('contactos.db'); // verbose nos muestras las modificaciones que se hace la base de datos

module.exports = db; //para exportar la aplicacion y utilizar en cualquier parte de la aplicacion
