//importar app
//
const app = require('./app');
//creando servidor
const http = require('http');

//trae el protocolo http
const server = http.createServer(app);

//corriendo el servidor
server.listen(3000, () => {
  console.log('el servidor esta corriendo el puerto 3000');
  console.log('http://localhost:3000');
});
