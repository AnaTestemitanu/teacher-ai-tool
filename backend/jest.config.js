module.exports = {
  testTimeout: 60000,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/app/domain/**/useCases/*.ts',
    '<rootDir>/app/domain/**/entities/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
};
