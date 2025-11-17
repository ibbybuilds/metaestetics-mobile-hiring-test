import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { Button, DatePicker, ImagePickerComponent, Input, PhoneInput, SelectInput, Typography } from '@components/common';
import { registerStep2ValidationSchema } from '@utils/validation';
import { GENDER_OPTIONS } from '@utils/constants';
import { MainStackParamList } from '../../types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearError } from '@store/auth/authSlice';
import { updateProfileThunk } from '@store/auth/authThunks';
import { styles } from './EditProfile.styles';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'EditProfile'>;

interface EditProfileFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  dateOfBirth: string;
  gender: string;
  profileImage?: string;
}

export const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (!user) {
    return null;
  }

  const initialValues: EditProfileFormValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    countryCode: user.countryCode,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    profileImage: user.profileImage,
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = async (values: EditProfileFormValues) => {
    try {
      await dispatch(
        updateProfileThunk({
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          countryCode: values.countryCode,
          dateOfBirth: values.dateOfBirth,
          gender: values.gender as 'male' | 'female' | 'other',
          profileImage: values.profileImage || undefined,
        })
      ).unwrap();

      navigation.goBack();
    } catch (submitError) {
      // Errors are handled via Redux state
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Typography variant="h3" style={styles.title}>
            Update your profile
          </Typography>
          <Typography variant="body2" style={styles.subtitle}>
            Keep your information current so providers know you better.
          </Typography>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={registerStep2ValidationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit: formikSubmit,
            setFieldValue,
            setFieldTouched,
          }) => (
            <View style={styles.form}>
              <View style={styles.imageSection}>
                <ImagePickerComponent
                  currentImage={values.profileImage}
                  onImageSelected={(uri) => setFieldValue('profileImage', uri)}
                  size={140}
                />
                {values.profileImage ? (
                  <Button
                    title="Remove photo"
                    variant="outline"
                    onPress={() => setFieldValue('profileImage', undefined)}
                    style={styles.removePhotoButton}
                  />
                ) : null}
              </View>

              <Input
                label="First Name"
                placeholder="Enter your first name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={() => setFieldTouched('firstName', true, true)}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : undefined
                }
                autoCapitalize="words"
                style={styles.fieldSpacing}
              />

              <Input
                label="Last Name"
                placeholder="Enter your last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName', true, true)}
                error={
                  touched.lastName && errors.lastName
                    ? errors.lastName
                    : undefined
                }
                autoCapitalize="words"
                style={styles.fieldSpacing}
              />

              <PhoneInput
                label="Phone Number"
                value={values.phoneNumber}
                countryCode={values.countryCode}
                onChangeText={(phone) => {
                  const sanitised = phone.replace(/[^0-9]/g, '');
                  setFieldTouched('phoneNumber', true, false);
                  setFieldValue('phoneNumber', sanitised);
                }}
                onChangeCountryCode={(code) => {
                  setFieldValue('countryCode', code);
                }}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : undefined
                }
              />

              <View style={styles.fieldSpacing}>
                <DatePicker
                  label="Date of Birth"
                  value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                  onChange={(date) => {
                    setFieldTouched('dateOfBirth', true, false);
                    setFieldValue('dateOfBirth', date.toISOString());
                  }}
                  error={
                    touched.dateOfBirth && errors.dateOfBirth
                      ? errors.dateOfBirth
                      : undefined
                  }
                />
              </View>

              <SelectInput
                label="Gender"
                value={values.gender}
                options={GENDER_OPTIONS}
                onChange={(selected) => {
                  setFieldTouched('gender', true, false);
                  setFieldValue('gender', selected);
                }}
                error={
                  touched.gender && errors.gender ? errors.gender : undefined
                }
              />

              {error ? (
                <Typography variant="caption" style={styles.errorText}>
                  {error}
                </Typography>
              ) : null}

              <View style={styles.buttonRow}>
                <View style={styles.buttonHalf}>
                  <Button
                    title="Cancel"
                    variant="secondary"
                    onPress={handleCancel}
                    fullWidth
                    disabled={isLoading}
                  />
                </View>
                <View style={[styles.buttonHalf, styles.buttonSpacing]}>
                  <Button
                    title="Save Changes"
                    onPress={() => formikSubmit()}
                    fullWidth
                    loading={isLoading}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

