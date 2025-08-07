// src/utils/px.ts
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;



export const normalize = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


export const normalizeHeight = (size: number): number => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  const newSize = size * scale;
  
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


export const normalizeFont = (size: number): number => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  const minSize = size * 0.85;
  const maxSize = size * 1.15;
  
  return Math.round(
    PixelRatio.roundToNearestPixel(Math.max(minSize, Math.min(maxSize, newSize)))
  );
};

export const getScreenDimensions = () => ({
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallScreen: SCREEN_WIDTH < 375,
  isTablet: SCREEN_WIDTH >= 768,
});


export const figma = {
  spacing: (value: number) => normalize(value),
  
  fontSize: (value: number) => normalizeFont(value),
  
  borderRadius: (value: number) => normalize(value),
  
  width: (value: number) => normalize(value),
  
  height: (value: number) => normalizeHeight(value),
};