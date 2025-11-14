import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Button, Typography } from "@components/common";
import { RegisterData } from "@types";
import { styles } from "../Register.styles";
import { strings } from "@utils/strings";

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

/**
 * Step4Review component displays a summary of all collected registration data
 * for the user to review before final submission.
 * It provides options to go back to previous steps or submit the form.
 */
export const Step4Review: React.FC<Step4ReviewProps> = ({
  formData, // All collected registration data for review
  onPrevious, // Callback to go back to the previous step
  onSubmit, // Callback to submit the registration form
  isLoading, // Loading state for the submission process
}) => {
  return (
    <View style={styles.formContainer}>
      <ScrollView contentContainerStyle={styles.reviewContent}>
        <Typography variant="h4" style={styles.stepTitle}>
          {strings.reviewInformationTitle}
        </Typography>
        {/* Conditionally display Profile Photo if available */}
        {formData.profileImage && (
          <View style={styles.profilePhotoContainer}>
            <Image
              source={{ uri: formData.profileImage }}
              style={styles.profilePhoto}
            />
          </View>
        )}
        {/* Display Email */}
        <View style={styles.reviewItem}>
          <Typography variant="body1" style={styles.reviewLabel}>
            {strings.emailLabel}:
          </Typography>
          <Typography variant="body1">{formData.email}</Typography>
        </View>
        {/* Display First Name */}
        <View style={styles.reviewItem}>
          <Typography variant="body1" style={styles.reviewLabel}>
            {strings.firstNameLabel}:
          </Typography>
          <Typography variant="body1">{formData.firstName}</Typography>
        </View>
        {/* Display Last Name */}
        <View style={styles.reviewItem}>
          <Typography variant="body1" style={styles.reviewLabel}>
            {strings.lastNameLabel}:
          </Typography>
          <Typography variant="body1">{formData.lastName}</Typography>
        </View>
        {/* Display Phone Number with Country Calling Code */}
        <View style={styles.reviewItem}>
          <Typography variant="body1" style={styles.reviewLabel}>
            {strings.phoneNumberLabel}:
          </Typography>
          <Typography variant="body1">{`+${formData.countryCallingCode} ${formData.phoneNumber}`}</Typography>
        </View>
        {/* Display Date of Birth */}
        <View style={styles.reviewItem}>
          <Typography variant="body1" style={styles.reviewLabel}>
            {strings.dateOfBirthLabel}:
          </Typography>
          <Typography variant="body1">{formData.dateOfBirth}</Typography>
        </View>
        {/* Display Gender */}
        <View style={styles.reviewItem}>
          <Typography variant="body1" style={styles.reviewLabel}>
            {strings.genderLabel}:
          </Typography>
          <Typography variant="body1">{formData.gender}</Typography>
        </View>
        <View style={styles.buttonContainer}>
          {/* Button to go back to the previous step */}
          <Button
            title={strings.previousButton}
            onPress={onPrevious}
            variant="secondary"
            style={styles.button}
            disabled={isLoading}
          />
          {/* Button to submit the registration form, shows loading state when submitting */}
          <Button
            title={isLoading ? strings.submittingButton : strings.submitButton}
            onPress={onSubmit}
            variant="primary"
            style={styles.button}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};
