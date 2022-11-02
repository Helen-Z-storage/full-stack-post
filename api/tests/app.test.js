const {
  describe,
  jest,
  it,
  expect,
  beforeEach,
  afterEach,
} = require('@jest/globals');

// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

describe('App server', () => {
  const originalEnv = process.env;
  describe.each([['3000'], ['4000'], ['5000']])('when PORT is %s', (port) => {
    beforeEach(() => {
      jest.resetModules();
      process.env = {
        ...originalEnv,
        PORT: port,
      };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should listen to PORT', () => {
      jest.doMock('../src/app');
      const app = require('../src/app');
      require('../src/index');
      expect(app.listen).toHaveBeenCalledWith(port, expect.anything());
    });

    it('should log the port number', () => {
      jest.doMock('../src/app');
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      const app = require('../src/app');
      require('../src/index');

      // Invoke the callback function of listen.
      app.listen.mock.lastCall[1]();

      expect(logSpy).toBeCalledWith(`Listening: http://localhost:${port}`);
    });
  });
});
