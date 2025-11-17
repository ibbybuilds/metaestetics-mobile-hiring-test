import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { RegisterData } from '../../../../types/auth.types';
import { Input, Button, SelectInput, DatePicker, Typography } from '@components/common';
import { PhoneInput } from '@components/common/PhoneInput';
import { registerStep2ValidationSchema } from '@utils/validation';
import PhoneInputLib from 'react-native-phone-number-input';
import { colors } from '@theme/colors';

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export const Step2PersonalInfo: React.FC<Step2PersonalInfoProps> = ({ formData, onDataChange, onNext, onPrevious }) => {
  const phoneInputRef = useRef<PhoneInputLib>(null);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        phoneNumber: formData.phoneNumber || '',
        countryCode: formData.countryCode || '+1',
        dateOfBirth: formData.dateOfBirth || '',
        gender: formData.gender || '',
      }}
      validationSchema={registerStep2ValidationSchema}
      onSubmit={values => {
        // Get the current country code from the PhoneInput picker
        let finalCountryCode = values.countryCode;
        if (phoneInputRef.current) {
          const code = phoneInputRef.current.getCallingCode();
          if (code) finalCountryCode = `+${code}`;
        }
        onDataChange({
          ...values,
          countryCode: finalCountryCode,
          gender: values.gender as 'male' | 'female' | 'other',
        });
        onNext();
      }}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, submitCount }) => (
        <View>
          <Typography variant="h3" style={styles.title}>
            {`Personal Details`}
          </Typography>
          <Typography variant="body2" style={styles.description}>
            {`Enter your name, phone, date of birth, and gender.`}
          </Typography>
          <Input
            label="First Name"
            accessibilityLabel="First Name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            error={((touched.firstName || submitCount > 0) && errors.firstName) ? errors.firstName : undefined}
            autoCapitalize="words"
          />
          <Input
            label="Last Name"
            accessibilityLabel="Last Name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            error={((touched.lastName || submitCount > 0) && errors.lastName) ? errors.lastName : undefined}
            autoCapitalize="words"
          />
          <PhoneInput
            ref={phoneInputRef}
            value={values.phoneNumber}
            countryCode={values.countryCode}
            onChangeText={handleChange('phoneNumber')}
            onChangeCountryCode={(code: string) => setFieldValue('countryCode', code)}
            onBlur={handleBlur('phoneNumber')}
            error={((touched.phoneNumber || submitCount > 0) && errors.phoneNumber) ? errors.phoneNumber : undefined}
          />
          <DatePicker
            label="Date of Birth"
            value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
            onChange={date => setFieldValue('dateOfBirth', date.toISOString().split('T')[0])}
            error={((touched.dateOfBirth || submitCount > 0) && errors.dateOfBirth) ? errors.dateOfBirth : undefined}
          />
          <SelectInput
            label="Gender"
            value={values.gender}
            options={genderOptions}
            onChange={handleChange('gender')}
            error={((touched.gender || submitCount > 0) && errors.gender) ? errors.gender : undefined}
          />
          <View style={styles.buttonRow}>
            <Button
              title="Back"
              onPress={onPrevious}
              variant="secondary"
              style={styles.buttonLeft}
              accessibilityLabel="Go back to previous step"
              accessibilityHint="Navigates to the previous registration step"
              accessibilityRole="button"
            />
            <Button
              title="Next"
              onPress={() => handleSubmit()}
              variant="primary"
              style={styles.buttonRight}
              accessibilityLabel="Go to next step"
              accessibilityHint="Proceeds to the next registration step after validating your personal information."
              accessibilityRole="button"
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'left',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'left',
  },
  buttonLeft: {
    flex: 1,
    marginRight: 8,
  },
  buttonRight: {
    flex: 1,
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

