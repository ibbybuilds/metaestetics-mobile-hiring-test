import React from 'react';
import { Text, TextStyle, StyleSheet, StyleProp } from 'react-native';
import { colors, typography } from '@theme';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'caption';
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

type TypographyVariant = NonNullable<TypographyProps['variant']>;

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = colors.textPrimary,
  align = 'left',
  children,
  style,
}) => {
  const variantStyles: Record<TypographyVariant, TextStyle> = {
    h1: {
      fontSize: typography.fontSizes.xxxl,
      fontWeight: typography.fontWeights.bold,
      lineHeight: typography.lineHeights.h1,
    },
    h2: {
      fontSize: typography.fontSizes.xxl,
      fontWeight: typography.fontWeights.bold,
      lineHeight: typography.lineHeights.h2,
    },
    h3: {
      fontSize: typography.fontSizes.xl,
      fontWeight: typography.fontWeights.semibold,
      lineHeight: typography.lineHeights.h3,
    },
    h4: {
      fontSize: typography.fontSizes.lg,
      fontWeight: typography.fontWeights.semibold,
      lineHeight: typography.lineHeights.h4,
    },
    body1: {
      fontSize: typography.fontSizes.md,
      fontWeight: typography.fontWeights.regular,
      lineHeight: typography.lineHeights.body1,
    },
    body2: {
      fontSize: typography.fontSizes.sm,
      fontWeight: typography.fontWeights.regular,
      lineHeight: typography.lineHeights.body2,
    },
    caption: {
      fontSize: typography.fontSizes.xs,
      fontWeight: typography.fontWeights.regular,
      lineHeight: typography.lineHeights.caption,
    },
  };

  return (
    <Text
      style={[
        styles.base,
        variantStyles[variant],
        { color, textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    lineHeight: typography.lineHeights.normal,
  },
});
