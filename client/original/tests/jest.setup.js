const globals = require('@jest/globals');
const Sequelize = require('sequelize');

globals.jest.doMock('../src/db/db', () => {
  const fakeDb = new Sequelize('sqlite::memory:', { logging: false });
  return fakeDb;
});

globals.beforeEach(async () => {
  const seed = require('../src/db/seed');
  await seed();
});

globals.afterAll(async () => {
  const db = require('../src/db/db');
  db.close();
});
