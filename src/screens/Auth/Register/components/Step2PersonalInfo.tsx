import React from 'react';
import { RegisterData } from '@types';

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Placeholder component - candidates will implement this
export const Step2PersonalInfo: React.FC<Step2PersonalInfoProps> = () => {
  return null;
};

