import React from 'react';
import { RegisterData } from '@types';

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

// Placeholder component - candidates will implement this
export const Step4Review: React.FC<Step4ReviewProps> = () => {
  return null;
};

