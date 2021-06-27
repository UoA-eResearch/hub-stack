module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    // Do not re-run the same tests transpiled into javascript.
    "build/tests"
  ]
};