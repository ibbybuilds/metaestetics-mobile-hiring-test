import React from 'react';
import { View, ScrollView } from 'react-native';
import { Typography } from '@components/common';
import { colors, spacing } from '@theme';
import { styles } from './Settings.styles';

export const Settings: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Typography variant="h2" style={styles.title}>
          Settings
        </Typography>
        <Typography variant="body2" style={styles.subtitle}>
          Settings screen placeholder
        </Typography>
      </View>
    </ScrollView>
  );
};

