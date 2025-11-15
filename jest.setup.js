/* global jest */
// Jest setup: mock deprecated SafeAreaView and suppress specific warnings

// Mock the internal SafeAreaView used by some libraries to avoid deprecation warnings
// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('react-native/Libraries/Components/SafeAreaView/SafeAreaView', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View } = require('react-native');
  return function SafeAreaView(props) {
    return React.createElement(View, props);
  };
});

// Suppress SafeAreaView deprecation warnings to keep test output clean
const originalWarn = console.warn.bind(console);
console.warn = (msg, ...args) => {
  if (typeof msg === 'string' && msg.includes('SafeAreaView has been deprecated')) return;
  originalWarn(msg, ...args);
};

// Mock AsyncStorage to prevent native errors during Jest tests
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
