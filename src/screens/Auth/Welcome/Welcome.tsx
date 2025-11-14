import React from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Typography } from '@components/common';
import { AuthStackParamList } from '@types';
import { colors, spacing } from '@theme';
import { styles } from './Welcome.styles';
import { strings } from '@utils/strings';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

export const Welcome: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Typography variant="h1" style={styles.logo}>
            {strings.welcomeLogoText}
          </Typography>
        </View>

        <View style={styles.textContainer}>
          <Typography variant="h2" align="center" style={styles.title}>
            {strings.welcomeTitle}
          </Typography>
          <Typography variant="body1" align="center" style={styles.subtitle}>
            {strings.welcomeSubtitle}
          </Typography>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={strings.loginText}
            onPress={() => navigation.navigate('Login')}
            variant="primary"
            size="large"
            fullWidth
            style={styles.button}
          />
          <Button
            title={strings.welcomeSignUpButton}
            onPress={() => navigation.navigate('Register')}
            variant="outline"
            size="large"
            fullWidth
            style={styles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
};

