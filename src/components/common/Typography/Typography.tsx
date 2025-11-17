import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

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
    h1: { fontSize: typography.fontSizes.xxxl, fontWeight: typography.fontWeights.bold },
    h2: { fontSize: typography.fontSizes.xxl, fontWeight: typography.fontWeights.bold },
    h3: { fontSize: typography.fontSizes.xl, fontWeight: typography.fontWeights.semibold },
    h4: { fontSize: typography.fontSizes.lg, fontWeight: typography.fontWeights.semibold },
    body1: { fontSize: typography.fontSizes.md, fontWeight: typography.fontWeights.regular },
    body2: { fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.regular },
    caption: { fontSize: typography.fontSizes.xs, fontWeight: typography.fontWeights.regular },
  };

  return (
    <Text
      style={[
        styles.base,
        variantStyles[variant],
        { color, textAlign: align },
        style,
        // Add proper line height using the font size
        { lineHeight: variantStyles[variant].fontSize * typography.lineHeights.normal }
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    lineHeight: typography.fontSizes.md * typography.lineHeights.normal,
  },
});

