import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Typography } from '@components/common';
import { Clinic } from '@types';
import { spacing } from '@theme';

interface ClinicItemProps {
  clinic: Clinic;
}

export const ClinicItem = memo<ClinicItemProps>(({ clinic }) => {
  return (
    <Card style={styles.clinicCard}>
      <Typography variant="h4">{clinic.name}</Typography>
      <Typography variant="body2">{clinic.address}</Typography>
      <Typography variant="body2">Rating: {clinic.rating.toFixed(1)}</Typography>
      <Typography variant="body2">
        Specialties: {clinic.specialties.join(', ')}
      </Typography>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function - only re-render if clinic data changed
  return prevProps.clinic.id === nextProps.clinic.id &&
         prevProps.clinic.name === nextProps.clinic.name &&
         prevProps.clinic.address === nextProps.clinic.address &&
         prevProps.clinic.rating === nextProps.clinic.rating;
});

ClinicItem.displayName = 'ClinicItem';

const styles = StyleSheet.create({
  clinicCard: {
    marginBottom: spacing.sm,
  },
});