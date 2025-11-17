import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { Input, Button, Typography } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearError } from '@store/auth/authSlice';
import { loginThunk } from '@store/auth/authThunks';
import { loginValidationSchema } from '@utils/validation';
import { AuthStackParamList } from '../../../types/navigation.types';
import { styles } from './Login.styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleLogin = async (values: { email: string; password: string }) => {
    await dispatch(loginThunk(values));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, submitCount }) => (
              <View style={styles.form}>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={((touched.email || submitCount > 0) && errors.email) ? errors.email : undefined}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={((touched.password || submitCount > 0) && errors.password) ? errors.password : undefined}
                  secureTextEntry
                />

                {error && (
                  <Typography variant="caption" style={styles.errorText}>
                    {error}
                  </Typography>
                )}

                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.forgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button
                  title="Login"
                  onPress={() => handleSubmit()}
                  variant="primary"
                  size="large"
                  fullWidth
                  loading={isLoading}
                  style={styles.button}
                  testID="login-button"
                />

                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>
                    Don&apos;t have an account?
                    <Text style={styles.signUpLink} onPress={() => navigation.navigate('Register')}>
                      Sign up
                    </Text>
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

