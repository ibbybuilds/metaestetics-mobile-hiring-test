import React from 'react';
import { View } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { Input, Button, Typography } from '@components/common';
import { storageService } from '@services';
import { RegisterData } from '@types';
import { registerStep1ValidationSchema } from '@utils/validation';
import { MOCK_USERS } from '@utils/constants';
import { styles } from '../Register.styles';

export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  error?: string | null;
}

export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = ({
  formData,
  onDataChange,
  onNext,
  error,
}) => {
  const initialValues = {
    email: formData.email || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      // Check if email exists in hardcoded mock users
      const existsInMockUsers = MOCK_USERS.some(
        (u) => u.email.toLowerCase() === values.email.toLowerCase()
      );

      // Check if email already exists in registered users
      const existsInRegistered = await storageService.checkEmailExists(
        values.email
      );

      if (existsInMockUsers || existsInRegistered) {
        setFieldError(
          'email',
          'This email is already registered. Please use a different email.'
        );
        return; // Don't proceed to next step
      }

      // Email doesn't exist, proceed with registration
      onDataChange({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      onNext();
    } catch (error) {
      setFieldError(
        'email',
        'An error occurred while checking email availability. Please try again.'
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerStep1ValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.stepContainer}>
          <Typography variant="h2" style={styles.stepTitle}>
            Create Account
          </Typography>
          <Typography variant="body2" style={styles.stepSubtitle}>
            Enter your email and password to get started
          </Typography>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => handleBlur('email')}
              error={touched.email && errors.email ? errors.email : undefined}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => handleBlur('password')}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
              secureTextEntry
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
              secureTextEntry
            />

            {error && (
              <Typography variant="caption" style={styles.errorText}>
                {error}
              </Typography>
            )}

            <Button
              title="Next"
              onPress={() => handleSubmit()}
              variant="primary"
              size="large"
              fullWidth
              style={styles.stepButton}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};
