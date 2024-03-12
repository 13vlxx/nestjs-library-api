module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
};
