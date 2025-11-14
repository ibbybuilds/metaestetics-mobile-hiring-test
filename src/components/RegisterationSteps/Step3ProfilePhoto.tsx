import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Button, Typography } from '@components/common';
import { ImagePickerComponent } from '@components/common/ImagePickerComponent';
import { RegisterData } from '@types';
import { colors, spacing } from '@theme';

export interface Step3ProfilePhotoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => Promise<void>;
  onNext: () => void;
  onPrevious: () => void;
}

const initialValues = (formData: Partial<RegisterData>) => ({
  profileImage: formData.profileImage ?? '',
});

type Step3Values = ReturnType<typeof initialValues>;

export const Step3ProfilePhoto: React.FC<Step3ProfilePhotoProps> = ({
  formData,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const handleSubmit = async (values: Step3Values) => {
    await onDataChange(values);
    onNext();
  };

  return (
    <Formik<Step3Values>
      initialValues={initialValues(formData)}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <View style={styles.container}>
          <View style={styles.content}>
            <Typography variant="h3" style={styles.title}>
              Profile picture
            </Typography>
            <Typography variant="body2" style={styles.description}>
              Add a photo so others can recognize you. This is optional, but recommended.
            </Typography>

            <ImagePickerComponent
              currentImage={values.profileImage || undefined}
              onImageSelected={(uri) => setFieldValue('profileImage', uri)}
              size={120}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <View style={styles.buttonRow}>
              <Button
                title="Back"
                variant="outline"
                onPress={onPrevious}
                size="large"
                style={styles.button}
              />
              <Button
                title="Continue"
                variant="primary"
                onPress={() => handleSubmit()}
                size="large"
                style={styles.button}
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  description: {
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  content: {
    alignItems: 'center',
  },
  buttonRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});
