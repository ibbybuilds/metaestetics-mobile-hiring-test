import React from 'react';
import { View } from 'react-native';
import { ImagePickerComponent, Button, Typography } from '@components/common';
import { styles } from './Step.styles';
import { RegisterData } from '@types';
import Entypo from '@expo/vector-icons/Entypo';

export interface Step3ProfilePhotoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isEditing: boolean;
}

export const Step3ProfilePhoto: React.FC<Step3ProfilePhotoProps> = ({
  formData,
  onDataChange,
  onNext,
  onPrevious,
  isEditing,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h2">Profile Photo (Optional)</Typography>
        <Typography variant="body2" style={styles.subtle}>
          Upload a picture to personalize your account.
        </Typography>
      </View>
      <View style={styles.imageWrapper}>
        <ImagePickerComponent
          currentImage={formData.profileImage}
          onImageSelected={(uri) => onDataChange({ profileImage: uri })}
          size={150}
        />
        {formData.profileImage && (
          <Button
            title="Remove photo"
            variant="ghost"
            onPress={() => onDataChange({ profileImage: undefined })}
            fullWidth
          />
        )}
      </View>
      <View style={styles.formFooter}>
        <Button variant="outline" style={styles.formButton} title="Back" onPress={onPrevious} />
        <Button
          rightIcon={<Entypo name="chevron-right" size={24} color="white" />}
          style={styles.formButton}
          title={isEditing ? 'Review' : 'Next'}
          onPress={onNext}
        />
      </View>
    </View>
  );
};
