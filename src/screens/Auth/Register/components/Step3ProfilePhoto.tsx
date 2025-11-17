import React from 'react';
import { View } from 'react-native';
import { Button, ImagePickerComponent, Typography } from '@components/common';
import { RegisterData } from '../../../../types';
import { stepStyles } from './Step.styles';

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
  const hasImage = Boolean(formData.profileImage);

  return (
    <View style={stepStyles.container}>
      <View style={stepStyles.header}>
        <Typography variant="h3" style={stepStyles.title}>
          Add a profile photo
        </Typography>
        <Typography variant="body2" style={stepStyles.description}>
          Make it easier for providers to recognise you. You can always add one
          later.
        </Typography>
      </View>

      <View style={stepStyles.profileImageWrapper}>
        <ImagePickerComponent
          currentImage={formData.profileImage}
          onImageSelected={(uri) => onDataChange({ profileImage: uri })}
          size={140}
        />
      </View>

      {hasImage && (
        <Button
          title="Remove photo"
          variant="outline"
          onPress={() => onDataChange({ profileImage: undefined })}
          fullWidth
          style={stepStyles.button}
        />
      )}

      <View style={stepStyles.buttonRow}>
        <View style={stepStyles.buttonHalf}>
          <Button
            title="Back"
            variant="secondary"
            onPress={onPrevious}
            fullWidth
          />
        </View>
        <View style={[stepStyles.buttonHalf, stepStyles.buttonSpacing]}>
          <Button title="Continue" onPress={onNext} fullWidth />
        </View>
      </View>

      <Button
        title="Skip for now"
        variant="ghost"
        onPress={onNext}
        fullWidth
        style={stepStyles.skipButton}
      />
    </View>
  );
};

