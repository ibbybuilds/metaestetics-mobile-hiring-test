import React from 'react';
import { RegisterData } from '@types';

export interface Step3ProfilePhotoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Placeholder component - candidates will implement this
export const Step3ProfilePhoto: React.FC<Step3ProfilePhotoProps> = () => {
  return null;
};

