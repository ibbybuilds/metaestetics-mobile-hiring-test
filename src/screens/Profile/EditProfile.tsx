import React from 'react';
import { View, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Input, Button, Typography, DatePicker, SelectInput, PhoneInput } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProfileThunk } from '@store/auth/authThunks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, User } from '@types';
import { useNavigation } from '@react-navigation/native';
import { styles } from './EditProfile.styles';
import { pickProfilePhoto } from '@screens/Auth/Register/components/Step3ProfilePhoto';
import { GENDER_OPTIONS } from '@utils/constants';
import { updateProfileValidationSchema } from '@utils/validation';

type EditProfileNavProp = NativeStackNavigationProp<AuthStackParamList, 'EditProfile'>;

interface EditProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  profileImage: string;
}

export const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileNavProp>();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(s => s.auth);

  if (!user) return null;

  const initialValues: EditProfileFormValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    countryCode: user.countryCode ?? '+1',
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    profileImage: user.profileImage ?? '',
  };

  const handlePickImage = async (setFieldValue: any) => {
    try {
      const uri = await pickProfilePhoto();
      if (uri) setFieldValue('profileImage', uri);
    } catch (err) {
      Alert.alert('Image picker error', String(err));
    }
  };

  const handleSubmit = async (values: EditProfileFormValues) => {
    const updates: Partial<User> = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      fullName: `${values.firstName.trim()} ${values.lastName.trim()}`.trim(),
      email: values.email.trim(),
      countryCode: values.countryCode.trim(),
      phoneNumber: values.phoneNumber.trim(),
      profileImage: values.profileImage || undefined,
      dateOfBirth: values.dateOfBirth.trim(),
      gender: values.gender,
    };

    const res = await dispatch(updateProfileThunk({ userId: user.id, updates }));
    if (updateProfileThunk.rejected.match(res)) {
      const message = (res.payload as string) || res.error?.message || 'Failed to update profile';
      Alert.alert('Update failed', message);
      return;
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={updateProfileValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <Typography variant="h2" style={styles.title}>
              Edit Profile
            </Typography>

            {/* Profile Image Section */}
            <View style={styles.imageContainer}>
              {values.profileImage ? (
                <Image source={{ uri: values.profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Typography variant="body2">No photo</Typography>
                </View>
              )}
              <TouchableOpacity
                style={styles.changePhotoBtn}
                onPress={() => handlePickImage(setFieldValue)}
              >
                <Typography variant="body2">Change Photo</Typography>
              </TouchableOpacity>
            </View>

            {/* Name Fields */}
            <Input
              label="First name"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={() => handleBlur('firstName')}
              error={touched.firstName && errors.firstName ? errors.firstName : undefined}
            />

            <Input
              label="Last name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={() => handleBlur('lastName')}
              error={touched.lastName && errors.lastName ? errors.lastName : undefined}
            />

            {/* Email */}
            <Input
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              error={touched.email && errors.email ? errors.email : undefined}
            />

            {/* Phone */}
            <PhoneInput
              label="Phone"
              value={values.phoneNumber}
              countryCode={values.countryCode}
              onChangeText={(text: string) => setFieldValue('phoneNumber', text)}
              onChangeCountryCode={(code: string) => setFieldValue('countryCode', code)}
              error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
            />

            {/* Date of Birth */}
            <DatePicker
              label="Date of Birth"
              value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
              onChange={(date: Date) => setFieldValue('dateOfBirth', date.toISOString().split('T')[0])}
              error={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined}
            />

            {/* Gender */}
            <SelectInput
              label="Gender"
              value={values.gender}
              options={GENDER_OPTIONS}
              onChange={(val: string) => setFieldValue('gender', val)}
              placeholder="Select your gender"
              error={touched.gender && errors.gender ? errors.gender : undefined}
            />

            {/* Actions */}
            <View style={styles.actions}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => navigation.goBack()}
                disabled={isLoading}
                style={styles.btn}
              />
              <Button
                title={isLoading ? 'Saving...' : 'Save'}
                onPress={() => handleSubmit()}
                variant="primary"
                disabled={isLoading}
                style={styles.btn}
              />
            </View>

            {isLoading && <ActivityIndicator style={styles.loading} />}
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

