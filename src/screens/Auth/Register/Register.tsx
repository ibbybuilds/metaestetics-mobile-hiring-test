import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography, LoadingSpinner } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { registerThunk } from '@store/auth/authThunks';
import { clearError } from '@store/auth/authSlice';
import { RegisterData } from '../../../types';
import { storageService } from '../../../services';
import { styles } from './Register.styles';
import { Step1EmailPassword } from './components/Step1EmailPassword';
import { Step2PersonalInfo } from './components/Step2PersonalInfo';
import { Step3ProfilePhoto } from './components/Step3ProfilePhoto';
import { Step4Review } from './components/Step4Review';

const TOTAL_STEPS = 4;

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterData>>({});
  const [isRestoringDraft, setIsRestoringDraft] = useState(true);
  const formDataRef = useRef<Partial<RegisterData>>({});

  const persistDraft = useCallback(
    async (data: Partial<RegisterData>, step: number) => {
      try {
        await storageService.saveRegistrationDraft({
          currentStep: step,
          data,
        });
      } catch (storageError) {
        console.warn('Failed to save registration draft', storageError);
      }
    },
    []
  );

  useEffect(() => {
    let isMounted = true;

    const loadDraft = async () => {
      try {
        const draft = await storageService.getRegistrationDraft();
        if (draft && isMounted) {
          const step =
            draft.currentStep >= 1 && draft.currentStep <= TOTAL_STEPS
              ? draft.currentStep
              : 1;
          formDataRef.current = draft.data ?? {};
          setFormData(draft.data ?? {});
          setCurrentStep(step);
        }
      } catch (storageError) {
        console.warn('Failed to load registration draft', storageError);
      } finally {
        if (isMounted) {
          setIsRestoringDraft(false);
        }
      }
    };

    loadDraft();

    return () => {
      isMounted = false;
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleDataChange = useCallback(
    (data: Partial<RegisterData>) => {
      setFormData(prev => {
        const updated = { ...prev, ...data };
        formDataRef.current = updated;
        void persistDraft(updated, currentStep);
        return updated;
      });
    },
    [currentStep, persistDraft]
  );

  const handleNext = useCallback(() => {
    setCurrentStep(prev => {
      if (prev >= TOTAL_STEPS) {
        return prev;
      }
      const nextStep = prev + 1;
      void persistDraft(formDataRef.current, nextStep);
      return nextStep;
    });
  }, [persistDraft]);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => {
      if (prev <= 1) {
        return prev;
      }
      const nextStep = prev - 1;
      void persistDraft(formDataRef.current, nextStep);
      return nextStep;
    });
  }, [persistDraft]);

  const handleSubmit = useCallback(async () => {
    if (currentStep !== TOTAL_STEPS) {
      return;
    }

    try {
      await dispatch(registerThunk(formDataRef.current as RegisterData)).unwrap();
      await storageService.clearRegistrationDraft();
    } catch (submitError) {
      console.warn('Registration failed', submitError);
    }
  }, [currentStep, dispatch]);

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

  if (isRestoringDraft) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 48 : 0}
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

