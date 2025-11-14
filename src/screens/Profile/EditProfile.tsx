import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { Input, Button, Typography } from '@components/common';
import { PhoneInputComponent } from '@components/common/PhoneInput';
import { DatePicker } from '@components/common/DatePicker';
import { SelectInput } from '@components/common/SelectInput';
import { ImagePickerComponent } from '@components/common/ImagePickerComponent';
import { MainStackParamList } from '@types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProfileThunk } from '@store/auth/authThunks';
import { editProfileValidationSchema } from '@utils/validation';
import { GENDER_OPTIONS } from '@utils/constants';
import { spacing, colors } from '@theme';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'EditProfile'
>;

interface EditProfileValues {
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
  const { user, isUpdatingProfile, profileError } = useAppSelector(state => state.auth);

  if (!user) {
    return null;
  }

  const initialValues: EditProfileValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    countryCode: user.countryCode,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    profileImage: user.profileImage,
  };

  const handleSubmit = async (values: EditProfileValues) => {
    try {
      await dispatch(
        updateProfileThunk({
          userId: user.id,
          updates: {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            countryCode: values.countryCode,
            dateOfBirth: values.dateOfBirth,
            gender: values.gender,
            profileImage: values.profileImage,
          },
        })
      ).unwrap();

      navigation.goBack();
    } catch {
      // errors surfaced via profileError
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={editProfileValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            setFieldValue,
          }) => (
            <View style={styles.content}>
              <Typography variant="h3" style={styles.title}>
                Edit Profile
              </Typography>

              <View style={styles.imageWrapper}>
                <ImagePickerComponent
                  currentImage={values.profileImage || undefined}
                  onImageSelected={(uri) => setFieldValue('profileImage', uri)}
                  size={110}
                />
              </View>

              <Input
                label="First Name"
                placeholder="First name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                style={styles.field}
              />

              <Input
                label="Last Name"
                placeholder="Last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                style={styles.field}
              />

              <View style={styles.field}>
                <PhoneInputComponent
                  label="Phone Number"
                  value={values.phoneNumber}
                  countryCode={values.countryCode}
                  onChangeText={(value) => setFieldValue('phoneNumber', value.replace(/\D/g, ''))}
                  onChangeCountryCode={(code) => setFieldValue('countryCode', code)}
                  error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
                />
              </View>

              <View style={styles.field}>
                <DatePicker
                  label="Date of Birth"
                  value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                  onChange={(date) => setFieldValue('dateOfBirth', date.toISOString())}
                  error={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined}
                  placeholder="Select your birth date"
                />
              </View>

              <View style={styles.field}>
                <SelectInput
                  label="Gender"
                  value={values.gender}
                  options={GENDER_OPTIONS}
                  onChange={(value) => setFieldValue('gender', value as EditProfileValues['gender'])}
                  error={touched.gender && errors.gender ? errors.gender : undefined}
                />
              </View>

              {profileError && (
                <Typography variant="caption" style={styles.errorText}>
                  {profileError}
                </Typography>
              )}

              <View style={styles.buttonRow}>
                <Button
                  title="Cancel"
                  variant="outline"
                  onPress={() => navigation.goBack()}
                  size="large"
                  style={[styles.button, styles.buttonSpacing]}
                />
                <Button
                  title="Save"
                  variant="primary"
                  onPress={() => handleSubmit()}
                  size="large"
                  loading={isUpdatingProfile}
                  fullWidth
                  style={styles.button}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing.lg,
  },
  imageWrapper: {
    marginBottom: spacing.lg,
    alignSelf: 'center',
  },
  field: {
    width: '100%',
    marginBottom: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
  buttonSpacing: {
    marginRight: spacing.sm,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
});
