import React from 'react';
import { View, Image } from 'react-native';
import { Button, Typography, Card } from '@components/common';
import { styles } from './Step.styles';
import { RegisterData } from '@types';
import { formatPhoneNumber, formatDate, capitalize } from '@utils/formatters';
import { colors } from '@theme';

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  goTo: (step: number) => void;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  formData,
  onPrevious,
  onSubmit,
  goTo,
  isLoading,
}) => {
  const profileImageSource = formData.profileImage
    ? { uri: formData.profileImage }
    : require('@assets/images/default-avatar.png');

  const maskedPassword = () => {
    if (!formData.password) {
      return '';
    }

    const passwordLength = formData.password.length;
    return '•'.repeat(passwordLength);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h2">Review and Confirm</Typography>
        <Typography variant="body2" style={styles.subtle}>
          Please verify that all the information below is correct before creating your account.
        </Typography>
      </View>
      <View style={styles.review}>
        <View style={styles.profileImageWrapper}>
          <Image source={profileImageSource} style={styles.profileImage} />
          <Button variant="ghost" title="Edit photo" onPress={() => goTo(3)} disabled={isLoading} />
        </View>
        <Card style={styles.reviewSection}>
          <View style={styles.sectionHeader}>
            <Typography variant="h3">Account</Typography>
            <Button variant="ghost" title="Edit" onPress={() => goTo(1)} disabled={isLoading} />
          </View>
          <View style={styles.sectionItem}>
            <Typography variant="body1" color={colors.textSecondary}>
              Email
            </Typography>
            <Typography variant="body1">{formData.email}</Typography>
          </View>
          <View>
            <Typography variant="body1" color={colors.textSecondary}>
              Password
            </Typography>
            <Typography variant="body1">{maskedPassword()}</Typography>
          </View>
        </Card>
        <Card style={styles.reviewSection}>
          <View style={styles.sectionHeader}>
            <Typography variant="h3">Personal Details</Typography>
            <Button variant="ghost" title="Edit" onPress={() => goTo(2)} disabled={isLoading} />
          </View>
          <View style={styles.sectionItem}>
            <Typography variant="body1" color={colors.textSecondary}>
              First Name
            </Typography>
            <Typography variant="body1">{formData.firstName}</Typography>
          </View>
          <View style={styles.sectionItem}>
            <Typography variant="body1" color={colors.textSecondary}>
              Last Name
            </Typography>
            <Typography variant="body1">{formData.lastName}</Typography>
          </View>
          <View style={styles.sectionItem}>
            <Typography variant="body1" color={colors.textSecondary}>
              Phone number
            </Typography>
            <Typography variant="body1">
              {formatPhoneNumber(formData.phoneNumber, formData.countryCode)}
            </Typography>
          </View>
          <View style={styles.sectionItem}>
            <Typography variant="body1" color={colors.textSecondary}>
              Date of Birth
            </Typography>
            <Typography variant="body1">{formatDate(formData.dateOfBirth)}</Typography>
          </View>
          <View style={styles.sectionItem}>
            <Typography variant="body1" color={colors.textSecondary}>
              Gender
            </Typography>
            <Typography variant="body1">{capitalize(formData.gender)}</Typography>
          </View>
        </Card>
      </View>
      <View style={styles.formFooter}>
        <Button
          variant="outline"
          style={styles.formButton}
          title="Back"
          onPress={onPrevious}
          disabled={isLoading}
        />
        <Button style={styles.formButton} title="Next" onPress={onSubmit} loading={isLoading} />
      </View>
    </View>
  );
};
