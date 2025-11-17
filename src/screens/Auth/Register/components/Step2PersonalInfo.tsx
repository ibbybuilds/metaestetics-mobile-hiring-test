import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Button, DatePicker, Input, PhoneInput, SelectInput, Typography } from '@components/common';
import { registerStep2ValidationSchema } from '@utils/validation';
import { GENDER_OPTIONS } from '@utils/constants';
import { RegisterData } from '../../../../types';
import { stepStyles } from './Step.styles';

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
  return (
    <View style={stepStyles.container}>
      <View style={stepStyles.header}>
        <Typography variant="h3" style={stepStyles.title}>
          Tell us about you
        </Typography>
        <Typography variant="body2" style={stepStyles.description}>
          We use this information to personalize your experience.
        </Typography>
      </View>

      <Formik
        initialValues={{
          firstName: formData.firstName ?? '',
          lastName: formData.lastName ?? '',
          phoneNumber: formData.phoneNumber ?? '',
          countryCode: formData.countryCode ?? '+1',
          dateOfBirth: formData.dateOfBirth ?? '',
          gender: formData.gender ?? '',
        }}
        validationSchema={registerStep2ValidationSchema}
        enableReinitialize
        onSubmit={(values) => {
          onDataChange({
            ...values,
            gender: values.gender as RegisterData['gender'],
          });
          onNext();
        }}
      >
        {(formikHelpers) => {
          const {
            handleChange,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
          } = formikHelpers;

          const handleBack = () => {
            onDataChange({
              ...values,
              gender: (values.gender as RegisterData['gender']) || 'male',
            });
            onPrevious();
          };

          return (
            <View style={stepStyles.form}>
              <Input
                label="First Name"
                placeholder="Enter your first name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={() => setFieldTouched('firstName', true, true)}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : undefined
                }
                autoCapitalize="words"
                style={stepStyles.fieldSpacing}
              />

              <Input
                label="Last Name"
                placeholder="Enter your last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName', true, true)}
                error={
                  touched.lastName && errors.lastName
                    ? errors.lastName
                    : undefined
                }
                autoCapitalize="words"
                style={stepStyles.fieldSpacing}
              />

              <PhoneInput
                label="Phone Number"
                value={values.phoneNumber}
                countryCode={values.countryCode}
                onChangeText={(phone) => {
                  const sanitised = phone.replace(/[^0-9]/g, '');
                  setFieldTouched('phoneNumber', true, false);
                  setFieldValue('phoneNumber', sanitised);
                }}
                onChangeCountryCode={(code) => {
                  setFieldValue('countryCode', code);
                }}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : undefined
                }
              />

              <View style={stepStyles.fieldSpacing}>
                <DatePicker
                  label="Date of Birth"
                  value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                  onChange={(date) => {
                    setFieldTouched('dateOfBirth', true, false);
                    setFieldValue('dateOfBirth', date.toISOString());
                  }}
                  error={
                    touched.dateOfBirth && errors.dateOfBirth
                      ? errors.dateOfBirth
                      : undefined
                  }
                />
              </View>

              <SelectInput
                label="Gender"
                value={values.gender}
                options={GENDER_OPTIONS}
                onChange={(selected) => {
                  setFieldTouched('gender', true, false);
                  setFieldValue('gender', selected);
                }}
                error={
                  touched.gender && errors.gender ? errors.gender : undefined
                }
              />

              <View style={stepStyles.buttonRow}>
                <View style={stepStyles.buttonHalf}>
                <Button
                    title="Back"
                    variant="secondary"
                    onPress={handleBack}
                    fullWidth
                  />
                </View>
                <View style={[stepStyles.buttonHalf, stepStyles.buttonSpacing]}>
                  <Button
                    title="Next"
                    onPress={() => handleSubmit()}
                    fullWidth
                  />
                </View>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

