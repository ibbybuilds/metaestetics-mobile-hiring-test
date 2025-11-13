import React, { useState } from 'react';
import { View, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Typography } from '@components/common';
import { RegisterData } from '@types';
import { styles } from '../Register.styles';
import { colors } from '@theme/colors';

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

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Grant access to procced.');
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
        }
    };

    const handleImageRemove = () => {
        setSelectedImage(undefined);
        onDataChange({ profileImage: undefined });
    };

    return (
        <View style={styles.container}>
            <Typography variant="h1">
                Profile Photo
            </Typography>
            <Typography variant="body2" style={styles.subtitle}>
                Upload a photo so we can get to know you better
            </Typography>

            <View style={styles.imageSection}>
                {selectedImage ? (
                    <View style={styles.imageWrapper}>
                        <TouchableOpacity onPress={pickImage}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: selectedImage }} style={styles.image} />
                                <View style={styles.changeHint}>
                                    <Typography variant="body2" color={colors.gray[100]}>
                                        Tap to change
                                    </Typography>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* Remove button */}
                        <TouchableOpacity
                            onPress={handleImageRemove}
                            style={styles.removeButton}
                        >
                            <Typography variant="caption" color={colors.white}>
                                ✕
                            </Typography>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.placeholderContainer}>
                        <TouchableOpacity onPress={pickImage} style={styles.placeholder}>
                            <Typography variant="h1">
                                📷
                            </Typography>
                            <Typography variant="caption" color={colors.gray[400]}>
                                Select a photo
                            </Typography>
                        </TouchableOpacity>
                    </View>

                )}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="< Back"
                    onPress={onPrevious}
                    variant="outline"
                    style={styles.backButton}
                />
                <Button
                    title="Next >"
                    onPress={onNext}
                    variant="primary"
                    style={styles.nextButton}
                />
            </View>
        </View>
    );
};

