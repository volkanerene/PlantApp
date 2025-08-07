// src/utils/platformStyles.ts
import { Platform, PixelRatio } from 'react-native';

export const getFontSize = (size: number) => {
  if (Platform.OS === 'android') {
    return size * PixelRatio.getFontScale();
  }
  return size;
};

export const getLineHeight = (fontSize: number, multiplier: number = 1.2) => {
  if (Platform.OS === 'android') {
    return Math.round(fontSize * multiplier);
  }
  return fontSize * multiplier;
};



// Platform-specific shadow styles
export const getPlatformShadow = (elevation: number = 4) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: 'rgba(0, 0, 0, 0.25)',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.25,
      shadowRadius: elevation,
    };
  } else {
    return {
      elevation: elevation,
    };
  }
};