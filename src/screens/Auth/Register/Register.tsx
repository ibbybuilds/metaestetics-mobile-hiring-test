import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography, Button } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { registerThunk } from '@store/auth/authThunks';
import { clearError } from '@store/auth/authSlice';
import { RegisterData } from '@types';
import { AuthStackParamList } from '@types';
import { storageService } from '../../../services';
import { colors } from '../../../theme';
import { styles } from './Register.styles';
import { Step1EmailPassword } from './components/Step1EmailPassword';
import { Step2PersonalInfo } from './components/Step2PersonalInfo';
import { Step3ProfilePhoto } from './components/Step3ProfilePhoto';
import { Step4Review } from './components/Step4Review';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const TOTAL_STEPS = 4;

export const Register: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterData>>({});

  useEffect(() => {
    loadPersistedData();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      storageService.removeItem('registrationFormData');
      storageService.removeItem('registrationStep');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const loadPersistedData = async () => {
    try {
      const persistedData = await storageService.getItem('registrationFormData');
      const persistedStep = await storageService.getItem('registrationStep');
      
      if (persistedData) {
        setFormData(JSON.parse(persistedData));
      }
      if (persistedStep) {
        setCurrentStep(parseInt(persistedStep, 10));
      }
    } catch (error) {
      console.log('Failed to load persisted registration data');
    }
  };

  const persistFormData = async (data: Partial<RegisterData>, step: number) => {
    try {
      await storageService.saveItem('registrationFormData', JSON.stringify(data));
      await storageService.saveItem('registrationStep', step.toString());
    } catch (error) {
      console.log('Failed to persist registration data');
    }
  };

  const handleDataChange = (data: Partial<RegisterData>) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    persistFormData(updatedData, currentStep);
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      persistFormData(formData, nextStep);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      persistFormData(formData, prevStep);
    }
  };

  const validateFinalFormData = (data: Partial<RegisterData>): data is RegisterData => {
    return !!(
      data.email &&
      data.password &&
      data.confirmPassword &&
      data.firstName &&
      data.lastName &&
      data.phoneNumber &&
      data.countryCode &&
      data.dateOfBirth &&
      data.gender
    );
  };

  const handleSubmit = async () => {
    if (currentStep === TOTAL_STEPS) {
      if (!validateFinalFormData(formData)) {
        // Validation error will be shown inline in Step4Review
        return;
      }

      try {
        await dispatch(registerThunk(formData as RegisterData)).unwrap();
      } catch (error) {
        // Error will be shown inline in Step1
      }
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
            error={error || undefined}
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
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.stepIndicatorContainer}>
          <View style={styles.stepIndicator}>
            <Typography variant="body2" style={styles.stepText}>
              Step {currentStep} of {TOTAL_STEPS}
            </Typography>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(currentStep / TOTAL_STEPS) * 100}%` }
                ]}
              />
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: colors.background }}
        >
          <View style={styles.content}>
            <View style={styles.centeredContent}>
              {renderStep()}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

