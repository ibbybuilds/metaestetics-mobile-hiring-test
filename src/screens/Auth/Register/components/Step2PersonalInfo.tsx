import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  Button,
  Typography,
  DatePicker,
  PhoneInput,
  SelectInput,
} from '@components/common';
import { RegisterData } from '@types';
import { registerStep2ValidationSchema } from '@utils/validation';
import { styles } from '../Register.styles';

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  error?: string | null;
}

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export const Step2PersonalInfo: React.FC<Step2PersonalInfoProps> = ({
  formData,
  onDataChange,
  onNext,
  onPrevious,
  error,
}) => {
  const initialValues = {
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    phoneNumber: formData.phoneNumber || '',
    countryCode: formData.countryCode || '+1',
    dateOfBirth: formData.dateOfBirth
      ? new Date(formData.dateOfBirth)
      : (null as Date | null),
    gender: formData.gender || '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    // Convert Date to ISO string format (YYYY-MM-DD)
    const dateOfBirthString = values.dateOfBirth
      ? values.dateOfBirth.toISOString().split('T')[0]
      : '';

    // Extract only digits from phone number
    const phoneDigits = values.phoneNumber.replace(/\D/g, '');

    onDataChange({
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: phoneDigits,
      countryCode: values.countryCode,
      dateOfBirth: dateOfBirthString,
      gender: values.gender as 'male' | 'female' | 'other',
    });
    onNext();
  };

  // Create a validation schema that accepts Date objects and formatted phone numbers
  const validationSchema = registerStep2ValidationSchema.shape({
    dateOfBirth: Yup.mixed()
      .required('Date of birth is required')
      .test('is-date', 'Date of birth is required', (value) => {
        return value !== null && value !== undefined;
      }),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Phone number must be 10 digits', (value) => {
        if (!value) return false;
        const digits = value.replace(/\D/g, '');
        return digits.length === 10;
      }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.stepContainer}>
          <Typography variant="h2" style={styles.stepTitle}>
            Personal Information
          </Typography>
          <Typography variant="body2" style={styles.stepSubtitle}>
            Tell us a bit about yourself
          </Typography>

          <View style={styles.form}>
            <Input
              label="First Name"
              placeholder="Enter your first name"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={() => handleBlur('firstName')}
              error={
                touched.firstName && errors.firstName
                  ? errors.firstName
                  : undefined
              }
              autoCapitalize="words"
            />

            <Input
              label="Last Name"
              placeholder="Enter your last name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={() => handleBlur('lastName')}
              error={
                touched.lastName && errors.lastName
                  ? errors.lastName
                  : undefined
              }
              autoCapitalize="words"
            />

            <PhoneInput
              label="Phone Number"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onChangeCountryCode={(code) => setFieldValue('countryCode', code)}
              countryCode={values.countryCode}
              error={
                touched.phoneNumber && errors.phoneNumber
                  ? errors.phoneNumber
                  : undefined
              }
            />

            <DatePicker
              label="Date of Birth"
              value={values.dateOfBirth}
              onChange={(date) => setFieldValue('dateOfBirth', date)}
              error={
                touched.dateOfBirth && errors.dateOfBirth
                  ? errors.dateOfBirth
                  : undefined
              }
              placeholder="Select your date of birth"
            />

            <SelectInput
              label="Gender"
              value={values.gender}
              options={genderOptions}
              onChange={(value) => setFieldValue('gender', value)}
              error={
                touched.gender && errors.gender ? errors.gender : undefined
              }
              placeholder="Select your gender"
            />

            {error && (
              <Typography variant="caption" style={styles.errorText}>
                {error}
              </Typography>
            )}

            <View style={styles.buttonRow}>
              <Button
                title="Previous"
                onPress={onPrevious}
                variant="outline"
                size="large"
                style={styles.buttonHalf}
              />
              <Button
                title="Next"
                onPress={() => handleSubmit()}
                variant="primary"
                size="large"
                style={styles.buttonHalf}
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};
