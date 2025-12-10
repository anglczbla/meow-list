module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\.(svg|jpg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    "^.+\.jsx?$": "babel-jest"
  }
};
