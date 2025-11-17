import React from 'react';
import { View } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { Typography, Input, Button, DatePicker, SelectInput, PhoneInput } from '@components/common';
import { RegisterData } from '@types';
import { registerStep2ValidationSchema } from '@utils/validation';
import { styles } from '../Register.styles';
import { spacing } from '@theme';

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface Step2FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
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
}) => {
  const initialValues: Step2FormValues = {
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    phoneNumber: formData.phoneNumber || '',
    countryCode: formData.countryCode || '+1',
    dateOfBirth: formData.dateOfBirth || '',
    gender: formData.gender || '',
  };

  const handleSubmit = (values: Step2FormValues) => {
    // Filter out empty gender value before submitting
    const filteredValues = {
      ...values,
      gender: values.gender || undefined,
    } as Partial<RegisterData>;
    
    onDataChange(filteredValues);
    onNext();
  };

  const handleDateChange = (date: Date, setFieldValue: any) => {
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    setFieldValue('dateOfBirth', formattedDate);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerStep2ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isValid }: FormikProps<Step2FormValues>) => (
        <View>
          <Typography variant="h2" style={styles.stepTitle}>
            Personal Information
          </Typography>
          <Typography variant="body2" style={styles.stepDescription}>
            Tell us a bit about yourself
          </Typography>

          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={() => handleBlur('firstName')}
            error={touched.firstName && errors.firstName ? errors.firstName : undefined}
            autoCapitalize="words"
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={() => handleBlur('lastName')}
            error={touched.lastName && errors.lastName ? errors.lastName : undefined}
            autoCapitalize="words"
          />

          <PhoneInput
            label="Phone Number"
            value={values.phoneNumber}
            onChangeText={(phone: string) => setFieldValue('phoneNumber', phone)}
            onChangeCountryCode={(code: string) => setFieldValue('countryCode', code)}
            countryCode={values.countryCode}
            error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
          />

          <DatePicker
            label="Date of Birth"
            placeholder="Select your date of birth"
            value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
            onChange={(date) => handleDateChange(date, setFieldValue)}
            error={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined}
          />

          <SelectInput
            label="Gender"
            placeholder="Select your gender"
            value={values.gender}
            options={genderOptions}
            onChange={(value) => setFieldValue('gender', value)}
            error={touched.gender && errors.gender ? errors.gender : undefined}
          />

          <View>
            <Button
              title="Back"
              onPress={onPrevious}
              variant="outline"
              size="large"
              fullWidth
            />
            <Button
              title="Continue"
              onPress={() => handleSubmit()}
              variant="primary"
              size="large"
              fullWidth
              style={{ marginTop: spacing.md }}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

