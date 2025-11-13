import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography, Button } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearRegistrationForm, loadRegistrationForm, registerThunk, saveRegistrationForm } from '@store/auth/authThunks';
import { RegisterData, AuthStackParamList } from '@types';
import { styles } from './Register.styles';
import { Step1EmailPassword } from './components/Step1EmailPassword';
import { Step2PersonalInfo } from './components/Step2PersonalInfo';
import { Step3ProfilePhoto } from './components/Step3ProfilePhoto';
import { Step4Review } from './components/Step4Review';
import { STORAGE_KEYS } from '@utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const TOTAL_STEPS = 4;

export const Register: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated  } = useAppSelector(state => state.auth);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);


 // Load saved data on mount via thunk
  useEffect(() => {
    dispatch(loadRegistrationForm()).then((res: any) => {
      if (res.payload && res.payload.formData) {
        setFormData(res.payload.formData);
        setCurrentStep(res.payload.currentStep || 1);
      }
    }).catch(() => {});
  }, [dispatch]);

   // Save data whenever formData or currentStep changes (debounce if needed)
  useEffect(() => {
    dispatch(saveRegistrationForm({ formData, currentStep }));
  }, [formData, currentStep, dispatch]);

  // Clear saved data when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(clearRegistrationForm());
  }, [isAuthenticated, dispatch]);

  const handleDataChange = (data: Partial<RegisterData>) => {
    console.log(data)
    setFormData(prev => ({ ...prev, ...data }));
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
      setSubmitError(null);
      const res = await dispatch(registerThunk(formData as RegisterData));
      if (registerThunk.rejected.match(res)) {
        const message = (res.payload as string) || res.error?.message || 'Registration failed';
        setSubmitError(message);
        return;
      }
      // success: clear any local error and proceed (navigation or other effect)
      setSubmitError(null);
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
            errorMessage={submitError}
            onClearError={() => {
              setSubmitError(null);
              setCurrentStep(1); // redirect to first step after closing popup
            }}
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

