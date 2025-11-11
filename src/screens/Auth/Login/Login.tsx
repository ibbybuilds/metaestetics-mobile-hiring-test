import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { Input, Button, Typography } from '@components/common';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loginThunk } from '@store/auth/authThunks';
import { clearError } from '@store/auth/authSlice';
import { loginValidationSchema } from '@utils/validation';
import { AuthStackParamList } from '@types';
import { styles } from './Login.styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleLogin = async (values: { email: string; password: string }) => {
    await dispatch(loginThunk(values));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Typography variant="h2" style={styles.title}>
            Login
          </Typography>
          <Typography variant="body2" style={styles.subtitle}>
            Sign in to your account
          </Typography>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => handleBlur('password')}
                  error={touched.password && errors.password ? errors.password : undefined}
                  secureTextEntry
                />

                {error && (
                  <Typography variant="caption" style={styles.errorText}>
                    {error}
                  </Typography>
                )}

                <TouchableOpacity onPress={() => {}} style={styles.forgotPassword}>
                  <Typography variant="body2" style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Typography>
                </TouchableOpacity>

                <Button
                  title="Login"
                  onPress={() => handleSubmit()}
                  variant="primary"
                  size="large"
                  fullWidth
                  loading={isLoading}
                  style={styles.button}
                />

                <View style={styles.signUpContainer}>
                  <Typography variant="body2" style={styles.signUpText}>
                    Don't have an account?{' '}
                  </Typography>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Typography variant="body2" style={styles.signUpLink}>
                      Sign up
                    </Typography>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
