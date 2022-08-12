// eslint-disable-next-line no-undef
const localforage = jest.createMockFromModule('localforage');

let mockData = null;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
localforage.__setMockData__ = (data) => { mockData = data; };
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
localforage.getItem = () => new Promise((resolve, reject) => {
  if (mockData !== null) {
    resolve(mockData);
  } else {
    reject(false);
  }
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
localforage.setItem = () => new Promise((resolve, reject) => { reject(false); });

module.exports = localforage;
