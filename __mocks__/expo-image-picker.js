/* global jest */

export const launchImageLibraryAsync = jest.fn(() => Promise.resolve({ cancelled: true }));
export const launchCameraAsync = jest.fn(() => Promise.resolve({ cancelled: true }));
export const requestMediaLibraryPermissionsAsync = jest.fn(() => Promise.resolve({ status: 'granted' }));
export const requestCameraPermissionsAsync = jest.fn(() => Promise.resolve({ status: 'granted' }));

