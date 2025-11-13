import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { registerThunk, signupDraftThunk } from '@store/auth/authThunks';
import { RegisterData } from '@types';
import { AuthStackParamList } from '@types';
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
  const { isLoading, signupDraft } = useAppSelector((state) => state.auth);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterData>>({});

  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (signupDraft) {
      setFormData(signupDraft.data);
      setCurrentStep(signupDraft.step);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const saveDraft = async () => {
      await dispatch(signupDraftThunk({ data: formData, step: currentStep }));
    };
    if (Object.keys(formData).length != 0) {
      saveDraft();
    }
  }, [formData, currentStep]);

  const handleDataChange = (data: Partial<RegisterData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (isEditing) {
      setIsEditing(false);
      setCurrentStep(TOTAL_STEPS);
    } else if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    isEditing && setIsEditing(false);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoTo = (step: number) => {
    setIsEditing(true);
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    if (currentStep === TOTAL_STEPS) {
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
            goTo={handleGoTo}
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.stepIndicator}>
            <Typography variant="body2" style={styles.stepText}>
              Step {currentStep} of {TOTAL_STEPS}
            </Typography>
          </View>

          {isLoaded && renderStep()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
