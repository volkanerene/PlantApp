// src/theme/spacing.ts
export const spacing = {
  xs: 4,
  s: 8,
  sm: 12,
  m: 16,
  l: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 56,
  '6xl': 64,
  '7xl': 72,
  '8xl': 80,
} as const;

export const borderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

export const dimensions = {
  // Button heights
  buttonHeight: {
    small: 40,
    medium: 48,
    large: 56,
  },
  
  // Input heights
  inputHeight: {
    small: 40,
    medium: 48,
  },
  
  // Header heights
  headerHeight: 60,
  tabBarHeight: 80,
  
  // Card dimensions
  categoryCardHeight: 160,
  articleCardWidth: 240,
  articleCardHeight: 140,
  
  // Icon sizes
  iconSize: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },
} as const;

export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;