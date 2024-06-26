module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1"
    },
    testMatch: [
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ]
  };
  