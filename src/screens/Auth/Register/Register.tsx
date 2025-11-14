import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Typography, LoadingSpinner } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { registerThunk } from '@store/auth/authThunks';
import { clearError } from '@store/auth/authSlice';
import { RegisterData } from '@types';
import { styles } from './Register.styles';
import { Step1EmailPassword } from './components/Step1EmailPassword';
import { Step2PersonalInfo } from './components/Step2PersonalInfo';
import { Step3ProfilePhoto } from './components/Step3ProfilePhoto';
import { Step4Review } from './components/Step4Review';
import {
  loadRegistrationDraft,
  updateRegistrationDraft,
  clearRegistrationDraft,
} from '@store/registration';

const TOTAL_STEPS = 4;

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const { draft: formData, status: registrationStatus, error: registrationError } = useAppSelector(
    state => state.registration
  );
  
  const [currentStep, setCurrentStep] = useState(1);

  const handleDataChange = async (data: Partial<RegisterData>) => {
    try {
      await dispatch(updateRegistrationDraft(data)).unwrap();
    } catch {
      // persistence errors are surfaced via the registration slice if needed
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (currentStep === TOTAL_STEPS) {
      try {
        await dispatch(registerThunk(formData as RegisterData)).unwrap();
        await dispatch(clearRegistrationDraft());
      } catch {
        // rely on auth slice for error messaging
      }
    }
  };

  useEffect(() => {
    dispatch(loadRegistrationDraft());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1EmailPassword
            formData={formData}
            onDataChange={handleDataChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2PersonalInfo
            formData={formData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <Step3ProfilePhoto
            formData={formData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        const reviewData: RegisterData = {
          email: formData.email ?? '',
          password: formData.password ?? '',
          confirmPassword: formData.confirmPassword ?? '',
          firstName: formData.firstName ?? '',
          lastName: formData.lastName ?? '',
          phoneNumber: formData.phoneNumber ?? '',
          countryCode: formData.countryCode ?? '+1',
          dateOfBirth: formData.dateOfBirth ?? '',
          gender: formData.gender ?? 'other',
          profileImage: formData.profileImage,
        };

        return (
          <Step4Review
            formData={reviewData}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  if (registrationStatus === 'loading') {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.stepIndicator}>
            <Typography variant="body2" style={styles.stepText}>
              Step {currentStep} of {TOTAL_STEPS}
            </Typography>
          </View>

          {registrationError && (
            <Typography variant="caption" style={styles.errorText}>
              {registrationError}
            </Typography>
          )}

          {renderStep()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
