const db = require('../db');

const usersRouter = require('express').Router(); // router es para aceptar los metodos post get ..
const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
usersRouter.post('/', async (request, response) => {
  try {
    //obtener el email del body
    //paso 1
    const { email } = request.body;
    //paso 2
    //validar el email
    if (!EMAIL_REGEX.test(email)) {
      return response.status(400).json({ error: 'el email es invalido' });
    }

    //paso 3
    //crear usuario en la base de datos
    const statement = db.prepare(
      'INSERT INTO users (email) VALUES (?)', // ? es para el email
    );
    statement.run(email);
    //enviado mensaje de creacion de usuario
    return response.status(200).json({ message: 'usuario creado' });
  } catch (error) {
    //comprando que el email ya existe
    console.log(error);
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return response.status(400).json({ error: 'el email ya existe ' });
    }
    //en caso que te suceda otro error que no se conoce colocar esto
    return response.sendStatus(400);
  }
});

//
module.exports = usersRouter;
