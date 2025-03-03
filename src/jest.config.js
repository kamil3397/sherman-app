const esModules = ['axios'].join('|');
module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/setup.jest.js'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  transform: {
    '^.+.[tj]sx?$': [
      'babel-jest',
    ],
  },
};

// https://jestjs.io/docs/configuration#setupfiles-array
