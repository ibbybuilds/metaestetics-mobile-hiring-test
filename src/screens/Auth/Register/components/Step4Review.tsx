import React, { useEffect, useRef, useState } from 'react';
import { RegisterData } from '@types';
import { View, StyleSheet, Image, ScrollView, Animated, Modal, TouchableWithoutFeedback } from 'react-native';

import { Button, Typography } from '@components/common';
import { styles } from '../Register.styles';
import { colors } from '@theme/colors';

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  errorMessage?: string | null;
  onClearError?: () => void;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  formData,
  onPrevious,
  onSubmit,
  isLoading,
  errorMessage,
  onClearError,
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

  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    if (errorMessage) {
      setVisible(true);
      Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }).start();
    }
  }, [errorMessage, scale]);

  const closeModal = () => {
    Animated.timing(scale, { toValue: 0.85, duration: 150, useNativeDriver: true }).start(() => {
      setVisible(false);
      onClearError && onClearError();
    });
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Typography variant="h1">
          Review Information
        </Typography>

      {/* keep inline UI minimal; detailed error shown in popup */}

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

    {/* Error popup modal */}
    <Modal visible={visible} transparent statusBarTranslucent animationType="none">
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={modalStyles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={modalStyles.centered}>
        <Animated.View style={[modalStyles.card, { transform: [{ scale }] }]}>
          <Typography variant="h3" color={colors.error}>
            Registration Error
          </Typography>
          <Typography variant="body2" color={colors.textSecondary} style={{ marginVertical: 12 }}>
            {errorMessage}
          </Typography>
          <View style={modalStyles.actions}>
            <Button title="Get back" onPress={closeModal} variant="outline" />
          </View>
        </Animated.View>
      </View>
    </Modal>
    </>
  );
};

const modalStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    elevation: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  actions: {
    alignItems: 'flex-end',
  },
});

