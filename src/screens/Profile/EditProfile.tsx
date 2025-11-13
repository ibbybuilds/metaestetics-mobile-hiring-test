import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  Button,
  Typography,
  DatePicker,
  PhoneInput,
  SelectInput,
  ImagePickerComponent,
} from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProfileThunk } from '@store/auth/authThunks';
import { editProfileValidationSchema } from '@utils/validation';
import { MainStackParamList } from '@types';
import { styles } from './EditProfile.styles';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'EditProfile'
>;

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  const initialValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phoneNumber: user.phoneNumber || '',
    countryCode: user.countryCode || '+1',
    dateOfBirth: user.dateOfBirth
      ? new Date(user.dateOfBirth)
      : (null as Date | null),
    gender: user.gender || '',
    profileImage: user.profileImage || '',
  };

  // Create a validation schema that accepts Date objects and formatted phone numbers
  const validationSchema = editProfileValidationSchema.shape({
    dateOfBirth: Yup.mixed()
      .required('Date of birth is required')
      .test('is-date', 'Date of birth is required', (value) => {
        return value !== null && value !== undefined;
      }),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Phone number must be 10 digits', (value) => {
        if (!value) return false;
        const digits = value.replace(/\D/g, '');
        return digits.length === 10;
      }),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      // Convert Date to ISO string format (YYYY-MM-DD)
      const dateOfBirthString = values.dateOfBirth
        ? values.dateOfBirth.toISOString().split('T')[0]
        : '';

      // Extract only digits from phone number
      const phoneDigits = values.phoneNumber.replace(/\D/g, '');

      const updates = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: phoneDigits,
        countryCode: values.countryCode,
        dateOfBirth: dateOfBirthString,
        gender: values.gender as 'male' | 'female' | 'other',
        profileImage: values.profileImage || undefined,
      };

      const result = await dispatch(updateProfileThunk(updates));

      if (updateProfileThunk.fulfilled.match(result)) {
        navigation.goBack();
      } else if (updateProfileThunk.rejected.match(result)) {
        setFieldError(
          'firstName',
          result.error.message || 'Failed to update profile'
        );
      }
    } catch (error: any) {
      setFieldError('firstName', error.message || 'An error occurred');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleImageSelected = (
    uri: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue('profileImage', uri);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <Typography variant="h2" style={styles.title}>
                Edit Profile
              </Typography>
              <Typography variant="body2" style={styles.subtitle}>
                Update your personal information
              </Typography>

              <View style={styles.imageContainer}>
                <ImagePickerComponent
                  onImageSelected={(uri) =>
                    handleImageSelected(uri, setFieldValue)
                  }
                  currentImage={values.profileImage}
                  size={120}
                />
              </View>

              <Input
                label="First Name"
                placeholder="Enter your first name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={() => handleBlur('firstName')}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : undefined
                }
                autoCapitalize="words"
              />

              <Input
                label="Last Name"
                placeholder="Enter your last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={() => handleBlur('lastName')}
                error={
                  touched.lastName && errors.lastName
                    ? errors.lastName
                    : undefined
                }
                autoCapitalize="words"
              />

              <PhoneInput
                label="Phone Number"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onChangeCountryCode={(code) =>
                  setFieldValue('countryCode', code)
                }
                countryCode={values.countryCode}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : undefined
                }
              />

              <DatePicker
                label="Date of Birth"
                value={values.dateOfBirth}
                onChange={(date) => setFieldValue('dateOfBirth', date)}
                error={
                  touched.dateOfBirth && errors.dateOfBirth
                    ? errors.dateOfBirth
                    : undefined
                }
                placeholder="Select your date of birth"
              />

              <SelectInput
                label="Gender"
                value={values.gender}
                options={genderOptions}
                onChange={(value) => setFieldValue('gender', value)}
                error={
                  touched.gender && errors.gender ? errors.gender : undefined
                }
                placeholder="Select your gender"
              />

              {error && (
                <Typography variant="caption" style={styles.errorText}>
                  {error}
                </Typography>
              )}

              <View style={styles.buttonRow}>
                <Button
                  title="Cancel"
                  onPress={handleCancel}
                  variant="outline"
                  size="large"
                  style={styles.buttonHalf}
                  disabled={isLoading}
                />
                <Button
                  title="Save"
                  onPress={() => handleSubmit()}
                  variant="primary"
                  size="large"
                  style={styles.buttonHalf}
                  disabled={isLoading}
                  loading={isLoading}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
