const db = require('../db');

const contactsRouter = require('express').Router();
const REGEX_NAME = /^[A-Z][a-z]*[ ][A-Z][a-z]*$/;
const REGEX_NUMBER = /^[0](212|412|414|424|416|426)[0-9]{7}$/;

contactsRouter.post('/', async (request, response) => {
  try {
    // Obtener el nombre y el telefono del body
    const { name, phone } = request.body;
    // Validar el nombre y telefono
    if (!REGEX_NAME.test(name)) {
      console.log('namemalo');
      return response.status(400).json({ error: 'El nombre es invalido.' });
    } else if (!REGEX_NUMBER.test(phone)) {
      console.log('numbermalo');
      return response.status(400).json({ error: 'El numero es invalido.' });
    }
    // Crear el usuario en la base de datos
    const statement = db.prepare(
      `
    INSERT INTO contact (name, phone, user_id) VALUES (?, ?, ?) RETURNING *
  `,
    );
    const newUser = statement.get(name, phone, Number(request.query.userId));
    return response.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    console.log('error loco');
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      console.log('error sql');
      return response.status(400).json({ error: 'El email ya esta en uso' });
    }

    return response.sendStatus(400);
  }
});

// eliminar contacto
contactsRouter.delete('/:id', async (request, response) => {
  try {
    // Obtener el nombre y el telefono del body
    const contactIdToDelete = request.params.id;
    // Crear el usuario en la base de datos
    const statement = db.prepare(
      `
    DELETE FROM contact WHERE contact_id = ? AND user_id = ? RETURNING *
  `,
    );
    const deleteContact = statement.get(Number(contactIdToDelete), Number(request.query.userId));
    if (!deleteContact) {
      return response.status(400).json({ message: 'el contacto no existe' });
    }
    return response
      .status(200)
      .json({ message: `El contacto ${deleteContact.name} ha sido eliminado` });
  } catch (error) {
    console.log(error);
    console.log('error loco');
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      console.log('error sql');
      return response.status(400).json({ error: 'El email ya esta en uso' });
    }

    return response.sendStatus(400);
  }
});

contactsRouter.put('/:id', async (request, response) => {
  try {
    // Obtener el nombre y el telefono del body
    const { name, phone } = request.body;
    // Validar el nombre y telefono
    if (!REGEX_NAME.test(name)) {
      console.log('namemalo');
      return response.status(400).json({ error: 'El nombre es invalido.' });
    } else if (!REGEX_NUMBER.test(phone)) {
      console.log('numbermalo');
      return response.status(400).json({ error: 'El numero es invalido.' });
    }
    // Crear el usuario en la base de datos
    const statement = db.prepare(
      `
    UPDATE contact  SET 
        name = ?, 
        phone = ?         
      WHERE 
        contact_id = ? AND user_id = ?
         RETURNING *
  `,
    );
    const updateContact = statement.get(
      name,
      phone,
      Number(request.params.id),
      Number(request.query.userId),
    );
    if (!updateContact) {
      return response.status(400).json({ message: 'el contacto no existe' });
    }
    return response.status(200).json(updateContact);
  } catch (error) {
    console.log(error);
    console.log('error loco');
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      console.log('error sql');
      return response.status(400).json({ error: 'El email ya esta en uso' });
    }

    return response.sendStatus(400);
  }
});

//OBTIENE UN CONTACTO
contactsRouter.get('/', async (request, response) => {
  try {
    // Crear el usuario en la base de datos
    const statement = db.prepare(
      `
    SELECT * FROM contact        
    WHERE user_id = ?
  `,
    );
    const contacts = statement.all(Number(request.query.userId));
    return response.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    console.log('error loco');
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      console.log('error sql');
      return response.status(400).json({ error: 'El email ya esta en uso' });
    }

    return response.sendStatus(400);
  }
});
module.exports = contactsRouter;
