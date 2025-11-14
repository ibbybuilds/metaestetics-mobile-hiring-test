import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Button, Card, Typography } from "@components/common";
import { RegisterData } from "@types";
import { formatDate, formatPhoneNumber, getInitials } from "@utils/formatters";
import { spacing, colors } from "@theme";

export interface Step4ReviewProps {
  formData: RegisterData;
  onPrevious: () => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  formData,
  onPrevious,
  onSubmit,
  isLoading,
  error,
}) => {
  const displayName = `${formData.firstName || ""} ${
    formData.lastName || ""
  }`.trim();
  const genderLabel = formData.gender
    ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)
    : "Not set";
  const dobLabel = formData.dateOfBirth
    ? formatDate(formData.dateOfBirth)
    : "Not set";
  const phoneLabel = formData.phoneNumber
    ? formatPhoneNumber(formData.phoneNumber, formData.countryCode)
    : "Not set";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Typography variant="h3" style={styles.title}>
          Review & Submit
        </Typography>
        <Card style={styles.card}>
          {formData.profileImage ? (
            <Image
              source={{ uri: formData.profileImage }}
              style={styles.avatar}
              contentFit="cover"
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Typography variant="h2" style={styles.avatarText}>
                {getInitials(formData.firstName ?? "", formData.lastName ?? "")}
              </Typography>
            </View>
          )}

          <View style={styles.infoRow}>
            <Typography variant="body2" style={styles.label}>
              Name:
            </Typography>
            <Typography variant="body1" style={styles.value}>
              {displayName || "Not set"}
            </Typography>
          </View>
          <View style={styles.infoRow}>
            <Typography variant="body2" style={styles.label}>
              Email:
            </Typography>
            <Typography variant="body1" style={styles.value}>
              {formData.email}
            </Typography>
          </View>
          <View style={styles.infoRow}>
            <Typography variant="body2" style={styles.label}>
              Phone:
            </Typography>
            <Typography variant="body1" style={styles.value}>
              {phoneLabel}
            </Typography>
          </View>
          <View style={styles.infoRow}>
            <Typography variant="body2" style={styles.label}>
              Date of birth:
            </Typography>
            <Typography variant="body1" style={styles.value}>
              {dobLabel}
            </Typography>
          </View>
          <View style={styles.infoRow}>
            <Typography variant="body2" style={styles.label}>
              Gender:
            </Typography>
            <Typography variant="body1" style={styles.value}>
              {genderLabel}
            </Typography>
          </View>
        </Card>
      </View>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonRow}>
          <Button
            title="Back"
            variant="outline"
            onPress={onPrevious}
            size="large"
            style={[styles.button, styles.buttonSpacing]}
          />
          <Button
            title="Submit"
            variant="primary"
            onPress={onSubmit}
            size="large"
            fullWidth
            loading={isLoading}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  title: {
    marginBottom: spacing.sm,
  },
  card: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: "center",
    marginBottom: spacing.md,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.white,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
  },
  value: {
    textAlign: "right",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
  },
  buttonSpacing: {
    marginRight: spacing.sm,
  },
  content: {
    flex: 1,
  },
  buttonWrapper: {
    width: "100%",
    paddingBottom: spacing.lg,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.sm,
  },
});
