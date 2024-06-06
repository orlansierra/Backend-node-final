const supertest = require('supertest');
const app = require('../app'); //aplicacion de express
const { describe, test, beforeAll } = require('@jest/globals');
const db = require('../db');
const api = supertest(app);
//codigo jet
describe('ruta users', () => {
  describe('crear usuario', () => {
    //borrar la base de datos antes de todos los test
    beforeAll(() => {
      // borrando todo los usuario de la base de datos si no le coloco el where
      const statement = db.prepare('DELETE FROM users');
      statement.run();
    });

    test('crea un usuario cuando todo es correcto', async () => {
      const response = await api
        .post('/api/users')
        .send({ email: 'com2pa@gmail.com' })
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).toStrictEqual({ message: 'usuario creado' });
    });
    //test para comprobar si  el email es invalido
    test('devuelve un error cuando el error el invalido', async () => {
      const response = await api
        .post('/api/users')
        .send({ email: 'com2pagmail.com' })
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toStrictEqual({ error: 'el email es invalido' });
    });
    //test para cuando el usuario ya existe
    test('devuelve un error cuando el email ya existe', async () => {
      const response = await api
        .post('/api/users')
        .send({ email: 'com2pa@gmail.com' })
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toStrictEqual({ error: 'el email ya existe ' });
    });
  });
}); //debe de traer respuesta en json
