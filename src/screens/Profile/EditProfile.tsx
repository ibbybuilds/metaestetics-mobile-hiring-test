import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { Typography, Button, Card, Input, SelectInput, DatePicker, PhoneInput, ImagePickerComponent } from '@components/common';
import { editProfileValidationSchema } from '@utils/validation';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProfileThunk } from '@store/auth/authThunks';
import { clearError } from '@store/auth/authSlice';
import { MainStackParamList, User } from '@types';
import { colors, spacing } from '@theme';
import { styles } from './EditProfile.styles';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'EditProfile'>;

interface EditProfileFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  profileImage?: string;
}



export const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(state => state.auth);

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (!user) {
    return null;
  }

  const initialValues: EditProfileFormData = {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    countryCode: user.countryCode,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    profileImage: user.profileImage,
  };

  const handleSubmit = async (values: EditProfileFormData) => {
    try {
      const updates: Partial<User> = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        countryCode: values.countryCode,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        profileImage: values.profileImage,
      };

      await dispatch(updateProfileThunk(updates)).unwrap();
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      // Error will be shown inline
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.content}>
        <Formik
          initialValues={initialValues}
          validationSchema={editProfileValidationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit: formikSubmit }) => (
            <View style={{ flex: 1 }}>

              {/* Profile Image Section */}
              <View style={styles.imageSection}>
                <View style={styles.imagePickerButton}>
                  <ImagePickerComponent
                    onImageSelected={(uri) => setFieldValue('profileImage', uri)}
                    currentImage={values.profileImage}
                    size={120}
                  />
                </View>
              </View>

              <Card style={styles.formCard}>
                <Input
                  label="First Name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => handleBlur('firstName')}
                  error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                  placeholder="Enter your first name"
                />

                <Input
                  label="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => handleBlur('lastName')}
                  error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                  placeholder="Enter your last name"
                />

                <PhoneInput
                  label="Phone Number"
                  value={values.phoneNumber}
                  countryCode={values.countryCode}
                  onChangeText={(phone) => setFieldValue('phoneNumber', phone)}
                  onChangeCountryCode={(code) => setFieldValue('countryCode', code)}
                  error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
                />

                <DatePicker
                  label="Date of Birth"
                  value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                  onChange={(date) => setFieldValue('dateOfBirth', date.toISOString().split('T')[0])}
                  error={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined}
                />

                <SelectInput
                  label="Gender"
                  value={values.gender}
                  onChange={(value: string) => setFieldValue('gender', value)}
                  error={touched.gender && errors.gender ? errors.gender : undefined}
                  options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                  ]}
                  placeholder="Select your gender"
                />
              </Card>

              {error && (
                <Typography variant="body2" style={styles.errorText}>
                  {error}
                </Typography>
              )}

              <View style={styles.buttonContainer}>
                <Button
                  title="Cancel"
                  onPress={() => navigation.goBack()}
                  variant="outline"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                />
                <Button
                  title="Save Changes"
                  onPress={() => formikSubmit()}
                  variant="primary"
                  size="large"
                  fullWidth
                  style={{ marginTop: spacing.md }}
                  disabled={isLoading}
                  loading={isLoading}
                />
              </View>
            </View>
          )}
        </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

