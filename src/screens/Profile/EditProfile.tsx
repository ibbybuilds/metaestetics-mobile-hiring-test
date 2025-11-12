import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { Input, Button, Typography, DatePicker, SelectInput, PhoneInput } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProfileThunk } from '@store/auth/authThunks';
import { editProfileValidationSchema } from '@utils/validation';
import { MainStackParamList } from '@types';
import { colors, spacing } from '@theme';
import { Image } from 'react-native';

type EditProfileNavigationProp = NativeStackNavigationProp<MainStackParamList, 'EditProfile'>;

export const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(state => state.auth);

  const [countryCode, setCountryCode] = useState(user?.countryCode || '+1');
  const [selectedImage, setSelectedImage] = useState<string | undefined>(user?.profileImage);
  const [imageLoading, setImageLoading] = useState(false);

  if (!user) {
    return null;
  }

  const pickImage = async () => {
    setImageLoading(true);

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need access to your photos to set a profile picture.');
      setImageLoading(false);
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setImageLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(undefined);
  };

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
  }) => {
    const updates = {
      ...values,
      countryCode,
      profileImage: selectedImage,
    };

    const result = await dispatch(updateProfileThunk(updates));

    if (updateProfileThunk.fulfilled.match(result)) {
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Typography variant="h2" style={styles.title}>
            Edit Profile
          </Typography>
          <Typography variant="body2" style={styles.subtitle}>
            Update your profile information
          </Typography>

          <View style={styles.imageSection}>
            {selectedImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.image} />
                <View style={styles.photoButtonsContainer}>
                  <Button
                    title="Change Photo"
                    onPress={pickImage}
                    variant="primary"
                    size="medium"
                    style={styles.changeButton}
                    disabled={imageLoading || isLoading}
                  />
                  <Button
                    title="Remove"
                    onPress={handleRemoveImage}
                    variant="outline"
                    size="medium"
                    style={styles.removeButton}
                    disabled={imageLoading || isLoading}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.placeholderContainer}>
                <View style={styles.placeholder}>
                  <Typography variant="h1" style={styles.placeholderIcon}>
                    📷
                  </Typography>
                  <Typography variant="body2" style={styles.placeholderText}>
                    No photo selected
                  </Typography>
                </View>
                <Button
                  title={imageLoading ? "Loading..." : "Add Photo"}
                  onPress={pickImage}
                  variant="primary"
                  size="large"
                  style={styles.addButton}
                  disabled={imageLoading || isLoading}
                />
              </View>
            )}
          </View>

          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
              dateOfBirth: user.dateOfBirth,
              gender: user.gender,
            }}
            validationSchema={editProfileValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched, setFieldTouched, setFieldValue }) => (
              <View style={styles.form}>
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                  error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                />

                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                  error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                />

                <PhoneInput
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChangeText={(text) => setFieldValue('phoneNumber', text)}
                  onChangeCountryCode={setCountryCode}
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
                  options={genderOptions}
                  onChange={(value) => setFieldValue('gender', value)}
                  placeholder="Select your gender"
                  error={touched.gender && errors.gender ? errors.gender : undefined}
                />

                <View style={styles.buttonContainer}>
                  <Button
                    title="Cancel"
                    onPress={handleCancel}
                    variant="outline"
                    size="large"
                    style={styles.cancelButton}
                    disabled={isLoading}
                  />
                  <Button
                    title={isLoading ? "Saving..." : "Save Changes"}
                    onPress={() => handleSubmit()}
                    variant="primary"
                    size="large"
                    style={styles.saveButton}
                    disabled={isLoading}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
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
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  subtitle: {
    marginBottom: spacing.xl,
    color: colors.textSecondary,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.lg,
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  changeButton: {
    flex: 1,
  },
  removeButton: {
    flex: 1,
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  addButton: {
    marginTop: spacing.lg,
    minWidth: 200,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  form: {
    gap: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 2,
  },
});

