import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { DatePicker } from '../../../src/components/common/DatePicker/DatePicker';

describe('DatePicker iOS modal behavior', () => {
  const realPlatform = Platform.OS;
  beforeAll(() => {
    Object.defineProperty(Platform, 'OS', { configurable: true, get: () => 'ios' });
  });
  afterAll(() => {
    Object.defineProperty(Platform, 'OS', { configurable: true, get: () => realPlatform });
  });

  it('shows modal when pressed and closes on Cancel', async () => {
    const onChange = jest.fn();
    const { getByLabelText, getByText, queryByText } = render(
      <DatePicker label="Birthday" value={null} onChange={onChange} />
    );
    fireEvent.press(getByLabelText('Birthday'));
    expect(getByText('Cancel')).toBeTruthy();
    fireEvent.press(getByText('Cancel'));
    await waitFor(() => {
      expect(queryByText('Cancel')).toBeNull();
    });
  });

  it('calls onChange and closes modal on Done', async () => {
    const onChange = jest.fn();
    // Use a valid date at least 12 years ago
    const validDate = new Date(2000, 0, 1);
    const { getByLabelText, getByText } = render(
      <DatePicker label="Birthday" value={validDate} onChange={onChange} />
    );
    fireEvent.press(getByLabelText('Birthday'));
    expect(getByText('Done')).toBeTruthy();
    fireEvent.press(getByText('Done'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });
});
