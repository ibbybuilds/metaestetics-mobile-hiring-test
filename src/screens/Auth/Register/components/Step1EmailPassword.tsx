import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import { RegisterData } from '../../../../types/auth.types';
import { Input, Button } from '@components/common';
import { registerStep1EmailPasswordSchema } from '@utils/validation';
import { colors } from '../../../../theme/colors';

export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
}

export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = ({ formData, onDataChange, onNext }) => {
  return (
    <Formik
      initialValues={{
        email: formData.email || '',
        password: formData.password || '',
        confirmPassword: formData.confirmPassword || '',
      }}
      validationSchema={registerStep1EmailPasswordSchema}
      onSubmit={values => {
        onDataChange(values);
        onNext();
      }}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitCount }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.description}>
            Enter your email and password to continue.
          </Text>
          <Input
            label="Email"
            accessibilityLabel="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={((touched.email || submitCount > 0) && errors.email) ? errors.email : undefined}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            label="Password"
            accessibilityLabel="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={((touched.password || submitCount > 0) && errors.password) ? errors.password : undefined}
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            accessibilityLabel="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={((touched.confirmPassword || submitCount > 0) && errors.confirmPassword) ? errors.confirmPassword : undefined}
            secureTextEntry
          />
          <Button
            title="Next"
            onPress={() => handleSubmit()}
            accessibilityLabel="Go to next step"
            accessibilityHint="Proceeds to the next registration step after validating your email and password."
            accessibilityRole="button"
            style={styles.nextButton}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 18,
    maxWidth: 320,
    paddingLeft: 2,
    textAlign: 'left',
  },
  nextButton: {
    marginTop: 24,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    paddingLeft: 2,
    textAlign: 'left',
  },
});
