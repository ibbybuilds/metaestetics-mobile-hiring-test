import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import { Input, Button, Typography } from '@components/common';
import { registerStep1ValidationSchema } from '@utils/validation';
import { RegisterData } from '@types';
import { styles } from '../Register.styles';

export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
}

// implementing the registration forms exactly as the login form (same structure and components)
export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = ({
  formData,
  onDataChange,
  onNext,
}) => {
  const handleSubmit = (values: { email: string; password: string; confirmPassword: string }) => {
    onDataChange({
      email: values.email,
      password: values.password,
    });
    onNext();
  };

  return (
    <View style={styles.container}>
      {/* Didn't use the Typography component because this title is a unique style and not part of the usual typography constants. It’s used only once, so a plain Text component is sufficient. */}
      <Text style={styles.title}>
        Your Aesthetic Journey Begins
      </Text>
      <Typography variant="body2" style={styles.subtitle}>
        Create your account and step into your aesthetic world.
      </Typography>

      <Formik
        initialValues={{
          email: formData.email || '',
          password: formData.password || '',
          confirmPassword: '',
        }}
        validationSchema={registerStep1ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="you@example.com"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => handleBlur('email')}
              error={touched.email && errors.email ? errors.email : undefined}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Password must be at least 6 characters"
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

            <View>
                
            </View>

            <Button
              title="Next →"
              onPress={() => handleSubmit()}
              variant="primary"
              size="medium"
              style={styles.button}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
