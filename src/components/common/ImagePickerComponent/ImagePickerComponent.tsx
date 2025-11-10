import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Typography } from '../Typography';
import { styles } from './ImagePickerComponent.styles';

export interface ImagePickerComponentProps {
  onImageSelected: (uri: string) => void;
  currentImage?: string;
  size?: number;
}

export const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  onImageSelected,
  currentImage,
  size = 100,
}) => {
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.imageContainer, { width: size, height: size, borderRadius: size / 2 }]}
        onPress={pickImage}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#6B4CE6" />
        ) : currentImage ? (
          <Image
            source={{ uri: currentImage }}
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

