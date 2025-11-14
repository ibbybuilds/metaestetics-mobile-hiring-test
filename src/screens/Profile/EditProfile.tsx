import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import {
  Input,
  Button,
  DatePicker,
  PhoneInput,
  SelectInput,
  ImagePickerComponent,
  Typography,
} from "@components/common";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateUserProfileThunk } from "@store/auth/authThunks";
import { editProfileValidationSchema } from "@utils/validation";
import { MainStackParamList, User } from "@types";
import { styles } from "./EditProfile.styles";
import { GENDER_OPTIONS } from "@utils/constants";
import { useImagePicker } from "../../hooks/useImagePicker";
import { strings } from "@utils/strings";

type EditProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "EditProfile"
>;

/**
 * EditProfile component allows users to view and modify their profile information.
 */
export const EditProfile: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  // Retrieve user data, loading state, and error from the Redux store
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  const { profileImage, imageLoading, handleImagePress } =
    useImagePicker({
      initialImage: user?.profileImage,
      onImageChange: (uri) => {
        // The onImageChange callback is used to update the parent component's state or Redux store
        // if needed. The useImagePicker hook manages its own internal profileImage state.
      },
    });

  // Effect to display an alert if an error occurs during profile update
  useEffect(() => {
    if (error) {
      Alert.alert(strings.errorAlertTitle, error);
    }
  }, [error]);

  // Display a message if user data is not available (e.g., not logged in)
  if (!user) {
    return (
      <View style={styles.centered}>
        <Typography variant="h4">{strings.userDataNotAvailable}</Typography>
      </View>
    );
  }

  // Initial form values, pre-populated with the current user's data
  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
    countryCode: user.countryCode || "",
    countryCallingCode: user.countryCallingCode || "",
    dateOfBirth: user.dateOfBirth || "",
    gender: user.gender || "",
  };

  /**
   * Handles the form submission.
   * Dispatches the `updateUserProfileThunk` with the updated user data.
   * Navigates back to the previous screen on successful update.
   * @param {typeof initialValues} values - The current form values.
   */
  const handleSubmit = async (values: typeof initialValues) => {
    const updatedUserData: Partial<User> = {
      ...values,
      profileImage: typeof profileImage === "number" ? "" : profileImage,
    };
    const resultAction = await dispatch(
      updateUserProfileThunk(updatedUserData)
    );
    if (updateUserProfileThunk.fulfilled.match(resultAction)) {
      Alert.alert(strings.successAlertTitle, strings.profileUpdateSuccessMessage);
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
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
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              {/* Image picker component for profile photo */}
              <ImagePickerComponent
                onPress={handleImagePress}
                currentImage={profileImage}
                loading={imageLoading}
              />
              {/* Input field for First Name */}
              <Input
                label={strings.firstNameLabel}
                placeholder={strings.firstNamePlaceholder}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : undefined
                }
              />
              {/* Input field for Last Name */}
              <Input
                label={strings.lastNameLabel}
                placeholder={strings.lastNamePlaceholder}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                error={
                  touched.lastName && errors.lastName
                    ? errors.lastName
                    : undefined
                }
              />
              {/* Phone number input component */}
              <PhoneInput
                label={strings.phoneNumberLabel}
                onChangeText={(phoneNumber) => {
                  setFieldValue("phoneNumber", phoneNumber);
                }}
                onChangeCountryCode={(countryCode) => {
                  setFieldValue("countryCode", countryCode);
                }}
                onChangeCountryCallingCode={(countryCallingCode) => {
                  setFieldValue("countryCallingCode", countryCallingCode);
                }}
                countryCode={values.countryCode}
                value={values.phoneNumber}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : undefined
                }
              />
              {/* Date picker component for Date of Birth */}
              <DatePicker
                label={strings.dateOfBirthLabel}
                placeholder={strings.dateOfBirthPlaceholder}
                onChange={(date) =>
                  setFieldValue("dateOfBirth", date.toISOString().split("T")[0])
                }
                value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                error={
                  touched.dateOfBirth && errors.dateOfBirth
                    ? errors.dateOfBirth
                    : undefined
                }
              />
              {/* Select input component for Gender */}
              <SelectInput
                label={strings.genderLabel}
                placeholder={strings.genderPlaceholder}
                options={GENDER_OPTIONS}
                onChange={(value) => setFieldValue("gender", value)}
                value={values.gender}
                error={
                  touched.gender && errors.gender ? errors.gender : undefined
                }
              />
              {/* Button container for Cancel and Save Changes */}
              <View style={styles.buttonContainer}>
                <Button
                  title={strings.cancelButton}
                  onPress={() => navigation.goBack()}
                  variant="secondary"
                  style={styles.button}
                  disabled={isLoading}
                />
                <Button
                  title={isLoading ? strings.submittingButton : strings.saveChangesButton}
                  onPress={handleSubmit}
                  variant="primary"
                  style={styles.button}
                  disabled={isLoading}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
