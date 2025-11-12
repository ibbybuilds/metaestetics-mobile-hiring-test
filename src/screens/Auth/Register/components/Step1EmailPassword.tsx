import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Input, Button, Typography } from '@components/common';
import { RegisterData } from '@types';
import { registerStep1ValidationSchema } from '@utils/validation';
import { colors, spacing } from '@theme';

export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
}

export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = ({
  formData,
  onDataChange,
  onNext,
}) => {
  const handleSubmit = (values: { email: string; password: string; confirmPassword: string }) => {
    onDataChange({
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    onNext();
  };

  return (
    <View style={styles.container}>
      <Typography variant="h2" style={styles.title}>
        Create Account
      </Typography>
      <Typography variant="body2" style={styles.subtitle}>
        Enter your email and password to get started
      </Typography>

      <Formik
        initialValues={{
          email: formData.email || '',
          password: formData.password || '',
          confirmPassword: formData.confirmPassword || '',
        }}
        validationSchema={registerStep1ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldTouched }) => (
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              error={touched.email && errors.email ? errors.email : undefined}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              error={touched.password && errors.password ? errors.password : undefined}
              secureTextEntry
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => setFieldTouched('confirmPassword')}
              error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
              secureTextEntry
            />

            <Button
              title="Next"
              onPress={() => handleSubmit()}
              variant="primary"
              size="large"
              fullWidth
              style={styles.button}
            />
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
  button: {
    marginTop: spacing.md,
  },
});
