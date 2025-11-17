module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@testing-library|expo|expo-modules-core|expo-image-picker|react-redux|@expo|@unimodules|unimodules|sentry-expo|native-base|@react-native-community|@react-navigation/.*|@react-native-picker|@react-native-async-storage|@react-native-masked-view|@react-native-firebase|@react-native-segmented-control/segmented-control)/',
  ],
  moduleNameMapper: {
    '^expo-image-picker$': '<rootDir>/__mocks__/expo-image-picker.js',
    '^expo-image$': '<rootDir>/__mocks__/expo-image.js',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
  },
};
