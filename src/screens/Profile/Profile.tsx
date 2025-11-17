import React from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { Button, Card, Typography } from "@components/common";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logoutThunk } from "@store/auth/authThunks";
import { formatDate, formatPhoneNumber, getInitials } from "@utils/formatters";
import { MainStackParamList } from "@types";
import { styles } from "./Profile.styles";
import { strings } from "@utils/strings";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "Profile"
>;

/**
 * Profile component displays the user's profile information, including personal details
 * and navigation options for editing the profile, viewing clinics, settings, and logging out.
 */
export const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  // Retrieve user data from the Redux store
  const { user } = useAppSelector((state) => state.auth);

  /**
   * Handles the logout action.
   * Dispatches the `logoutThunk` to clear user session and navigate to the authentication stack.
   */
  const handleLogout = async () => {
    await dispatch(logoutThunk());
  };

  // If user data is not available, render nothing (or a loading/error state if preferred)
  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header section displaying profile image/avatar, name, and email */}
      <View style={styles.header}>
        {user.profileImage ? (
          // Display user's profile image if available
          <Image
            source={{ uri: `${user.profileImage}?${user.updatedAt}` }}
            style={styles.profileImage}
            contentFit="cover"
          />
        ) : (
          // Display a placeholder avatar with initials if no profile image
          <View style={styles.avatarPlaceholder}>
            <Typography variant="h2" style={styles.avatarText}>
              {getInitials(user.firstName, user.lastName)}
            </Typography>
          </View>
        )}
        <Typography variant="h2" style={styles.name}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" style={styles.email}>
          {user.email}
        </Typography>
      </View>

      {/* Card displaying contact and personal information */}
      <Card style={styles.infoCard}>
        <Typography variant="h4" style={styles.cardTitle}>
          {strings.contactInformationTitle}
        </Typography>
        {/* Phone Number */}
        <View style={styles.infoRow}>
          <Typography variant="body2" style={styles.infoLabel}>
            {strings.phoneLabel}
          </Typography>
          <Typography variant="body1" style={styles.infoValue}>
            {formatPhoneNumber(user.phoneNumber, user.countryCallingCode || "")}
          </Typography>
        </View>
        {/* Date of Birth */}
        <View style={styles.infoRow}>
          <Typography variant="body2" style={styles.infoLabel}>
            {strings.dateOfBirthLabel}:
          </Typography>
          <Typography variant="body1" style={styles.infoValue}>
            {formatDate(user.dateOfBirth)}
          </Typography>
        </View>
        {/* Gender */}
        <View style={styles.infoRow}>
          <Typography variant="body2" style={styles.infoLabel}>
            {strings.genderLabel}:
          </Typography>
          <Typography variant="body1" style={styles.infoValue}>
            {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
          </Typography>
        </View>
      </Card>

      {/* Button container for various actions */}
      <View style={styles.buttonContainer}>
        {/* Button to navigate to Edit Profile screen */}
        <Button
          title={strings.editProfileButton}
          onPress={() => navigation.navigate("EditProfile")}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
        />
        {/* Button to navigate to Clinics screen */}
        <Button
          title={strings.viewClinicsButton}
          onPress={() => navigation.navigate("Clinics")}
          variant="secondary"
          size="large"
          fullWidth
          style={styles.button}
        />
        {/* Button to navigate to Settings screen */}
        <Button
          title={strings.settingsButton}
          onPress={() => navigation.navigate("Settings")}
          variant="outline"
          size="large"
          fullWidth
          style={styles.button}
        />
        {/* Button to log out the user */}
        <Button
          title={strings.logoutButton}
          onPress={handleLogout}
          variant="ghost"
          size="large"
          fullWidth
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};
