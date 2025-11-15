import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert, ActivityIndicator } from 'react-native';
import { ImagePickerComponent } from './ImagePickerComponent';

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: { Images: 'Images' },
}));

jest.mock('expo-image', () => ({
  Image: (props: any) => <img {...props} />,
}));

describe('ImagePickerComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders placeholder when no image', () => {
    const { getByText, getByLabelText } = render(
      <ImagePickerComponent onImageSelected={jest.fn()} />
    );
    expect(getByText('Add Photo')).toBeTruthy();
    expect(getByLabelText('Add Photo')).toBeTruthy();
  });

  it('renders image and remove button when currentImage is set', () => {
    const { getByLabelText, getByText } = render(
      <ImagePickerComponent onImageSelected={jest.fn()} currentImage="http://test.com/photo.jpg" />
    );
    expect(getByLabelText('Profile Photo')).toBeTruthy();
    expect(getByLabelText('Remove photo')).toBeTruthy();
    expect(getByText('✕')).toBeTruthy();
  });

  it('calls onImageSelected with new uri after picking image', async () => {
    const onImageSelected = jest.fn();
    const ImagePicker = require('expo-image-picker');
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
    ImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({ canceled: false, assets: [{ uri: 'new-uri' }] });
    const { getByLabelText } = render(
      <ImagePickerComponent onImageSelected={onImageSelected} />
    );
    fireEvent.press(getByLabelText('Add Photo'));
    await waitFor(() => expect(onImageSelected).toHaveBeenCalledWith('new-uri'));
  });

  it('shows alert if permission denied', async () => {
    const ImagePicker = require('expo-image-picker');
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByLabelText } = render(
      <ImagePickerComponent onImageSelected={jest.fn()} />
    );
    fireEvent.press(getByLabelText('Add Photo'));
    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('Permission needed', expect.any(String)));
  });

  it('shows ActivityIndicator when loading', async () => {
    const onImageSelected = jest.fn();
    const ImagePicker = require('expo-image-picker');
    ImagePicker.requestMediaLibraryPermissionsAsync.mockImplementation(() => new Promise(() => {}));
    const { getByLabelText, getByTestId } = render(
      <ImagePickerComponent onImageSelected={onImageSelected} />
    );
    fireEvent.press(getByLabelText('Add Photo'));
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('calls onRemove when remove button pressed', () => {
    const onRemove = jest.fn();
    jest.spyOn(Alert, 'alert').mockImplementation((title, msg, buttons) => {
      // Simulate pressing the Remove button
      buttons?.[1]?.onPress();
    });
    const { getByLabelText } = render(
      <ImagePickerComponent onImageSelected={jest.fn()} currentImage="img" onRemove={onRemove} />
    );
    fireEvent.press(getByLabelText('Remove photo'));
    expect(onRemove).toHaveBeenCalled();
  });
});
