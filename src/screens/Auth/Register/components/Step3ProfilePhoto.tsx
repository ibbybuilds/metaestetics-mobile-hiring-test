import React from 'react';
import { View } from 'react-native';
import { Button, Typography, ImagePickerComponent } from '@components/common';
import { RegisterData } from '@types';
import { styles } from '../Register.styles';

export interface Step3ProfilePhotoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Step3ProfilePhoto: React.FC<Step3ProfilePhotoProps> = ({
  formData,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const handleImageSelected = (uri: string) => {
    onDataChange({ profileImage: uri });
  };

  const handleSkip = () => {
    onNext();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <View style={styles.stepContainer}>
      <Typography variant="h2" style={styles.stepTitle}>
        Profile Photo
      </Typography>
      <Typography variant="body2" style={styles.stepSubtitle}>
        Add a profile photo (optional)
      </Typography>

      <View style={styles.form}>
        <View style={{ alignItems: 'center', marginVertical: 32 }}>
          <ImagePickerComponent
            onImageSelected={handleImageSelected}
            currentImage={formData.profileImage}
            size={120}
          />
        </View>

        <View style={styles.buttonRow}>
          <Button
            title="Previous"
            onPress={onPrevious}
            variant="outline"
            size="large"
            style={styles.buttonHalf}
          />
          <Button
            title="Skip"
            onPress={handleSkip}
            variant="ghost"
            size="large"
            style={styles.buttonHalf}
          />
        </View>

        {formData.profileImage && (
          <Button
            title="Next"
            onPress={handleNext}
            variant="primary"
            size="large"
            fullWidth
            style={styles.stepButton}
          />
        )}
      </View>
    </View>
  );
};
