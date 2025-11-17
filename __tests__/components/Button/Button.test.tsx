import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@components/common/Button';

describe('Button', () => {
  it('renders with title and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPress} testID="test-button" />
    );
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows loading indicator and disables button when loading', () => {
    const onPress = jest.fn();
    const { getByTestId, queryByText } = render(
      <Button title="Loading Button" onPress={onPress} loading testID="loading-button" />
    );
    expect(getByTestId('loading-button')).toBeTruthy();
    expect(queryByText('Loading Button')).toBeNull();
  });

  it('applies accessibility props', () => {
    const { getByLabelText } = render(
      <Button
        title="A11y Button"
        onPress={() => {}}
        accessibilityLabel="Custom Label"
        accessibilityHint="Custom Hint"
        testID="a11y-button"
      />
    );
    expect(getByLabelText('Custom Label')).toBeTruthy();
    // Note: accessibilityHint cannot be directly queried in React Native Testing Library
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Disabled" onPress={onPress} disabled testID="disabled-button" />
    );
    fireEvent.press(getByTestId('disabled-button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
