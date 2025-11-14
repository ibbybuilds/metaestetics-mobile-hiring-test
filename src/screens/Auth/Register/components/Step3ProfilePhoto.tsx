import React, { useState } from 'react';
import { View } from 'react-native';
import { Typography, Button, ImagePickerComponent } from '@components/common';
import { RegisterData } from '@types';
import { styles } from '../Register.styles';
import { spacing } from '@theme';

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
  const [selectedImage, setSelectedImage] = useState<string | undefined>(formData.profileImage);

  const handleImageSelected = (uri: string) => {
    setSelectedImage(uri);
    onDataChange({ profileImage: uri });
  };

  const handleSkip = () => {
    onDataChange({ profileImage: undefined });
    onNext();
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <View>
      <Typography variant="h2" style={styles.stepTitle}>
        Profile Photo
      </Typography>
      <Typography variant="body2" style={styles.stepDescription}>
        Add a profile photo to personalize your account (optional)
      </Typography>

      <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
        <ImagePickerComponent
          onImageSelected={handleImageSelected}
          currentImage={selectedImage}
          size={150}
        />
      </View>

      <View>
        <Button
          title="Back"
          onPress={onPrevious}
          variant="outline"
          size="large"
          fullWidth
        />
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="large"
          fullWidth
          style={{ marginTop: spacing.md }}
        />
      </View>

      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <Button
          title="Skip"
          onPress={handleSkip}
          variant="ghost"
          size="small"
        />
      </View>
    </View>
  );
};

