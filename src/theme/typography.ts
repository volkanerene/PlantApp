// src/theme/typography.ts
import { TextStyle } from 'react-native';

export const typography = {
  fontFamily: {
    rubikRegular: 'Rubik-Regular', // Genel metinler için
    rubikSemiBold: 'Rubik-SemiBold', // Başlıklar için
    sfProTextBold: 'SF Pro Text', // Button text için
    system: 'System', // Fallback
  },
  
  fontWeight: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semiBold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 15,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 48,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
    auto: 'auto' as const,
  },
  
  styles: {
    // Title - Onboarding başlık
    onboardingTitle: {
      fontFamily: 'Rubik-Regular',
      fontSize: 28,
      lineHeight: 34,
      letterSpacing: 0.07,
      fontWeight: '400' as TextStyle['fontWeight'],
    },
    
    // Headers - Rubik font
    h1: {
      fontSize: 28,
      fontWeight: '700' as TextStyle['fontWeight'],
      lineHeight: 34,
      fontFamily: 'Rubik-SemiBold',
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: 30,
      fontFamily: 'Rubik-SemiBold',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: 26,
      fontFamily: 'Rubik-SemiBold',
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: 24,
      fontFamily: 'Rubik-SemiBold',
    },
    
    
    body: {
      fontSize: 16,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: 22,
      fontFamily: 'Rubik-Regular',
    },
    bodyMedium: {
      fontSize: 16,
      fontWeight: '500' as TextStyle['fontWeight'],
      lineHeight: 22,
      fontFamily: 'Rubik-SemiBold',
    },
    bodySemiBold: {
      fontSize: 16,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: 22,
      fontFamily: 'Rubik-SemiBold',
    },
    
    small: {
      fontSize: 14,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: 20,
      fontFamily: 'Rubik-Regular',
    },
    smallMedium: {
      fontSize: 14,
      fontWeight: '500' as TextStyle['fontWeight'],
      lineHeight: 20,
      fontFamily: 'Rubik-SemiBold',
    },
    smallSemiBold: {
      fontSize: 14,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: 20,
      fontFamily: 'Rubik-SemiBold',
    },
    
    caption: {
      fontSize: 12,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: 16,
      fontFamily: 'Rubik-Regular',
    },
    captionMedium: {
      fontSize: 12,
      fontWeight: '500' as TextStyle['fontWeight'],
      lineHeight: 16,
      fontFamily: 'Rubik-SemiBold',
    },
    
    button: {
      fontSize: 16,
      fontWeight: '700' as TextStyle['fontWeight'],
      lineHeight: 20,
      fontFamily: 'SF Pro Text',
    },
    buttonLarge: {
      fontSize: 15, 
      fontWeight: '700' as TextStyle['fontWeight'],
      lineHeight: 24,
      fontFamily: 'SF Pro Text',
      letterSpacing: -0.24,
    },
  },
} as const;

export type TypographyStyle = keyof typeof typography.styles;