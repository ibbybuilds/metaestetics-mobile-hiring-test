export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  } as const,
  lineHeights: {
    tight: 18,
    normal: 24,
    relaxed: 28,
    h1: 44,
    h2: 38,
    h3: 32,
    h4: 28,
    body1: 24,
    body2: 20,
    caption: 18,
  } as const,
} as const;
