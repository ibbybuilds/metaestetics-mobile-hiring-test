import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Input } from './Input';

describe('Input', () => {
  it('renders with label and value', () => {
    const { getByDisplayValue, getByText } = render(
      <Input label="Test Label" value="test value" onChangeText={() => {}} />
    );
    expect(getByText('Test Label')).toBeTruthy();
    expect(getByDisplayValue('test value')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type here" value="" onChangeText={onChangeText} />
    );
    const input = getByPlaceholderText('Type here');
    fireEvent.changeText(input, 'new text');
    expect(onChangeText).toHaveBeenCalledWith('new text');
  });

  it('shows error message', () => {
    const { getByText } = render(
      <Input value="" onChangeText={() => {}} error="Error!" />
    );
    expect(getByText('Error!')).toBeTruthy();
  });

  it('toggles password visibility', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input value="secret" onChangeText={() => {}} secureTextEntry placeholder="Password" />
    );
    const toggle = getByText('Show');
    fireEvent.press(toggle);
    expect(getByText('Hide')).toBeTruthy();
  });

  it('handles onBlur and onFocus', () => {
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <Input value="" onChangeText={() => {}} onBlur={onBlur} placeholder="Focus me" />
    );
    const input = getByPlaceholderText('Focus me');
    fireEvent(input, 'focus');
    fireEvent(input, 'blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('renders left and right icons', () => {
    const { getByTestId } = render(
      <Input value="" onChangeText={() => {}} leftIcon={<TestIcon testID="left-icon" />} rightIcon={<TestIcon testID="right-icon" />} />
    );
    expect(getByTestId('left-icon')).toBeTruthy();
    expect(getByTestId('right-icon')).toBeTruthy();
  });
});

const TestIcon: React.FC<{ testID: string }> = ({ testID }) => <Text testID={testID}>icon</Text>;
