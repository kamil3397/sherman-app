module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/setup.jest.js'],
  globals: {
    Uint8Array: Uint8Array,
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  transform: {
    '^.+.[tj]sx?$': [
      'babel-jest',
    ],
  },
};

// https://jestjs.io/docs/configuration#setupfiles-array
