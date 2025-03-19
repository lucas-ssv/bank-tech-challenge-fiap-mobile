import { Config } from 'jest'

const config: Config = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|@gluestack-ui/*|@gluestack-style/*|@legendapp/*|react-native-svg)'
  ],
  transform: {
    '.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        babelConfig: 'babel.config.js'
      }
    ]
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/tests/mocks/style-mock.ts',
    '\\.svg': '<rootDir>/tests/mocks/svg-mock.ts'
  }
}

export default config
