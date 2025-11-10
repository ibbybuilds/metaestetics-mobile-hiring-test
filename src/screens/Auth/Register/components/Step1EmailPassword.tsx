import React from 'react';
import { RegisterData } from '@types';

export interface Step1EmailPasswordProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
}

// Placeholder component - candidates will implement this
export const Step1EmailPassword: React.FC<Step1EmailPasswordProps> = () => {
  return null;
};
