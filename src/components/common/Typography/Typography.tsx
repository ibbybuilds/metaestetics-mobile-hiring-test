import React from "react";
import { Text, TextStyle, StyleSheet, StyleProp } from "react-native";
import { colors, typography } from "@theme/index";

export interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body1" | "body2" | "caption";
  color?: string;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  color = colors.textPrimary,
  align = "left",
  children,
  style,
}) => {
  const variantStyles = {
    h1: {
      fontSize: typography.fontSizes.xxxl,
      fontWeight: typography.fontWeights.bold,
    },
    h2: {
      fontSize: typography.fontSizes.xxl,
      fontWeight: typography.fontWeights.bold,
    },
    h3: {
      fontSize: typography.fontSizes.xl,
      fontWeight: typography.fontWeights.semibold,
    },
    h4: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.semibold,
    },
    body1: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.regular,
    },
    body2: {
      fontSize: typography.fontSizes.sm,
      fontWeight: typography.fontWeights.regular,
    },
    caption: {
      fontSize: typography.fontSizes.xs,
      fontWeight: typography.fontWeights.regular,
    },
  };

  return (
    <Text
      style={[
        // styles.base,
        variantStyles[variant],
        { color, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
// base styles having line Heights was causing issues with the spacing between the lines
// so we are not using it for now

// const styles = StyleSheet.create({
//   base: {
//     lineHeight: typography.lineHeights.normal,
//   },
// });
