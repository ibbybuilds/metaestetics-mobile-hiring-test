import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { colors, spacing } from "@theme";

type InputStyles = {
  container: ViewStyle;
  containerError: ViewStyle;
  label: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  inputWithLeftIcon: TextStyle;
  inputWithRightIcon: TextStyle;
  inputFocused: TextStyle;
  inputError: TextStyle;
  inputDisabled: TextStyle;
  inputMultiline: TextStyle;
  leftIcon: ViewStyle;
  rightIcon: ViewStyle;
  passwordToggle: TextStyle;
  errorText: TextStyle;
};

export const styles = StyleSheet.create<InputStyles>({
  container: {
    marginBottom: spacing.md,
  },
  containerError: {
    marginBottom: spacing.xs,
  },
  label: {
    marginBottom: spacing.lg,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  dateLabel: {
    marginBottom: spacing.md,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    height: 30,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  inputWithLeftIcon: {
    paddingLeft: 40,
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },
  inputFocused: {
    borderColor: colors.borderFocus,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputDisabled: {
    backgroundColor: colors.gray[100],
    color: colors.textSecondary,
  },
  inputMultiline: {
    height: "auto",
    minHeight: 100,
    paddingTop: spacing.sm,
    textAlignVertical: "top",
  },
  leftIcon: {
    position: "absolute",
    left: spacing.sm,
    zIndex: 1,
  },
  rightIcon: {
    position: "absolute",
    right: spacing.sm,
    top: -4,
    zIndex: 1,
  },
  passwordToggle: {
    color: colors.primary,
    fontSize: 12,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: spacing.sm,
  },
});
