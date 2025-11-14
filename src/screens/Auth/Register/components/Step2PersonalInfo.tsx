import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Input, Button, Typography, DatePicker, SelectInput, PhoneInput } from '@components/common';
import { registerStep2ValidationSchema } from '@utils/validation';
import { RegisterData } from '@types';
import { styles } from '../Register.styles'
import { GENDER_OPTIONS } from '@utils/constants';

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Placeholder component - candidates will implement this
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

  return (
    <View style={styles.container}>
      <Typography variant="h1">
        Personal Information
      </Typography>
      <Typography variant="body2" style={styles.subtitle}>
        Let us know a little about you
      </Typography>

      <Formik
        initialValues={{
          firstName: formData.firstName || '',
          lastName: formData.lastName || '',
          phoneNumber: formData.phoneNumber || '',
          countryCode: formData.countryCode || '',
          dateOfBirth: formData.dateOfBirth || '',
          gender: (formData.gender || 'male') as 'male' | 'female' | 'other',
        }}
        validationSchema={registerStep2ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View style={styles.form}>
            <Input
              label="First Name"
              placeholder="Enter your first name"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={() => handleBlur('firstName')}
              error={touched.firstName && errors.firstName ? errors.firstName : undefined}
            />

            <Input
              label="Last Name"
              placeholder="Enter your last name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={() => handleBlur('lastName')}
              error={touched.lastName && errors.lastName ? errors.lastName : undefined}
            />

            <PhoneInput
              label="Phone Number"
              value={values.phoneNumber}
              countryCode={values.countryCode}
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
              options={GENDER_OPTIONS}
              onChange={(value) => setFieldValue('gender', value)}
              placeholder="Select your gender"
              error={touched.gender && errors.gender ? errors.gender : undefined}
            />

            <View style={styles.buttonContainer}>
              <Button
                title="< Back" 
                onPress={onPrevious}
                variant="outline"
                style={styles.backButton}
              />
          
              <Button
                title="Next >"
                onPress={() => handleSubmit()}
                variant="primary"
                style={styles.nextButton}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

