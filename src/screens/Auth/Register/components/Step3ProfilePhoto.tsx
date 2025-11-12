import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Typography } from '@components/common';
import { RegisterData } from '@types';
import { colors, spacing } from '@theme';

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
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    setLoading(true);

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need access to your photos to set a profile picture.');
      setLoading(false);
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
        const uri = result.assets[0].uri;
        setSelectedImage(uri);
        onDataChange({ profileImage: uri });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(undefined);
    onDataChange({ profileImage: undefined });
  };

  return (
    <View style={styles.container}>
      <Typography variant="h2" style={styles.title}>
        Profile Photo
      </Typography>
      <Typography variant="body2" style={styles.subtitle}>
        Add a profile photo (optional)
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
                disabled={loading}
              />
              <Button
                title="Remove"
                onPress={handleImageRemove}
                variant="outline"
                size="medium"
                style={styles.removeButton}
                disabled={loading}
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
              title={loading ? "Loading..." : "Add Photo"}
              onPress={pickImage}
              variant="primary"
              size="large"
              style={styles.addButton}
              disabled={loading}
            />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={onPrevious}
          variant="outline"
          size="large"
          style={styles.backButton}
        />
        <Button
          title="Next"
          onPress={onNext}
          variant="primary"
          size="large"
          style={styles.nextButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 150,
    height: 150,
    borderRadius: 75,
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
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: spacing.xs,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});
