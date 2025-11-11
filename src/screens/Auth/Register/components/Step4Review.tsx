import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Button, Card, Typography } from '@components/common';
import { formatDate, formatPhoneNumber } from '@utils/formatters';
import { RegisterData } from '../../../../types';
import { stepStyles } from './Step.styles';

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
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    countryCode,
    dateOfBirth,
    gender,
    profileImage,
  } = formData;

  const displayGender = gender
    ? gender.charAt(0).toUpperCase() + gender.slice(1)
    : '—';
  const displayPhone =
    phoneNumber && countryCode
      ? formatPhoneNumber(phoneNumber, countryCode)
      : '—';

  return (
    <View style={stepStyles.container}>
      <View style={stepStyles.header}>
        <Typography variant="h3" style={stepStyles.title}>
          Review and submit
        </Typography>
        <Typography variant="body2" style={stepStyles.description}>
          Make sure everything looks good before creating your account.
        </Typography>
      </View>

      <View style={stepStyles.profileImageWrapper}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={stepStyles.profileImage}
            contentFit="cover"
          />
        ) : (
          <View style={stepStyles.profileImagePlaceholder}>
            <Typography
              variant="caption"
              style={stepStyles.profileImagePlaceholderText}
            >
              No photo
            </Typography>
          </View>
        )}
      </View>

      <Card style={stepStyles.cardSpacing}>
        <Typography variant="body2" style={stepStyles.reviewSectionTitle}>
          Account
        </Typography>
        <View style={stepStyles.reviewRow}>
          <Typography variant="body2" style={stepStyles.reviewLabel}>
            Email
          </Typography>
          <Typography variant="body2" style={stepStyles.reviewValue}>
            {email}
          </Typography>
        </View>
      </Card>

      <Card style={stepStyles.cardSpacing}>
        <Typography variant="body2" style={stepStyles.reviewSectionTitle}>
          Personal information
        </Typography>
        <View style={stepStyles.reviewRow}>
          <Typography variant="body2" style={stepStyles.reviewLabel}>
            Name
          </Typography>
          <Typography variant="body2" style={stepStyles.reviewValue}>
            {`${firstName} ${lastName}`.trim()}
          </Typography>
        </View>
        <View style={stepStyles.reviewRow}>
          <Typography variant="body2" style={stepStyles.reviewLabel}>
            Phone
          </Typography>
          <Typography variant="body2" style={stepStyles.reviewValue}>
            {displayPhone}
          </Typography>
        </View>
        <View style={stepStyles.reviewRow}>
          <Typography variant="body2" style={stepStyles.reviewLabel}>
            Date of birth
          </Typography>
          <Typography variant="body2" style={stepStyles.reviewValue}>
            {dateOfBirth ? formatDate(dateOfBirth) : '—'}
          </Typography>
        </View>
        <View style={stepStyles.reviewRow}>
          <Typography variant="body2" style={stepStyles.reviewLabel}>
            Gender
          </Typography>
          <Typography variant="body2" style={stepStyles.reviewValue}>
            {displayGender}
          </Typography>
        </View>
      </Card>

      {error ? (
        <Typography variant="caption" style={stepStyles.errorText}>
          {error}
        </Typography>
      ) : null}

      <View style={stepStyles.buttonRow}>
        <View style={stepStyles.buttonHalf}>
          <Button
            title="Back"
            variant="secondary"
            onPress={onPrevious}
            fullWidth
            disabled={isLoading}
          />
        </View>
        <View style={[stepStyles.buttonHalf, stepStyles.buttonSpacing]}>
          <Button
            title="Create account"
            onPress={onSubmit}
            fullWidth
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

