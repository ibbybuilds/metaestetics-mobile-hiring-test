import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Typography } from '../Typography';
import { styles } from './ImagePickerComponent.styles';

export interface ImagePickerComponentProps {
  onPress: () => void;
  currentImage?: string | number;
  size?: number;
  loading?: boolean;
}

export const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  onPress,
  currentImage,
  size = 120,
  loading = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.imageContainer, { width: size, height: size, borderRadius: size / 2 }]}
        onPress={onPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#6B4CE6" />
        ) : currentImage ? (
          <Image
            source={currentImage}
            style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
            contentFit="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Typography variant="h4" style={styles.placeholderText}>
              📷
            </Typography>
            <Typography variant="caption" style={styles.placeholderLabel}>
              Add Photo
            </Typography>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

