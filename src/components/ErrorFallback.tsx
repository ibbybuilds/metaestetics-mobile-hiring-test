import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorFallbackProps {
  error: Error | null;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => (
  <View style={styles.container} accessibilityRole="alert">
    <Text style={styles.title}>Something went wrong.</Text>
    {error && <Text style={styles.message}>{error.message}</Text>}
    <Text style={styles.suggestion}>Please try again or contact support.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  suggestion: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
