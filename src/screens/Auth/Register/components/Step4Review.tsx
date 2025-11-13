import React from 'react';
import { RegisterData } from '@types';
import { View, StyleSheet, Image, ScrollView } from 'react-native';

import { Button, Typography } from '@components/common';
import { styles } from '../Register.styles';
import { colors } from '@theme/colors';

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
      <Typography variant="h1">
        Review Information
      </Typography>

     
      <View style={styles.accountSection}>
         {formData.profileImage && (
        <View style={styles.imageSection}>
          <Image source={{ uri: formData.profileImage }} style={styles.imageReview} />
        </View>
      )}
          
        <View style={{flex: 1, alignItems: 'center'}}>
          <Typography variant="h4" color={colors.primaryDark}>
            {formData.firstName} {formData.lastName} 
          </Typography>
          <Typography variant="body1">
            {formData.email}
          </Typography>
        </View>
        

      </View>

      <View style={styles.section}>
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
          title="< Back"
          onPress={onPrevious}
          variant="outline"
          style={styles.backButton}
          disabled={isLoading}
        />
        <Button
          title={isLoading ? "Creating Account..." : "Finish ✓"}
          onPress={onSubmit}
          variant="primary"
          style={styles.nextButton}
          disabled={isLoading}
        />
      </View>
    </ScrollView>
  );
};

