const MockUser = require('./db/User');
jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(() => MockUser),
}));
