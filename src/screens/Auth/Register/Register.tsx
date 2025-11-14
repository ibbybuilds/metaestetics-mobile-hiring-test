import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Typography } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { registerThunk } from '@store/auth/authThunks';
import { RegisterData } from '@types';
import { AuthStackParamList } from '@types';
import { STORAGE_KEYS } from '@utils/constants';
import { styles } from './Register.styles';
import { Step1EmailPassword } from './components/Step1EmailPassword';
import { Step2PersonalInfo } from './components/Step2PersonalInfo';
import { Step3ProfilePhoto } from './components/Step3ProfilePhoto';
import { Step4Review } from './components/Step4Review';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const TOTAL_STEPS = 4; // Total number of registration steps

/**
 * Register component orchestrates the multi-step user registration process.
 * It manages the current step, persists form data across steps using AsyncStorage,
 * handles navigation between steps, and dispatches the registration thunk.
 */
export const Register: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useAppDispatch();
  // Retrieve loading and error states from the Redux auth slice
  const { isLoading, error } = useAppSelector(state => state.auth);
  
  // State to manage the current step of the registration process
  const [currentStep, setCurrentStep] = useState(1);
  // State to store form data collected across all steps
  const [formData, setFormData] = useState<Partial<RegisterData>>({});

  // Effect to load saved form data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEYS.REGISTER_FORM_DATA);
        if (storedData) {
          setFormData(JSON.parse(storedData));
        }
      } catch (e) {
        console.error('Failed to load form data from AsyncStorage', e);
      }
    };
    loadFormData();
  }, []);

  // Effect to save form data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveFormData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.REGISTER_FORM_DATA, JSON.stringify(formData));
      } catch (e) {
        console.error('Failed to save form data to AsyncStorage', e);
      }
    };
    saveFormData();
  }, [formData]);

  // Effect to display an alert if a registration error occurs
  useEffect(() => {
    if (error) {
      Alert.alert('Registration Error', error);
    }
  }, [error]);

  /**
   * Updates the form data with new values from a specific step.
   * @param {Partial<RegisterData>} data - Partial data object from the current step.
   */
  const handleDataChange = (data: Partial<RegisterData>) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  };

  /**
   * Advances to the next registration step if not already on the last step.
   */
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Goes back to the previous registration step if not already on the first step.
   */
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Handles the final submission of the registration form.
   * Dispatches the `registerThunk` and clears stored form data on success.
   */
  const handleSubmit = async () => {
    if (currentStep === TOTAL_STEPS) {
      const resultAction = await dispatch(registerThunk(formData as RegisterData));
      if (registerThunk.fulfilled.match(resultAction)) {
        // Clear stored form data on successful registration
        await AsyncStorage.removeItem(STORAGE_KEYS.REGISTER_FORM_DATA);
      }
    }
  };

  /**
   * Renders the appropriate step component based on the currentStep state.
   */
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
          />
        );
      default:
        return null;
    }
  };

  return (
    // SafeAreaView to ensure content is not obscured by device notches/status bars
    <SafeAreaView style={styles.safeArea}>
      {/* KeyboardAvoidingView to adjust layout when keyboard appears */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* ScrollView to allow content to be scrollable if it exceeds screen height */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Step indicator displaying current progress */}
            <View style={styles.stepIndicator}>
              <Typography variant="body2" style={styles.stepText}>
                Step {currentStep} of {TOTAL_STEPS}
              </Typography>
            </View>

            {/* Render the current registration step component */}
            {renderStep()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
