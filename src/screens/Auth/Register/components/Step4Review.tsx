import React from 'react';
import { View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Button, Typography } from '@components/common';
import { RegisterData } from '@types';
import { formatDate, formatPhoneNumber } from '@utils/formatters';
import { styles } from '../Register.styles';

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  error?: string | null;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  formData,
  onPrevious,
  onSubmit,
  isLoading,
  error,
}) => {
  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const displayDate = formData.dateOfBirth
    ? formatDate(formData.dateOfBirth)
    : 'Not provided';

  const displayPhone =
    formData.phoneNumber && formData.countryCode
      ? formatPhoneNumber(formData.phoneNumber, formData.countryCode)
      : 'Not provided';

  return (
    <View style={styles.stepContainer}>
      <Typography variant="h2" style={styles.stepTitle}>
        Review Your Information
      </Typography>
      <Typography variant="body2" style={styles.stepSubtitle}>
        Please review your information before submitting
      </Typography>

      <ScrollView
        style={styles.reviewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.reviewSection}>
          <Typography
            variant="h3"
            style={{ marginBottom: 16, color: '#111827' }}
          >
            Account Information
          </Typography>

          <View style={styles.reviewItem}>
            <Typography variant="body2" style={styles.reviewLabel}>
              Email
            </Typography>
            <Typography variant="body1" style={styles.reviewValue}>
              {formData.email}
            </Typography>
          </View>
        </View>

        <View style={styles.reviewSection}>
          <Typography
            variant="h3"
            style={{ marginBottom: 16, color: '#111827' }}
          >
            Personal Information
          </Typography>

          <View style={styles.reviewItem}>
            <Typography variant="body2" style={styles.reviewLabel}>
              First Name
            </Typography>
            <Typography variant="body1" style={styles.reviewValue}>
              {formData.firstName}
            </Typography>
          </View>

          <View style={styles.reviewItem}>
            <Typography variant="body2" style={styles.reviewLabel}>
              Last Name
            </Typography>
            <Typography variant="body1" style={styles.reviewValue}>
              {formData.lastName}
            </Typography>
          </View>

          <View style={styles.reviewItem}>
            <Typography variant="body2" style={styles.reviewLabel}>
              Phone Number
            </Typography>
            <Typography variant="body1" style={styles.reviewValue}>
              {displayPhone}
            </Typography>
          </View>

          <View style={styles.reviewItem}>
            <Typography variant="body2" style={styles.reviewLabel}>
              Date of Birth
            </Typography>
            <Typography variant="body1" style={styles.reviewValue}>
              {displayDate}
            </Typography>
          </View>

          <View style={styles.reviewItem}>
            <Typography variant="body2" style={styles.reviewLabel}>
              Gender
            </Typography>
            <Typography variant="body1" style={styles.reviewValue}>
              {formatGender(formData.gender)}
            </Typography>
          </View>
        </View>

        {formData.profileImage && (
          <View style={styles.reviewSection}>
            <Typography
              variant="h3"
              style={{ marginBottom: 16, color: '#111827' }}
            >
              Profile Photo
            </Typography>
            <Image
              source={{ uri: formData.profileImage }}
              style={styles.reviewImage}
              contentFit="cover"
            />
          </View>
        )}

        {error && (
          <Typography variant="caption" style={styles.errorText}>
            {error}
          </Typography>
        )}

        <View style={styles.buttonRow}>
          <Button
            title="Previous"
            onPress={onPrevious}
            variant="outline"
            size="large"
            style={styles.buttonHalf}
            disabled={isLoading}
          />
          <Button
            title="Submit"
            onPress={onSubmit}
            variant="primary"
            size="large"
            style={styles.buttonHalf}
            loading={isLoading}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};
