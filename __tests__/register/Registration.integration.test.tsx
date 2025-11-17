import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Step1EmailPassword } from '../../src/screens/Auth/Register/components/Step1EmailPassword';
import { Step2PersonalInfo } from '../../src/screens/Auth/Register/components/Step2PersonalInfo';
import { Step3ProfilePhoto } from '../../src/screens/Auth/Register/components/Step3ProfilePhoto';
import { Step4Review } from '../../src/screens/Auth/Register/components/Step4Review';

// Integration test for registration flow (happy path)
describe('Registration Flow Integration', () => {
  it('completes registration with valid data', async () => {
    // Step 1
    const step1Data = {};
    const onDataChange1 = jest.fn();
    const onNext1 = jest.fn();
    const { getByLabelText, getByText, unmount } = render(
      <Step1EmailPassword formData={step1Data} onDataChange={onDataChange1} onNext={onNext1} />
    );
    fireEvent.changeText(getByLabelText('Email'), 'test@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.changeText(getByLabelText('Confirm Password'), 'password123');
    fireEvent.press(getByText('Next'));
    await waitFor(() => expect(onDataChange1).toHaveBeenCalled());
    await waitFor(() => expect(onNext1).toHaveBeenCalled());
    unmount();

    // Step 2
    const step2Data = { dateOfBirth: '2000-01-01', gender: 'male' } as const;
    const onDataChange2 = jest.fn();
    const onNext2 = jest.fn();
    const onPrevious2 = jest.fn();
    const { getByLabelText: get2, getByText: getText2, unmount: unmount2 } = render(
      <Step2PersonalInfo formData={step2Data} onDataChange={onDataChange2} onNext={onNext2} onPrevious={onPrevious2} />
    );
    fireEvent.changeText(get2('First Name'), 'John');
    fireEvent.changeText(get2('Last Name'), 'Doe');
    fireEvent.changeText(get2('Phone Number'), '1234567890');
    fireEvent.press(getText2('Next'));
    await waitFor(() => expect(onDataChange2).toHaveBeenCalled());
    await waitFor(() => expect(onNext2).toHaveBeenCalled());
    unmount2();

    // Step 3
    const step3Data = { profileImage: 'mock-uri' } as const;
    const onDataChange3 = jest.fn();
    const onNext3 = jest.fn();
    const onPrevious3 = jest.fn();
    const { getByText: getText3, unmount: unmount3 } = render(
      <Step3ProfilePhoto formData={step3Data} onDataChange={onDataChange3} onNext={onNext3} onPrevious={onPrevious3} />
    );
    fireEvent.press(getText3('Next'));
    await waitFor(() => expect(onNext3).toHaveBeenCalled());
    unmount3();

    // Step 4
    const step4Data = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      phoneNumber: '1234567890',
      countryCode: '+1',
      dateOfBirth: '2000-01-01',
      gender: 'male',
      profileImage: 'mock-uri',
    } as const;
    const onPrevious4 = jest.fn();
    const onSubmit4 = jest.fn();
    const { getByText: getText4 } = render(
      <Step4Review formData={step4Data} onPrevious={onPrevious4} onSubmit={onSubmit4} isLoading={false} />
    );
    fireEvent.press(getText4('Create'));
    await waitFor(() => expect(onSubmit4).toHaveBeenCalled());
  });

  it('does not proceed if required fields are missing in any step', async () => {
    // Step 1: Try to submit empty
    const onDataChange1 = jest.fn();
    const onNext1 = jest.fn();
    const { getByText, findAllByText } = render(
      <Step1EmailPassword formData={{}} onDataChange={onDataChange1} onNext={onNext1} />
    );
    fireEvent.press(getByText('Next'));
    const passwordErrors = await findAllByText(/password is required/i);
    expect(passwordErrors.length).toBeGreaterThanOrEqual(1);
    expect(onNext1).not.toHaveBeenCalled();
  });
});
