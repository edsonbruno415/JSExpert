const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const { once } = require('events');
const assert = require('assert');

describe('API unit tests', () => {
  let app, body;
  beforeEach(() => {
    body = {
      username: 'Edson',
      password: '123'
    }
  });
  before((done) => {
    app = require('./api');
    app.once('listening', done);
  });
  after((done) => {
    app.close(done);
  });

  describe('/contact:get', () => {
    it('should request contact us page and return status code 200', async () => {
      const response = await supertest(app).get('/contact').expect(200);

      assert.strictEqual(response.text, 'contact us page!');
    });
  });

  describe('/login:post', () => {
    it('should request log in successful user and return status code 200', async () => {
      const response = await supertest(app).post('/login').send(body).expect(200);

      assert.strictEqual(response.text, 'Login Successful!');
    });
    it('should request log in failed and return status code 401', async () => {
      body.username = 'AAA';
      const response = await supertest(app).post('/login').send(body).expect(401);

      assert.strictEqual(response.text, 'Login Failed!');
    });
  });

  describe('/default:any', () => {
    it('should show not found message and return status code 404', async ()=>{
      const response = await supertest(app).get('/anyroute').expect(404);

      assert.strictEqual(response.text, 'not found');
    });
  });
});