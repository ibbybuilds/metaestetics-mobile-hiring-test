import React from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { RegisterData } from '../../../../types/auth.types';
import { Button, Typography, Card } from '@components/common';
import { formatPhoneNumber } from '@utils/formatters';
import { colors, spacing } from '@theme/index';

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const styles = StyleSheet.create({
  buttonLeft: {
    flex: 1,
    justifyContent: 'center',
    marginRight: spacing.sm,
    minHeight: 52,
  },
  buttonRight: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: spacing.sm,
    minHeight: 52,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    elevation: 2,
    marginBottom: spacing.md,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    width: '100%',
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    flexGrow: 1,
    padding: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  image: {
    alignSelf: 'center',
    borderColor: colors.primary,
    borderRadius: 60,
    borderWidth: 2,
    height: 120,
    marginVertical: spacing.md,
    padding: 6,
    width: 120,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    width: '100%',
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
});

export const Step4Review: React.FC<Step4ReviewProps> = ({ formData, onPrevious, onSubmit, isLoading }) => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Typography variant="h3" align="center"><Text>Review Your Information</Text></Typography>
        <Typography variant="body2" color={colors.textSecondary} align="center" style={styles.subtitle}>
          <Text>Please review your details before submitting</Text>
        </Typography>
        <Image
          source={formData.profileImage ? { uri: formData.profileImage } : require('../../../../../assets/images/default-profile.png')}
          style={styles.image}
          accessibilityLabel="Profile Photo"
        />
      </View>

      <Card style={styles.card}>
        <Typography style={styles.cardTitle}><Text>Account Information</Text></Typography>
        <Typography style={styles.label}><Text>Email</Text></Typography>
        <Typography style={styles.value}><Text>{formData.email}</Text></Typography>
      </Card>

      <Card style={styles.card}>
        <Typography style={styles.cardTitle}><Text>Personal Information</Text></Typography>
        <Typography style={styles.label}><Text>Name</Text></Typography>
        <Typography style={styles.value}><Text>{`${formData.firstName} ${formData.lastName}`}</Text></Typography>

        <Typography style={styles.label}><Text>Phone Number</Text></Typography>
        <Typography style={styles.value}><Text>{formData.phoneNumber && formData.countryCode ? formatPhoneNumber(formData.phoneNumber, formData.countryCode) : ''}</Text></Typography>

        <Typography style={styles.label}><Text>Date of Birth</Text></Typography>
        <Typography style={styles.value}><Text>{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</Text></Typography>

        <Typography style={styles.label}><Text>Gender</Text></Typography>
        <Typography style={styles.value}><Text>{formData.gender}</Text></Typography>
      </Card>

      <View style={styles.row}>
        <Button
          title="Back"
          onPress={onPrevious}
          variant="secondary"
          style={styles.buttonLeft}
          size="large"
          accessibilityLabel="Go back to previous step"
          accessibilityHint="Navigates to the previous registration step"
          accessibilityRole="button"
        />
        <Button
          title={isLoading ? 'Submitting...' : 'Create'}
          onPress={onSubmit}
          variant="primary"
          style={styles.buttonRight}
          size="large"
          disabled={isLoading}
          accessibilityLabel={isLoading ? 'Submitting registration' : 'Submit registration'}
          accessibilityHint={isLoading ? 'Submitting your registration details' : 'Submits your registration details'}
          accessibilityRole="button"
        />
      </View>
    </ScrollView>
  );
};

