// src/theme/shadows.ts
import { Platform, ViewStyle } from 'react-native';

const createShadow = (
  elevation: number,
  shadowColor: string = '#000000',
  shadowOpacity: number = 0.1,
  shadowRadius: number = 8,
  shadowOffsetWidth: number = 0,
  shadowOffsetHeight: number = 4,
): ViewStyle => {
  if (Platform.OS === 'android') {
    return {
      elevation,
    };
  }
  
  return {
    shadowColor,
    shadowOpacity,
    shadowRadius,
    shadowOffset: {
      width: shadowOffsetWidth,
      height: shadowOffsetHeight,
    },
  };
};

const createFigmaShadow = (): ViewStyle => {
  if (Platform.OS === 'android') {
    return {
      elevation: 8,
    };
  }
  
  return {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 12,
    },
  };
};

export const shadows = {
  none: {},
  
  small: createShadow(2, '#000000', 0.05, 4, 0, 2),
  
  medium: createShadow(4, '#000000', 0.1, 8, 0, 4),
  
  large: createShadow(8, '#000000', 0.15, 16, 0, 8),
  
  xl: createShadow(12, '#000000', 0.2, 24, 0, 12),
  
  card: createShadow(3, '#000000', 0.08, 6, 0, 3),
  
  button: createShadow(2, '#000000', 0.12, 4, 0, 2),
  
  modal: createShadow(20, '#000000', 0.25, 40, 0, 20),
  
  categoryCard: createShadow(2, '#000000', 0.06, 8, 0, 2),
  
  articleCard: createShadow(4, '#000000', 0.1, 12, 0, 4),
  
  premiumBanner: createShadow(6, '#000000', 0.15, 16, 0, 6),
  
  paywall: createShadow(8, '#000000', 0.2, 20, 0, 8),
  
  // (Onboarding için)
  phone: createFigmaShadow(),
  
  // Blur shadow (plant altındaki shadow)
  plantShadow: Platform.OS === 'android' 
    ? { elevation: 4 }
    : {
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 60,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
} as const;

export type ShadowKey = keyof typeof shadows;