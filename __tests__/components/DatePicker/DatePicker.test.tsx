import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { DatePicker } from '../../../src/components/common/DatePicker/DatePicker';

describe('DatePicker', () => {
  it('renders label and honors editable prop', () => {
    const onChange = jest.fn();
    const { getByLabelText, getByText } = render(
      <DatePicker label="Date of Birth" value={null} onChange={onChange} editable={false} />
    );

    // Label is rendered
    expect(getByText('Date of Birth')).toBeTruthy();

    // Touchable has accessibility label and disabled state (via accessibilityLabel)
    const touchable = getByLabelText('Date of Birth');
    expect(touchable).toBeTruthy();
    expect(touchable.props.accessibilityState).toBeDefined();
    expect(touchable.props.accessibilityState.disabled).toBe(true);
  });

  it('renders with value and placeholder', () => {
    const onChange = jest.fn();
    const date = new Date(2000, 0, 1);
    const { getByDisplayValue, getByPlaceholderText } = render(
      <DatePicker label="Birthday" value={date} onChange={onChange} placeholder="Pick a date" />
    );
    expect(getByDisplayValue(/2000|Jan|01/)).toBeTruthy();
    // Placeholder is always present in Input, so just check it's rendered
    expect(getByPlaceholderText('Pick a date')).toBeTruthy();
  });

  it('shows error message', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <DatePicker label="Birthday" value={null} onChange={onChange} error="Date required" />
    );
    expect(getByText('Date required')).toBeTruthy();
  });

  it('calls onChange when date is picked (android)', () => {
    const onChange = jest.fn();
    const date = new Date(2020, 5, 15);
    const originalOS = Platform.OS;
    // @ts-expect-error override Platform.OS for test
    Platform.OS = 'android';
    const { getByLabelText } = render(
      <DatePicker label="Birthday" value={null} onChange={onChange} />
    );
    const touchable = getByLabelText('Birthday');
    fireEvent.press(touchable);
    // @ts-expect-error DateTimePicker event signature is not recognized by fireEvent in test
    fireEvent(getByLabelText('Birthday').parent.parent, 'onChange', { type: 'set' }, date);
    expect(onChange).toHaveBeenCalled();
    const call = onChange.mock.calls[0];
    expect(call[1]).toEqual(date);
    // Restore Platform.OS
    // @ts-expect-error restore Platform.OS
    Platform.OS = originalOS;
  });
});
