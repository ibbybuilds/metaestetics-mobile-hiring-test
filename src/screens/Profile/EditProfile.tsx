import React, { useEffect, useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import {
  Input,
  DatePicker,
  PhoneInput,
  SelectInput,
  Button,
  ImagePickerComponent,
} from '@components/common';
import { styles } from './EditProfile.styles';
import { RegisterData } from '@types';
import { GENDER_OPTIONS } from '@utils/constants';
import { formatDateOfBirth } from '@utils/formatters';
import { registerStep2ValidationSchema } from '@utils/validation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '@types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProfileThunk } from '@store/auth/authThunks';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'EditProfile'>;

export const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const cancel = useCallback(() => navigation.goBack(), [navigation]);

  if (!user) {
    return null;
  }

  const initialValues = {
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    phoneNumber: user.phoneNumber ?? '',
    countryCode: user.countryCode ?? '',
    dateOfBirth: user.dateOfBirth ?? '',
    gender: user.gender ?? '',
    profileImage: user.profileImage ?? '',
  };

  const updateProfile = useCallback(
    async (values: Partial<RegisterData>) => {
      await dispatch(updateProfileThunk({ userId: user.id, updates: values })).unwrap();
      cancel();
    },
    [dispatch, user.id, cancel]
  );

  useEffect(() => {}, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Formik<Partial<RegisterData>>
            initialValues={initialValues}
            validationSchema={registerStep2ValidationSchema}
            onSubmit={updateProfile}
            validateOnChange={true}
          >
            {({
              handleChange,
              setFieldTouched,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
              isSubmitting,
              dirty,
            }) => (
              <>
                <View style={styles.imageWrapper}>
                  <ImagePickerComponent
                    currentImage={values.profileImage}
                    onImageSelected={(uri) => {
                      setFieldValue('profileImage', uri);
                    }}
                    size={120}
                  />
                  {values.profileImage && (
                    <Button
                      title="Remove photo"
                      variant="ghost"
                      onPress={() => setFieldValue('profileImage', '')}
                      fullWidth
                      disabled={isSubmitting}
                    />
                  )}
                </View>
                <View style={styles.inputWrapper}>
                  <Input
                    label="First Name"
                    placeholder="Your first name"
                    value={values.firstName as RegisterData['firstName']}
                    onChangeText={handleChange('firstName')}
                    onBlur={() => {
                      setFieldTouched('firstName', true, true);
                    }}
                    error={touched.firstName ? errors.firstName : undefined}
                    autoCapitalize="none"
                  />

                  <Input
                    label="Last Name"
                    placeholder="Your last name"
                    value={values.lastName as RegisterData['lastName']}
                    onChangeText={handleChange('lastName')}
                    onBlur={() => {
                      setFieldTouched('lastName', true, true);
                    }}
                    error={touched.lastName ? errors.lastName : undefined}
                    autoCapitalize="none"
                  />

                  <PhoneInput
                    label="Phone Number"
                    value={values.phoneNumber as RegisterData['phoneNumber']}
                    countryCode={values.countryCode as RegisterData['countryCode']}
                    onChangeText={(phone) => {
                      setFieldValue('phoneNumber', phone);
                    }}
                    onChangeCountryCode={(code) => {
                      setFieldValue('countryCode', code);
                    }}
                    error={
                      touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined
                    }
                  />

                  <DatePicker
                    label="Date of Birth"
                    value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                    onChange={(date) => {
                      setFieldValue('dateOfBirth', formatDateOfBirth(date));
                    }}
                    error={
                      touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined
                    }
                  />

                  <SelectInput
                    label="Gender"
                    value={values.gender}
                    options={GENDER_OPTIONS}
                    onChange={(selected) => {
                      setFieldValue('gender', selected as RegisterData['gender']);
                    }}
                    error={touched.gender && errors.gender ? errors.gender : undefined}
                  />
                </View>
                <View style={styles.formFooter}>
                  <Button
                    variant="outline"
                    style={styles.formButton}
                    title="Cancel"
                    onPress={cancel}
                    disabled={isSubmitting}
                  />
                  <Button
                    style={styles.formButton}
                    title="Save changes"
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    disabled={!dirty}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
