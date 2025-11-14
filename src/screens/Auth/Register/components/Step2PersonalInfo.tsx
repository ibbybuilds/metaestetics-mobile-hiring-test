import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Input, DatePicker, PhoneInput, SelectInput, Button, Typography } from '@components/common';
import { registerStep2ValidationSchema } from '@utils/validation';
import { styles } from './Step.styles';
import { RegisterData } from '@types';
import { GENDER_OPTIONS } from '@utils/constants';
import { formatDateOfBirth } from '@utils/formatters';
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
  const initialValues = {
    firstName: formData.firstName ?? '',
    lastName: formData.lastName ?? '',
    phoneNumber: formData.phoneNumber ?? '',
    countryCode: formData.countryCode ?? '',
    dateOfBirth: formData.dateOfBirth ?? '',
    gender: formData.gender ?? undefined,
  };

  const handleFormSubmit = useCallback(
    (values: typeof initialValues) => {
      onDataChange(values);
      onNext();
    },
    [onDataChange, onNext]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h2">Personal Details</Typography>
        <Typography variant="body2" style={styles.subtle}>
          We need this information to complete your profile.
        </Typography>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={registerStep2ValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          setFieldTouched,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <View style={styles.inputWrapper}>
              <Input
                label="First Name"
                placeholder="Your first name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={() => {
                  setFieldTouched('firstName', true, true);
                  onDataChange(values);
                }}
                error={touched.firstName ? errors.firstName : undefined}
                autoCapitalize="none"
              />

              <Input
                label="Last Name"
                placeholder="Your last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={() => {
                  setFieldTouched('lastName', true, true);
                  onDataChange(values);
                }}
                error={touched.lastName ? errors.lastName : undefined}
                autoCapitalize="none"
              />

              <PhoneInput
                label="Phone Number"
                value={values.phoneNumber}
                countryCode={values.countryCode}
                onChangeText={(phone) => {
                  setFieldValue('phoneNumber', phone);
                  onDataChange({ ...values, phoneNumber: phone });
                }}
                onChangeCountryCode={(code) => {
                  setFieldValue('countryCode', code);
                  onDataChange({ ...values, countryCode: code });
                }}
                error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
              />

              <DatePicker
                label="Date of Birth"
                value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                onChange={(date) => {
                  setFieldValue('dateOfBirth', formatDateOfBirth(date));
                  onDataChange({ ...values, dateOfBirth: formatDateOfBirth(date) });
                }}
                error={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined}
              />

              <SelectInput
                label="Gender"
                value={values.gender}
                options={GENDER_OPTIONS}
                onChange={(selected) => {
                  setFieldValue('gender', selected as RegisterData['gender']);
                  onDataChange({ ...values, gender: selected as RegisterData['gender'] });
                }}
                error={touched.gender && errors.gender ? errors.gender : undefined}
              />
            </View>
            <View style={styles.formFooter}>
              <Button
                variant="outline"
                style={styles.formButton}
                title="Back"
                onPress={onPrevious}
              />
              <Button
                style={styles.formButton}
                title="Next"
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
