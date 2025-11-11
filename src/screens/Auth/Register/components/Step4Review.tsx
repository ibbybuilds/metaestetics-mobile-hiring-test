import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Typography } from '@components/common';
import { RegisterData } from '@types';
import { colors, spacing } from '@theme';

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  formData,
  onPrevious,
  onSubmit,
  isLoading,
}) => {
  const formatPhoneNumber = (phone: string, countryCode: string) => {
    return `${countryCode} ${phone}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const capitalizeGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Typography variant="h2" style={styles.title}>
        Review Your Information
      </Typography>
      <Typography variant="body2" style={styles.subtitle}>
        Please review your details before submitting
      </Typography>

      {formData.profileImage && (
        <View style={styles.imageSection}>
          <Image source={{ uri: formData.profileImage }} style={styles.image} />
        </View>
      )}

      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>
          Account Information
        </Typography>
        <View>
          <Typography variant="body2" style={styles.label}>
            Email
          </Typography>
          <Typography variant="body1" style={styles.value}>
            {formData.email}
          </Typography>
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>
          Personal Information
        </Typography>
        <View style={styles.infoRow}>
          <Typography variant="body2" style={styles.label}>
            Name
          </Typography>
          <Typography variant="body1" style={styles.value}>
            {formData.firstName} {formData.lastName}
          </Typography>
        </View>
        <View style={styles.infoRow}>
          <Typography variant="body2" style={styles.label}>
            Phone Number
          </Typography>
          <Typography variant="body1" style={styles.value}>
            {formatPhoneNumber(formData.phoneNumber, formData.countryCode)}
          </Typography>
        </View>
        <View style={styles.infoRow}>
          <Typography variant="body2" style={styles.label}>
            Date of Birth
          </Typography>
          <Typography variant="body1" style={styles.value}>
            {formatDate(formData.dateOfBirth)}
          </Typography>
        </View>
        <View>
          <Typography variant="body2" style={styles.label}>
            Gender
          </Typography>
          <Typography variant="body1" style={styles.value}>
            {capitalizeGender(formData.gender)}
          </Typography>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={onPrevious}
          variant="outline"
          size="large"
          style={styles.backButton}
          disabled={isLoading}
        />
        <Button
          title={isLoading ? "Creating Account..." : "Create Account"}
          onPress={onSubmit}
          variant="primary"
          size="large"
          style={styles.submitButton}
          disabled={isLoading}
        />
      </View>
    </ScrollView>
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
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  section: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoRow: {
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  value: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  backButton: {
    flex: 1,
  },
  submitButton: {
    flex: 2,
  },
});

