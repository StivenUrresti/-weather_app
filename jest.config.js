module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: [],
  testPathIgnorePatterns: ['<rootDir>/e2e'],
  setupFilesAfterEnv: [
    '<rootDir>/jest-config/jest.setup.ts',
    '@testing-library/jest-native/extend-expect',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation.*|react-native-gesture-handler|react-native-screens|axios|aws-amplify|@react-native-async-storage/async-storage|react-native-toast-message|react-native-ui-lib|react-native-reanimated|react-native-country-codes-picker)/)',
  ],
  testEnvironment: 'node',
  verbose: true,
  silent: false,
};
