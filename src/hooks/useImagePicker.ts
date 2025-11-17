import { useState, useEffect } from "react";
import { Alert, Platform, ActionSheetIOS } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface UseImagePickerOptions {
  initialImage?: string | number | undefined;
  onImageChange?: (uri: string | undefined) => void;
}

export const useImagePicker = ({
  initialImage,
  onImageChange,
}: UseImagePickerOptions) => {
  const [profileImage, setProfileImage] = useState<string | number | undefined>(
    initialImage
  );
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    setProfileImage(initialImage);
  }, [initialImage]);

  const handleImagePress = () => {
    if (!profileImage) {
      pickImage();
      return;
    }
    const options = ["Change Photo", "Remove Photo", "Cancel"];
    const cancelButtonIndex = 2;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            pickImage();
          } else if (buttonIndex === 1) {
            removeImage();
          }
        }
      );
    } else {
      Alert.alert("Profile Photo", "Update your profile photo", [
        { text: "Change Photo", onPress: pickImage },
        { text: "Remove Photo", onPress: removeImage },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  const pickImage = async () => {
    setImageLoading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "We need access to your photos to set a profile picture."
      );
      setImageLoading(false);
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
        setProfileImage(result.assets[0].uri);
        onImageChange?.(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const removeImage = () => {
    setProfileImage(undefined);
    onImageChange?.(undefined);
  };

  return { profileImage, imageLoading, handleImagePress, pickImage, removeImage };
};
