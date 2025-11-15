import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors, typography } from '@theme/index';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'caption';
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = colors.textPrimary,
  align = 'left',
  children,
  style,
}) => {
  const variantStyles = {
    h1: { fontSize: typography.fontSizes.xxxl, fontWeight: typography.fontWeights.bold, lineHeight: typography.fontSizes.xxxl * typography.lineHeights.normal },
    h2: { fontSize: typography.fontSizes.xxl, fontWeight: typography.fontWeights.bold, lineHeight: typography.fontSizes.xxl * typography.lineHeights.normal },
    h3: { fontSize: typography.fontSizes.xl, fontWeight: typography.fontWeights.semibold, lineHeight: typography.fontSizes.xl * typography.lineHeights.normal },
    h4: { fontSize: typography.fontSizes.lg, fontWeight: typography.fontWeights.semibold, lineHeight: typography.fontSizes.lg * typography.lineHeights.normal },
    body1: { fontSize: typography.fontSizes.md, fontWeight: typography.fontWeights.regular, lineHeight: typography.fontSizes.md * typography.lineHeights.normal },
    body2: { fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.regular, lineHeight: typography.fontSizes.sm * typography.lineHeights.normal },
    caption: { fontSize: typography.fontSizes.xs, fontWeight: typography.fontWeights.regular, lineHeight: typography.fontSizes.xs * typography.lineHeights.normal },
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
    // Removed lineHeight from base, handled per variant
  },
});

