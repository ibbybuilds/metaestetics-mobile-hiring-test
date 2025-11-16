import React from 'react';
import { Card, Typography } from '@components/common';
import { ClinicData } from '@types';
import { StyleSheet } from 'react-native';
import { spacing, colors } from '@theme';

interface ClinicItemProps {
  data: ClinicData;
}

export const ClinicItem: React.FC<ClinicItemProps> = React.memo(({ data }) => {
  return (
    <Card style={styles.clinicCard}>
      <Typography variant="h4" color={colors.primary}>
        {data.name}
      </Typography>
      <Typography variant="body2">{data.address}</Typography>
      <Typography variant="body2" color={colors.textSecondary}>
        Rating: {data.rating.toFixed(1)}
      </Typography>
    </Card>
  );
});

const styles = StyleSheet.create({
  clinicCard: {
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
  },
});
