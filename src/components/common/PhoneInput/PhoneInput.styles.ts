import { StyleSheet } from "react-native";
import { colors, spacing } from "@theme";

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  phoneContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  errorPhoneInput: {
    borderColor: colors.error,
  },
  textContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  textInput: {
    fontSize: 16,
    color: colors.textPrimary,
    height: 40,
  },
  codeText: {
    fontSize: 16,
    height: 40,
    marginTop: 15,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
    fontSize: 12,
  },
});
