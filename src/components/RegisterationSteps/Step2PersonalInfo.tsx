import React from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { Button, Input, Typography } from "@components/common";
import { PhoneInputComponent } from "@components/common/PhoneInput";
import { DatePicker } from "@components/common/DatePicker";
import { SelectInput } from "@components/common/SelectInput";
import { RegisterData } from "@types";
import {
  GENDER_OPTIONS,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_COUNTRY_ISO,
} from "@utils/constants";
import { registerStep2ValidationSchema } from "@utils/validation";
import { colors, spacing } from "@theme";

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => Promise<void>;
  onNext: () => void;
  onPrevious: () => void;
}

const initialValues = (formData: Partial<RegisterData>) => ({
  firstName: formData.firstName ?? "",
  lastName: formData.lastName ?? "",
  phoneNumber: formData.phoneNumber ?? "",
  countryCode: formData.countryCode ?? DEFAULT_COUNTRY_CODE,
  countryIso: formData.countryIso ?? DEFAULT_COUNTRY_ISO,
  dateOfBirth: formData.dateOfBirth ?? "",
  gender: formData.gender ?? "",
});

type Step2Values = ReturnType<typeof initialValues>;

export const Step2PersonalInfo: React.FC<Step2PersonalInfoProps> = ({
  formData,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const handleSubmit = async (values: Step2Values) => {
    await onDataChange(values as Partial<RegisterData>);
    onNext();
  };

  return (
    <Formik<Step2Values>
      initialValues={initialValues(formData)}
      validationSchema={registerStep2ValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <View style={styles.formContent}>
            <Typography variant="h3" style={styles.title}>
              Tell us about you
            </Typography>
            <Typography variant="body2" style={styles.description}>
              We need a few more details to personalize your experience.
            </Typography>

            <Input
              label="First Name"
              placeholder="First name"
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              error={
                touched.firstName && errors.firstName
                  ? errors.firstName
                  : undefined
              }
              style={styles.field}
            />

            <Input
              label="Last Name"
              placeholder="Last name"
              value={values.lastName}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              error={
                touched.lastName && errors.lastName ? errors.lastName : undefined
              }
              style={styles.field}
            />

            <View style={{ paddingBottom: spacing.xs }}>
              <PhoneInputComponent
                label="Phone Number"
                value={values.phoneNumber}
                countryCode={values.countryCode}
                countryIso={values.countryIso}
                onChangeText={(text) => {
                  setFieldValue("phoneNumber", text.replace(/\D/g, ""));
                }}
                onChangeCountryCode={(code) => {
                  setFieldValue("countryCode", code);
                }}
                onChangeCountryIso={(iso) => {
                  setFieldValue("countryIso", iso);
                }}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : undefined
                }
              />
            </View>

            <View style={{ paddingBottom: spacing.sm }}>
              <DatePicker
                label="Date of Birth"
                value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
                onChange={(date) =>
                  setFieldValue("dateOfBirth", date.toISOString())
                }
                error={
                  touched.dateOfBirth && errors.dateOfBirth
                    ? errors.dateOfBirth
                    : undefined
                }
                placeholder="Select your birth date"
              />
            </View>

            <View style={styles.field}>
              <SelectInput
                label="Gender"
                value={values.gender}
                placeholder="Select gender"
                options={GENDER_OPTIONS}
                onChange={(value) => setFieldValue("gender", value)}
                error={
                  touched.gender && errors.gender ? errors.gender : undefined
                }
              />
            </View>
          </View>

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
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: spacing.lg,
  },
  formContent: {
    flex: 1,
  },
  title: {
    marginBottom: spacing.sm,
  },
  description: {
    marginBottom: spacing.lg,
    color: colors.textSecondary,
  },
  field: {
    marginBottom: spacing.md,
  },
  buttonRow: {
    marginTop: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});
