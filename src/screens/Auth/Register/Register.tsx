import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { registerThunk } from '@store/auth/authThunks';
import { clearError } from '@store/auth/authSlice';
import { storageService } from '@services';
import { RegisterData } from '@types';
import { AuthStackParamList } from '@types';
import { styles } from './Register.styles';
import { Step1EmailPassword } from './components/Step1EmailPassword';
import { Step2PersonalInfo } from './components/Step2PersonalInfo';
import { Step3ProfilePhoto } from './components/Step3ProfilePhoto';
import { Step4Review } from './components/Step4Review';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Register'
>;

const TOTAL_STEPS = 4;

export const Register: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterData>>({});
  const [isRestoring, setIsRestoring] = useState(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore draft data on mount
  useEffect(() => {
    const restoreDraft = async () => {
      try {
        const draft = await storageService.getRegisterDraft();
        if (draft) {
          setFormData(draft);
          // Determine current step based on what data exists
          // Step 4: Review - all required data should be present
          if (
            draft.email &&
            draft.password &&
            draft.firstName &&
            draft.lastName &&
            draft.phoneNumber &&
            draft.dateOfBirth &&
            draft.gender
          ) {
            setCurrentStep(4);
          }
          // Step 3: Profile photo - personal info complete
          else if (
            draft.firstName &&
            draft.lastName &&
            draft.phoneNumber &&
            draft.dateOfBirth &&
            draft.gender
          ) {
            setCurrentStep(3);
          }
          // Step 2: Personal info - email/password complete
          else if (draft.email && draft.password) {
            setCurrentStep(2);
          }
          // Step 1: Email/password - default or partial data
          else {
            setCurrentStep(1);
          }
        }
      } catch (error) {
        console.error('Error restoring draft:', error);
      } finally {
        setIsRestoring(false);
      }
    };

    restoreDraft();
  }, []);

  // Save draft data whenever formData changes (debounced)
  useEffect(() => {
    if (isRestoring) return; // Don't save while restoring

    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce save operation
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await storageService.saveRegisterDraft(formData);
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }, 500); // 500ms debounce

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData, isRestoring]);

  // Clear draft on successful registration
  useEffect(() => {
    if (isAuthenticated) {
      storageService.clearRegisterDraft().catch((error) => {
        console.error('Error clearing draft:', error);
      });
    }
  }, [isAuthenticated]);

  // Clear errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      // Clear timeout on unmount
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [dispatch]);

  // Navigate will be handled automatically by RootNavigator when isAuthenticated becomes true
  // No need to manually navigate here

  const handleDataChange = (data: Partial<RegisterData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Clear errors when data changes (user is making progress)
    if (error) {
      dispatch(clearError());
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      // Clear errors when moving to next step
      if (error) {
        dispatch(clearError());
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Clear errors when going back
      if (error) {
        dispatch(clearError());
      }
    }
  };

  const handleSubmit = async () => {
    if (currentStep === TOTAL_STEPS) {
      // Submit all form data (API will ignore confirmPassword)
      await dispatch(registerThunk(formData as RegisterData));
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1EmailPassword
            formData={formData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            error={error}
          />
        );
      case 2:
        return (
          <Step2PersonalInfo
            formData={formData}
            onDataChange={handleDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            error={error}
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
        return (
          <Step4Review
            formData={formData as RegisterData}
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

          {renderStep()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
