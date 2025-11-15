import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RegisterData } from '../../../../types/auth.types';
import { Button, ImagePickerComponent } from '@components/common';

export interface Step3ProfilePhotoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Step3ProfilePhoto: React.FC<Step3ProfilePhotoProps> = ({ formData, onDataChange, onNext, onPrevious }) => {
  const handleImageSelected = (uri: string) => {
    onDataChange({ profileImage: uri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a Profile Photo</Text>
      <ImagePickerComponent
        onImageSelected={handleImageSelected}
        currentImage={formData.profileImage}
        size={140}
        onRemove={() => onDataChange({ profileImage: '' })}
      />
      <View style={styles.buttonRow}>
        <Button
          title="Back"
          onPress={onPrevious}
          variant="secondary"
          style={styles.button}
          accessibilityLabel="Go back to previous step"
          accessibilityHint="Navigates to the previous registration step"
          accessibilityRole="button"
        />
        <Button
          title="Next"
          onPress={onNext}
          variant="primary"
          style={styles.button}
          disabled={!formData.profileImage}
          accessibilityLabel="Go to next step"
          accessibilityHint="Proceeds to the next registration step after adding a profile photo."
          accessibilityRole="button"
        />
      </View>
      <View style={styles.skipContainer}>
        <TouchableOpacity
          onPress={onNext}
          accessibilityLabel="Skip adding a profile photo"
          accessibilityHint="Continue registration without a profile photo"
          accessibilityRole="button"
        >
          <Text style={styles.skipText}>
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  skipContainer: {
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

