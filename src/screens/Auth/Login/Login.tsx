import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { Input, Button, Typography } from "@components/common";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { clearError } from "@store/auth/authSlice";
import { loginThunk } from "@store/auth/authThunks";
import { loginValidationSchema } from "@utils/validation";
import { strings } from "@utils/strings";
import { AuthStackParamList } from "@types";
import { styles } from "./Login.styles";
import { SafeAreaView } from "react-native-safe-area-context";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

/**
 * Login component handles user authentication.
 * It provides a form for users to enter their email and password,
 * validates the input, dispatches a login action, and handles loading and error states.
 */
export const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useAppDispatch();
  // Retrieve authentication state (loading, error) and user from Redux store
  const { isLoading, error } = useAppSelector((state) => state.auth);

  // Effect to clear any authentication errors when the component unmounts
  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  /**
   * Handles the login form submission.
   * Dispatches the `loginThunk` with the provided email and password.
   * @param {object} values - Object containing email and password from the form.
   */
  const handleLogin = async (values: { email: string; password: string }) => {
    await dispatch(loginThunk(values));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Typography variant="h2" style={styles.title}>
              {strings.loginText}
            </Typography>
            <Typography variant="body2" style={styles.subtitle}>
              {strings.signInYourAccount}
            </Typography>

            {/* Formik for form handling and validation */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.form}>
                  {/* Email input field */}
                  <Input
                    label={strings.emailLabel}
                    placeholder={strings.emailPlaceholder}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={
                      touched.email && errors.email ? errors.email : undefined
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  {/* Password input field */}
                  <Input
                    label={strings.passwordLabel}
                    placeholder={strings.passwordPlaceholder}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                    secureTextEntry
                  />

                  {/* Display authentication error message if present */}
                  {error && (
                    <Typography variant="caption" style={styles.errorText}>
                      {error}
                    </Typography>
                  )}

                  {/* Forgot Password link */}
                  <TouchableOpacity
                    onPress={() => {}} // Placeholder for navigation to Forgot Password screen
                    style={styles.forgotPassword}
                  >
                    <Typography
                      variant="body2"
                      style={styles.forgotPasswordText}
                    >
                      {strings.forgotPassword}
                    </Typography>
                  </TouchableOpacity>

                  {/* Login button */}
                  <Button
                    title={strings.loginText}
                    onPress={() => handleSubmit()}
                    variant="primary"
                    size="large"
                    fullWidth
                    loading={isLoading} // Display loading spinner when login is in progress
                    style={styles.button}
                  />

                  {/* Sign up navigation link */}
                  <View style={styles.signUpContainer}>
                    <Typography variant="body2" style={styles.signUpText}>
                      {strings.noAccountText}
                    </Typography>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Register")}
                    >
                      <Typography variant="body2" style={styles.signUpLink}>
                        {strings.signUpLink}
                      </Typography>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
