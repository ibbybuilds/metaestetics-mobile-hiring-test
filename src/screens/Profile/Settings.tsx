import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { styles } from './Settings.styles';

export const Settings: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Settings
        </Text>
        <Text style={styles.subtitle}>
          Settings screen placeholder
        </Text>
      </View>
    </ScrollView>
  );
};

