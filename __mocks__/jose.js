// eslint-disable-next-line no-undef
const original = jest.requireActual('jose');
// eslint-disable-next-line no-undef
const jose = jest.createMockFromModule('jose');

// eslint-disable-next-line no-undef
jose.importPKCS8 = jest.fn((privateKey) => new Promise((resolve) => { resolve(privateKey); }));
// eslint-disable-next-line no-undef
jose.decodeJwt = jest.fn(() => ({ email: 'test_account@gmail.com' }));
jose.SignJWT = class SignJWT extends original.SignJWT {
  // eslint-disable-next-line no-undef
  sign = jest.fn((privateKey) => new Promise((resolve) => { resolve(privateKey !== 'WRONG_PRIVATE_KEY' ? 'jwt_token' : 'bad_token'); }));
};
module.exports = jose;
