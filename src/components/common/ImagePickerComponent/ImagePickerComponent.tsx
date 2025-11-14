import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, ActivityIndicator, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Typography } from '../Typography';
import { styles } from './ImagePickerComponent.styles';

export interface ImagePickerComponentProps {
  onImageSelected: (uri: string) => void;
  currentImage?: string;
  size?: number;
  onRemove?: () => void;
}

export const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  onImageSelected,
  currentImage,
  size = 100,
  onRemove,
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

  const handleRemove = () => {
    Alert.alert('Remove photo', 'Do you want to remove the selected photo?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => { if (onRemove) onRemove(); else onImageSelected(''); } },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.imageContainer, { width: size, height: size, borderRadius: size / 2 }]}
        onPress={pickImage}
        disabled={loading}
        activeOpacity={0.8}
        accessibilityLabel={currentImage ? 'Profile Photo' : 'Add Photo'}
        testID="image-picker-touchable"
      >
        {loading ? (
          <ActivityIndicator testID="ActivityIndicator" size="small" color="#6B4CE6" />
        ) : currentImage ? (
          <>
            <Image
              source={{ uri: currentImage }}
              style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
              contentFit="cover"
            />
            <TouchableOpacity
              onPress={handleRemove}
              accessibilityLabel="Remove photo"
              accessibilityHint="Removes the selected profile photo"
              style={styles.removeButton}
            >
              <Text style={styles.removeIcon}>✕</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.placeholder}>
            <Typography variant="h4" style={styles.placeholderText}>
              <Text>📷</Text>
            </Typography>
            <Typography variant="caption" style={styles.placeholderLabel}>
              <Text>Add Photo</Text>
            </Typography>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

