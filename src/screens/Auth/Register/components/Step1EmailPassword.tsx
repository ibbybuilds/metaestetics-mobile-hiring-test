import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Input, Button, Typography } from '@components/common';
import { registerStep1ValidationSchema } from '@utils/validation';
import { styles } from './Step.styles';
import { RegisterData } from '@types';
import { storageService } from '@services';
import Entypo from '@expo/vector-icons/Entypo';
export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  isEditing: boolean;
}

export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = ({
  formData,
  onDataChange,
  onNext,
  isEditing,
}) => {
  const initialValues = {
    email: formData.email ?? '',
    password: formData.password ?? '',
    confirmPassword: formData.confirmPassword ?? '',
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
        <Typography variant="h2">Create Your Account</Typography>
        <Typography variant="body2" style={styles.subtle}>
          Provide the email and password required for future log-in.
        </Typography>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={registerStep1ValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          setFieldTouched,
          setFieldError,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <View style={styles.inputWrapper}>
              <Input
                label="Email"
                placeholder="Your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => {
                  setFieldTouched('email', true, true);
                  onDataChange(values);
                }}
                error={touched.email && errors.email ? errors.email : undefined}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => {
                  setFieldTouched('password', true, true);
                  onDataChange(values);
                }}
                error={touched.password && errors.password ? errors.password : undefined}
                secureTextEntry
              />

              <Input
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => {
                  setFieldTouched('confirmPassword', true, true);
                  onDataChange(values);
                }}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : undefined
                }
                secureTextEntry
              />
            </View>
            <View style={styles.formFooter}>
              <Button
                rightIcon={<Entypo name="chevron-right" size={24} color="white" />}
                title={isEditing ? 'Review' : 'Next'}
                onPress={async () => {
                  const exists = await storageService.checkEmailExists(values.email);
                  if (exists) {
                    setFieldError('email', 'This email address is already registered.');
                    return;
                  }
                  handleSubmit();
                }}
                fullWidth
                loading={isSubmitting}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
