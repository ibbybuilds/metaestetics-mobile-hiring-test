import React from 'react';
import { View } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { Typography, Input, Button } from '@components/common';
import { RegisterData } from '@types';
import { registerStep1ValidationSchema } from '@utils/validation';
import { styles } from '../Register.styles';

export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  error?: string;
}

interface Step1FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = ({
  formData,
  onDataChange,
  onNext,
  error,
}) => {
  const initialValues: Step1FormValues = {
    email: formData.email || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
  };

  const handleSubmit = (values: Step1FormValues) => {
    onDataChange(values);
    onNext();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerStep1ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }: FormikProps<Step1FormValues>) => (
        <View>
          <Typography variant="h2" style={styles.stepTitle}>
            Create your account
          </Typography>
          <Typography variant="body2" style={styles.stepDescription}>
            Enter your email address and create a secure password
          </Typography>

          <View>
            <Input
              label="Email Address"
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
              error={touched.password && errors.password ? errors.password : undefined}
              secureTextEntry
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
              secureTextEntry
            />

            {error && (
              <Typography variant="caption" style={styles.errorText}>
                {error}
              </Typography>
            )}

            <View>
              <Button
                title="Continue"
                onPress={() => handleSubmit()}
                variant="primary"
                size="large"
                fullWidth
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};
