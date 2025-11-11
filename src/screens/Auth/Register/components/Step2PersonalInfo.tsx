import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Input, Button, Typography, DatePicker, SelectInput, PhoneInput } from '@components/common';
import { RegisterData } from '@types';
import { registerStep2ValidationSchema } from '@utils/validation';
import { colors, spacing } from '@theme';

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Step2PersonalInfo: React.FC<Step2PersonalInfoProps> = ({
  formData,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const [countryCode, setCountryCode] = useState(formData.countryCode || '+1');

  const handleSubmit = (values: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
  }) => {
    onDataChange({
      ...values,
      countryCode,
    });
    onNext();
  };

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <View style={styles.container}>
      <Typography variant="h2" style={styles.title}>
        Personal Information
      </Typography>
      <Typography variant="body2" style={styles.subtitle}>
        Tell us a bit about yourself
      </Typography>

      <Formik
        initialValues={{
          firstName: formData.firstName || '',
          lastName: formData.lastName || '',
          phoneNumber: formData.phoneNumber || '',
          dateOfBirth: formData.dateOfBirth || '',
          gender: (formData.gender || 'male') as 'male' | 'female' | 'other',
        }}
        validationSchema={registerStep2ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldTouched, setFieldValue }) => (
          <View style={styles.form}>
            <Input
              label="First Name"
              placeholder="Enter your first name"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={() => setFieldTouched('firstName')}
              error={touched.firstName && errors.firstName ? errors.firstName : undefined}
            />

            <Input
              label="Last Name"
              placeholder="Enter your last name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={() => setFieldTouched('lastName')}
              error={touched.lastName && errors.lastName ? errors.lastName : undefined}
            />

            <PhoneInput
              label="Phone Number"
              onChangeText={(text) => setFieldValue('phoneNumber', text)}
              onChangeCountryCode={setCountryCode}
              error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
            />

            <DatePicker
              label="Date of Birth"
              value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
              onChange={(date) => setFieldValue('dateOfBirth', date.toISOString().split('T')[0])}
              error={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined}
            />

            <SelectInput
              label="Gender"
              value={values.gender}
              options={genderOptions}
              onChange={(value) => setFieldValue('gender', value)}
              placeholder="Select your gender"
              error={touched.gender && errors.gender ? errors.gender : undefined}
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Back"
                onPress={onPrevious}
                variant="outline"
                size="large"
                style={styles.backButton}
              />
              <Button
                title="Next"
                onPress={() => handleSubmit()}
                variant="primary"
                size="large"
                style={styles.nextButton}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  subtitle: {
    marginBottom: spacing.xl,
    color: colors.textSecondary,
  },
  form: {
    gap: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});
