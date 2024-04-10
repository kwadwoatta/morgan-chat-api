/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    'apps/gateway/src/(.*)': '<rootDir>/../src/$1',
    '@app/common': '<rootDir>/../../../libs/common/src/index.ts',
  },
  bail: true,
};

module.exports = config;
