const db = require('.');

//forma de agregar table
const createUsersTable = async () => {
  const statement = db.prepare(` 
  
  CREATE TABLE  users (
    user_id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE
  
  )
  `);
  statement.run(); //corriendo la variable y la base de datos
  console.log('tabla de usuarios creada');
};

//forma de agregar table
const createContactsTable = async () => {
  const statement = db.prepare(` 
    
    CREATE TABLE  contact (
      contact_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL ,
      phone TEXT NOT NULL UNIQUE,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE

    
    )
    `);
  statement.run(); //corriendo la variable y la base de datos
  console.log('tabla de usuarios creada');
};

const createTables = async () => {
  await createUsersTable();
  await createContactsTable();
};

createTables();
