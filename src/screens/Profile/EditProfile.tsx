import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { Input, Button, LoadingSpinner, ImagePickerComponent, Typography, DatePicker } from '@components/common';
import { setUser } from '@store/auth/authSlice';
import { RootState } from '@store/index';
import { storageService } from '@services/storage.service';
import { mockApiService } from '@services/mock-api.service';
import { colors, spacing } from '@theme/index';
import { profileSchema } from '@utils/profileValidation';
import { formatDateToYMD } from '@utils/formatters';
import { MainStackParamList } from '../../types/navigation.types';
import { STRINGS } from '../../constants/strings';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { User } from '../../types/user.types';

export const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, 'EditProfile'>>();
  const profile = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // React Query mutation for profile update
  const mutation = useMutation({
    mutationFn: async (updatedUser: User) => {
      await mockApiService.updateProfile(updatedUser.id, updatedUser);
      await storageService.saveUser(updatedUser);
      return updatedUser;
    },
    onMutate: async (newUser: User) => {
      await queryClient.cancelQueries({ queryKey: ['user'] });
      const previousUser = queryClient.getQueryData(['user']) as User | undefined;
      queryClient.setQueryData(['user'], newUser);
      return { previousUser };
    },
    onError: (err, newUser: User, context?: { previousUser?: User }) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user'], context.previousUser);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  if (!profile) return <LoadingSpinner fullScreen testID="loading-spinner" />;

  return (
    <Formik
      initialValues={{
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phoneNumber || '',
        dob: formatDateToYMD(profile.dateOfBirth),
        gender: profile.gender || '',
        photo: profile.profileImage || '',
      }}
      validationSchema={profileSchema}
      onSubmit={async (values) => {
        setLoading(true);
        setError(null);
        try {
          const updatedUser = {
            ...profile,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phone,
            dateOfBirth: formatDateToYMD(values.dob),
            gender: values.gender,
            profileImage: values.photo,
          };
          // Optimistic update via React Query
          await mutation.mutateAsync(updatedUser);
          // Redux/AsyncStorage update (for legacy/test requirements)
          dispatch(setUser(updatedUser));
          Alert.alert(STRINGS.profile.success, STRINGS.profile.success, [
            { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Profile' }] }) },
          ]);
        } catch (e) {
          setError(e instanceof Error ? e.message : STRINGS.profile.error);
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, submitCount }) => (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <ImagePickerComponent
            currentImage={values.photo}
            onImageSelected={(uri: string) => setFieldValue('photo', uri)}
            onRemove={() => setFieldValue('photo', '')}
          />
          <Input
            label={STRINGS.profile.name}
            accessibilityLabel="First Name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={() => handleBlur('firstName')}
            error={((touched.firstName || submitCount > 0) && errors.firstName) ? errors.firstName : undefined}
          />
          <Input
            label="Last Name"
            accessibilityLabel="Last Name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={() => handleBlur('lastName')}
            error={((touched.lastName || submitCount > 0) && errors.lastName) ? errors.lastName : undefined}
          />
          <Input
            label={STRINGS.profile.phone}
            accessibilityLabel={STRINGS.profile.phone}
            value={values.phone}
            onChangeText={handleChange('phone')}
            onBlur={() => handleBlur('phone')}
            error={((touched.phone || submitCount > 0) && errors.phone) ? errors.phone : undefined}
            keyboardType="phone-pad"
          />
          {/* Date of Birth - not editable */}
          <DatePicker
            label={STRINGS.profile.dob}
            value={values.dob ? new Date(values.dob) : null}
            onChange={() => {}}
            error={((touched.dob || submitCount > 0) && errors.dob) ? errors.dob : undefined}
            placeholder="YYYY-MM-DD"
            editable={false}
          />

          {/* Gender - not editable from edit profile screen */}
          <Input
            label={STRINGS.profile.gender}
            accessibilityLabel={STRINGS.profile.gender}
            value={values.gender}
            editable={false}
            onChangeText={() => {}}
            error={((touched.gender || submitCount > 0) && errors.gender) ? errors.gender : undefined}
            placeholder="Gender"
          />

          {error && <View style={styles.error}><Typography variant="body2" style={styles.errorText}>{error}</Typography></View>}
          <View style={styles.buttonRow}>
            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              variant="secondary"
              accessibilityLabel="Cancel editing profile"
              style={styles.button}
            />
            <Button
              title={loading ? STRINGS.profile.saving : STRINGS.profile.save}
              onPress={handleSubmit}
              variant="primary"
              disabled={loading}
              accessibilityLabel="Save profile changes"
              style={styles.button}
            />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  container: {
    backgroundColor: colors.background,
    flexGrow: 1,
    padding: spacing.md,
  },
  error: {
    marginVertical: spacing.sm,
  },
  errorText: {
    color: colors.primary,
  },
});

