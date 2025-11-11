import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors, typography } from '../../../theme';

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
  const lineHeightMultiplier: Record<NonNullable<TypographyProps['variant']>, number> = {
    h1: typography.lineHeights.relaxed,
    h2: typography.lineHeights.relaxed,
    h3: typography.lineHeights.normal,
    h4: typography.lineHeights.normal,
    body1: typography.lineHeights.normal,
    body2: typography.lineHeights.normal,
    caption: typography.lineHeights.tight,
  };

  const variantStyles: Record<NonNullable<TypographyProps['variant']>, TextStyle> = {
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

  const selectedVariantStyle = variantStyles[variant] as TextStyle;
  const computedLineHeight = Math.round(
    selectedVariantStyle.fontSize
      ? selectedVariantStyle.fontSize * lineHeightMultiplier[variant]
      : typography.fontSizes.md * lineHeightMultiplier[variant],
  );

  return (
    <Text
      style={[
        selectedVariantStyle,
        {
          color,
          textAlign: align,
          lineHeight: computedLineHeight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({});

