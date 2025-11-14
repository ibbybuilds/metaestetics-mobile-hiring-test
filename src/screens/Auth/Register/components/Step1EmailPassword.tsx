import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Input, Button, Typography } from '@components/common';
import { RegisterData } from '../../../../types';
import { registerStep1ValidationSchema } from '@utils/validation';
import { styles } from '../Register.styles';
import { strings } from '@utils/strings';

export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
}

/**
 * Step1EmailPassword component handles the first step of user registration,
 * collecting the user's email, password, and password confirmation.
 * It uses Formik for form management and Yup for validation.
 */
export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = ({
  formData, // Current form data from the parent Register component
  onDataChange, // Callback to update form data in the parent
  onNext, // Callback to proceed to the next registration step
}) => {
  return (
    <Formik
      // Initialize form values with existing formData or empty strings
      initialValues={{
        email: formData.email || '',
        password: formData.password || '',
        confirmPassword: formData.confirmPassword || '',
      }}
      validationSchema={registerStep1ValidationSchema} // Apply Yup validation schema
      onSubmit={(values) => {
        onDataChange(values); // Update parent form data with current step's values
        onNext(); // Proceed to the next step
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.formContainer}>
          <Typography variant="h4" style={styles.title}>{strings.createAccountTitle}</Typography>
          <Typography variant="body2" style={styles.description}>{strings.createAccountDescription}</Typography>
          {/* Email input field */}
          <Input
            label={strings.emailLabel}
            placeholder={strings.emailPlaceholder}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
            autoCapitalize="none"
            error={touched.email && errors.email ? errors.email : undefined}
          />
          {/* Password input field */}
          <Input
            label={strings.passwordLabel}
            placeholder={strings.passwordPlaceholder}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            error={touched.password && errors.password ? errors.password : undefined}
          />
          {/* Confirm Password input field */}
          <Input
            label={strings.confirmPasswordLabel}
            placeholder={strings.confirmPasswordPlaceholder}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            secureTextEntry
            error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
          />
          {/* Button to navigate to the next step */}
          <Button title={strings.nextButton} onPress={handleSubmit} style={styles.button} />
        </View>
      )}
    </Formik>
  );
};
