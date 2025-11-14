import React from "react";
import { View } from "react-native";
import { ImagePickerComponent, Button, Typography } from "@components/common";
import { RegisterData } from "@types";
import { styles } from "../Register.styles";
import { useImagePicker } from "../../../../hooks/useImagePicker";
import { strings } from "@utils/strings";

export interface Step3ProfilePhotoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Step3ProfilePhoto component handles the third step of user registration,
 * allowing the user to optionally upload a profile photo.
 * It manages the selected image and provides navigation between registration steps.
 */
export const Step3ProfilePhoto: React.FC<Step3ProfilePhotoProps> = ({
  formData, // Current form data from the parent Register component
  onDataChange, // Callback to update form data in the parent
  onNext, // Callback to proceed to the next registration step
  onPrevious, // Callback to go back to the previous registration step
}) => {
  const { profileImage, imageLoading, handleImagePress } = useImagePicker({
    initialImage: formData.profileImage,
    onImageChange: (uri: any) => {
      onDataChange({ profileImage: uri });
    },
  });

  /**
   * Handles the action to proceed to the next registration step.
   */
  const handleNextStep = () => {
    onNext();
  };

  return (
    <View style={styles.formContainer}>
      <Typography variant="h4" style={styles.title}>
        {strings.uploadProfilePhotoTitle}
      </Typography>
      <Typography variant="body2" style={styles.description}>
        {strings.uploadProfilePhotoDescription}
      </Typography>
      {/* Image picker component for selecting/displaying profile photo */}
      <ImagePickerComponent
        onPress={handleImagePress}
        currentImage={profileImage}
        loading={imageLoading}
      />
      {/* Button container for navigation */}
      <View style={styles.buttonContainer}>
        <Button
          title={strings.previousButton}
          onPress={onPrevious}
          variant="secondary"
          style={styles.button}
        />
        <Button title={strings.nextButton} onPress={handleNextStep} style={styles.button} />
      </View>
    </View>
  );
};
