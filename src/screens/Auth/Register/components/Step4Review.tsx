import React from 'react';
import { View, ScrollView } from 'react-native';
import { Typography, Button, Card, LoadingSpinner } from '@components/common';
import { RegisterData } from '@types';
import { formatDate, formatPhoneNumber } from '@utils/formatters';
import { styles } from '../Register.styles';
import { spacing, colors } from '@theme';
import { Image } from 'expo-image';

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
  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  return (
    <View>
      <Typography variant="h2" style={styles.stepTitle}>
        Review Your Information
      </Typography>
      <Typography variant="body2" style={styles.stepDescription}>
        Please review your information before creating your account
      </Typography>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        {formData.profileImage && (
          <View style={{ alignItems: 'center', marginBottom: spacing.md }}>
            <Image
              source={{ uri: formData.profileImage }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
              contentFit="cover"
            />
          </View>
        )}

        {/* Personal Information Card */}
        <Card style={{ 
          marginBottom: spacing.md, 
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          elevation: 0,
          borderWidth: 1,
          borderColor: colors.border
        }}>
          <Typography variant="h4" style={{ marginBottom: 16 }}>
            Personal Information
          </Typography>
          
          <View style={{ marginBottom: 12 }}>
            <Typography variant="body2" style={{ color: '#666', marginBottom: 4 }}>
              Full Name
            </Typography>
            <Typography variant="body1">
              {formData.firstName} {formData.lastName}
            </Typography>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Typography variant="body2" style={{ color: '#666', marginBottom: 4 }}>
              Email
            </Typography>
            <Typography variant="body1">
              {formData.email}
            </Typography>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Typography variant="body2" style={{ color: '#666', marginBottom: 4 }}>
              Phone Number
            </Typography>
            <Typography variant="body1">
              {formatPhoneNumber(formData.phoneNumber, formData.countryCode)}
            </Typography>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Typography variant="body2" style={{ color: '#666', marginBottom: 4 }}>
              Date of Birth
            </Typography>
            <Typography variant="body1">
              {formatDate(formData.dateOfBirth)}
            </Typography>
          </View>

          <View style={{ marginBottom: 0 }}>
            <Typography variant="body2" style={{ color: '#666', marginBottom: 4 }}>
              Gender
            </Typography>
            <Typography variant="body1">
              {formatGender(formData.gender)}
            </Typography>
          </View>
        </Card>
      </ScrollView>

      {isLoading && <LoadingSpinner />}

      <View>
        <Button
          title="Back"
          onPress={onPrevious}
          variant="outline"
          size="large"
          fullWidth
          disabled={isLoading}
        />
        <Button
          title="Create Account"
          onPress={onSubmit}
          variant="primary"
          size="large"
          fullWidth
          style={{ marginTop: spacing.md }}
          disabled={isLoading}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

