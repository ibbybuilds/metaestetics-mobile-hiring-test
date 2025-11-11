import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { Button, Card, Typography } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logoutThunk } from '@store/auth/authThunks';
import { formatDate, formatPhoneNumber, getInitials } from '@utils/formatters';
import { MainStackParamList } from '../../types';
import { colors, spacing } from '../../theme';
import { styles } from './Profile.styles';

type ProfileScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Profile'>;

export const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        {user.profileImage ? (
          <Image
            key={user.profileImage}
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
            contentFit="cover"
            cachePolicy="none"
          />
        ) : (
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

      <Card style={styles.infoCard}>
        <Typography variant="h4" style={styles.cardTitle}>
          Contact Information
        </Typography>
        <View style={styles.infoRow}>
          <Typography variant="body2" style={styles.infoLabel}>
            Phone:
          </Typography>
          <Typography variant="body1" style={styles.infoValue}>
            {formatPhoneNumber(user.phoneNumber, user.countryCode)}
          </Typography>
        </View>
        <View style={styles.infoRow}>
          <Typography variant="body2" style={styles.infoLabel}>
            Date of Birth:
          </Typography>
          <Typography variant="body1" style={styles.infoValue}>
            {formatDate(user.dateOfBirth)}
          </Typography>
        </View>
        <View style={styles.infoRow}>
          <Typography variant="body2" style={styles.infoLabel}>
            Gender:
          </Typography>
          <Typography variant="body1" style={styles.infoValue}>
            {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
          </Typography>
        </View>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
        />
        <Button
          title="View Clinics"
          onPress={() => navigation.navigate('Clinics')}
          variant="secondary"
          size="large"
          fullWidth
          style={styles.button}
        />
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
          variant="outline"
          size="large"
          fullWidth
          style={styles.button}
        />
        <Button
          title="Logout"
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

