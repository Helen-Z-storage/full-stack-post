const globals = require('@jest/globals');
const request = require('supertest');
const app = require('./../src/app');
const { User } = require('./../src/db/models');

const { describe, it, expect } = globals;

// ---------------------------------------------------------------- //
//                                                                  //
//                 THIS FILE IS FOR MORE SELF TEST                  //
//                                                                  //
// ---------------------------------------------------------------- //

describe('POST /api/login', () => {
  it('should allow login request from thomas.', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'thomas', password: '123456' });
    expect(res.body.username).toEqual('thomas');
    expect(res.body.id).toEqual(1);
    expect(res.status).toEqual(200);
  });

  it('fail login request since no username', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: '', password: '123456' });
    expect(res.body.error).toEqual('username and password required');
    expect(res.status).toEqual(400);
  });

  it('fail login request since no password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'thomas', password: '' });
    expect(res.body.error).toEqual('username and password required');
    expect(res.status).toEqual(400);
  });

  it('fail login request from since zeta is not registered.', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'zeta', password: '123456' });
    expect(res.body.error).toEqual('Wrong username and/or password');
    expect(res.status).toEqual(401);
  });

  it('fail login request from since wrong password.', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'thomas', password: '111111' });
    expect(res.body.error).toEqual('Wrong username and/or password');
    expect(res.status).toEqual(401);
  });
});

describe('POST /api/register', () => {
  it('should allow register request from zeta.', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ username: 'zeta', password: '123456' });
    expect(res.body.username).toEqual('zeta');
    expect(res.body.id).toEqual(6);
    expect(User.correctPassword(await User.findUserById(6), '123456')).toEqual(
      true
    );
    expect(res.status).toEqual(200);
  });

  it('fail register request since no username', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ username: '', password: '123456' });
    expect(res.body.error).toEqual('username and password required');
    expect(res.status).toEqual(400);
  });

  it('fail register request since no password', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ username: 'zeta', password: '' });
    expect(res.body.error).toEqual('username and password required');
    expect(res.status).toEqual(400);
  });

  it('fail register request since password not have length 6', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ username: 'zeta', password: '12345' });
    expect(res.body.error).toEqual('Password must be at least 6 characters');
    expect(res.status).toEqual(400);
  });

  it('fail register request from since thomas is already in database.', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ username: 'thomas', password: '123456' });
    expect(res.body.error).toEqual(
      'User with provided username already exists'
    );
    expect(res.status).toEqual(401);
  });
});
