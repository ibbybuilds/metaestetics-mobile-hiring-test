import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Input, Button, Typography } from '@components/common';
import { RegisterData } from '@types';
import { registerStep1ValidationSchema } from '@utils/validation';
import { colors, spacing } from '@theme';

export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => Promise<void>;
  onNext: () => void;
}

const initialValues = (formData: Partial<RegisterData>) => ({
  email: formData.email ?? '',
  password: formData.password ?? '',
  confirmPassword: formData.confirmPassword ?? '',
});

type Step1Values = ReturnType<typeof initialValues>;

export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = ({
  formData,
  onDataChange,
  onNext,
}) => {
  const handleSubmit = async (values: Step1Values) => {
    await onDataChange(values);
    onNext();
  };

  return (
    <Formik<Step1Values>
      initialValues={initialValues(formData)}
      validationSchema={registerStep1ValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <View style={styles.container}>
          <Typography variant="h3" style={styles.title}>
            Create an account
          </Typography>
          <Typography variant="body2" style={styles.description}>
            Use your email and a secure password to start your journey.
          </Typography>

          <Input
            label="Email"
            placeholder="you@example.com"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && errors.email ? errors.email : undefined}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.field}
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={touched.password && errors.password ? errors.password : undefined}
            secureTextEntry
            style={styles.field}
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={
              touched.confirmPassword && errors.confirmPassword
                ? errors.confirmPassword
                : undefined
            }
            secureTextEntry
            style={styles.field}
          />

          <Button
            title="Continue"
            onPress={() => handleSubmit()}
            variant="primary"
            size="large"
            fullWidth
            style={styles.button}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {
    marginBottom: spacing.sm,
  },
  description: {
    marginBottom: spacing.lg,
    color: colors.textSecondary,
  },
  field: {
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
  },
});
