import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import {
  Input,
  Button,
  DatePicker,
  PhoneInput,
  SelectInput,
  Typography,
} from "@components/common";
import { RegisterData } from "@types";
import { registerStep2ValidationSchema } from "@utils/validation";
import { styles } from "../Register.styles";
import { GENDER_OPTIONS } from "@utils/constants";
import { strings } from "@utils/strings";

export interface Step2PersonalInfoProps {
  formData: Partial<RegisterData>;
  onDataChange: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Step2PersonalInfo component handles the second step of user registration,
 * collecting personal information such as first name, last name, phone number,
 * date of birth, and gender. It uses Formik for form management and Yup for validation.
 */
export const Step2PersonalInfo: React.FC<Step2PersonalInfoProps> = ({
  formData, // Current form data from the parent Register component
  onDataChange, // Callback to update form data in the parent
  onNext, // Callback to proceed to the next registration step
  onPrevious, // Callback to go back to the previous registration step
}) => {

  return (
    <Formik
      // Initialize form values with existing formData or empty strings
      initialValues={{
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        phoneNumber: formData.phoneNumber || "",
        countryCode: formData.countryCode || "",
        countryCallingCode: formData.countryCallingCode || "",
        dateOfBirth: formData.dateOfBirth || "",
        gender: formData.gender || "",
      }}
      validationSchema={registerStep2ValidationSchema} // Apply Yup validation schema
      onSubmit={(values) => {
        onDataChange({
          ...values,
          gender: values.gender as "male" | "female" | "other" | undefined,
        });
        onNext(); // Proceed to the next step
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.formContainer}>
          <Typography variant="h4" style={styles.title}>{strings.personalInformationTitle}</Typography>
          <Typography variant="body2" style={styles.description}>{strings.personalInformationDescription}</Typography>
          {/* Input field for First Name */}
          <Input
            label={strings.firstNameLabel}
            placeholder={strings.firstNamePlaceholder}
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            value={values.firstName}
            error={
              touched.firstName && errors.firstName
                ? errors.firstName
                : undefined
            }
          />
          {/* Input field for Last Name */}
          <Input
            label={strings.lastNameLabel}
            placeholder={strings.lastNamePlaceholder}
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={values.lastName}
            error={
              touched.lastName && errors.lastName ? errors.lastName : undefined
            }
          />
          {/* Phone number input component */}
          <PhoneInput
            label={strings.phoneNumberLabel}
            onChangeText={(phoneNumber) => {
              setFieldValue("phoneNumber", phoneNumber);
            }}
            onChangeCountryCode={(countryCode) => {
              setFieldValue("countryCode", countryCode);
            }}
            onChangeCountryCallingCode={(countryCallingCode) => {
              setFieldValue("countryCallingCode", countryCallingCode);
            }}
            countryCode={values.countryCode}
            value={values.phoneNumber}
            error={
              touched.phoneNumber && errors.phoneNumber
                ? errors.phoneNumber
                : undefined
            }
          />
          {/* Date picker component for Date of Birth */}
          <DatePicker
            label={strings.dateOfBirthLabel}
            placeholder={strings.dateOfBirthPlaceholder}
            onChange={(date) =>
              setFieldValue("dateOfBirth", date.toISOString().split("T")[0])
            }
            value={values.dateOfBirth ? new Date(values.dateOfBirth) : null}
            error={
              touched.dateOfBirth && errors.dateOfBirth
                ? errors.dateOfBirth
                : undefined
            }
          />
          {/* Select input component for Gender */}
          <SelectInput
            label={strings.genderLabel}
            placeholder={strings.genderPlaceholder}
            options={GENDER_OPTIONS}
            onChange={(value) => setFieldValue("gender", value)}
            value={values.gender}
            error={touched.gender && errors.gender ? errors.gender : undefined}
          />
          {/* Button container for navigation */}
          <View style={styles.buttonContainer}>
            <Button
              title={strings.previousButton}
              onPress={onPrevious}
              variant="secondary"
              style={styles.button}
            />
            <Button title={strings.nextButton} onPress={handleSubmit} style={styles.button} />
          </View>
        </View>
      )}
    </Formik>
  );
};
