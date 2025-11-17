import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Button, Input, Typography } from '@components/common';
import { registerStep1ValidationSchema } from '@utils/validation';
import { RegisterData } from '../../../../types';
import { stepStyles } from './Step.styles';

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
  return (
    <View style={stepStyles.container}>
      <View style={stepStyles.header}>
        <Typography variant="h3" style={stepStyles.title}>
          Create your account
        </Typography>
        <Typography variant="body2" style={stepStyles.description}>
          Start by entering the email and password you&apos;ll use to sign in.
        </Typography>
      </View>

      <Formik
        initialValues={{
          email: formData.email ?? '',
          password: formData.password ?? '',
          confirmPassword: formData.confirmPassword ?? '',
        }}
        validationSchema={registerStep1ValidationSchema}
        enableReinitialize
        onSubmit={(values) => {
          onDataChange(values);
          onNext();
        }}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldTouched,
          values,
          errors,
          touched,
        }) => (
          <View style={stepStyles.form}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email', true, true)}
              error={
                touched.email && errors.email ? errors.email : undefined
              }
              keyboardType="email-address"
              autoCapitalize="none"
              style={stepStyles.fieldSpacing}
            />

            <Input
              label="Password"
              placeholder="Enter a secure password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password', true, true)}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
              secureTextEntry
              style={stepStyles.fieldSpacing}
            />

            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => setFieldTouched('confirmPassword', true, true)}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
              secureTextEntry
            />

            <Button
              title="Next"
              onPress={() => handleSubmit()}
              fullWidth
              style={stepStyles.button}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
