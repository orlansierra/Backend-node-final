const supertest = require('supertest');
const app = require('../app'); //aplicacion de express
const { describe, test } = require('@jest/globals');
const api = supertest(app);
//codigo jet
describe('ruta home', () => {
  test('devuelve respuesta en json con un hola mundos', async () => {
    const response = await api.get('/').expect(200).expect('Content-Type', /json/);
    expect(response.body).toStrictEqual({ hola: 'mundo' });
  });
}); //debe de traer respuesta en json
