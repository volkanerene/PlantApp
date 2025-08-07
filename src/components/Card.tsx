// src/components/Card.tsx
import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { shadows, ShadowKey } from '../theme/shadows';
import { figma } from '../utils/px';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'dark';

interface BaseCardProps {
  variant?: CardVariant;
  shadow?: ShadowKey;
  padding?: keyof typeof spacing;
  margin?: keyof typeof spacing;
  backgroundColor?: keyof typeof colors;
  borderColor?: keyof typeof colors;
  borderWidth?: number;
  borderRadius?: keyof typeof borderRadius;
}

type CardProps = React.PropsWithChildren<BaseCardProps & ViewProps>;
type TouchableCardProps = React.PropsWithChildren<BaseCardProps & TouchableOpacityProps>;

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  shadow = 'card',
  padding = 'm',
  margin,
  backgroundColor,
  borderColor,
  borderWidth,
  borderRadius: radius = 'xl',
  style,
  children,
  ...props
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    shadows[shadow],
    {
      padding: figma.spacing(spacing[padding]),
      borderRadius: figma.borderRadius(borderRadius[radius]),
    },
    backgroundColor && { backgroundColor: colors[backgroundColor] },
    borderColor && { borderColor: colors[borderColor] },
    borderWidth && { borderWidth },
    margin && { margin: figma.spacing(spacing[margin]) },
    style,
  ].filter(s => s != null);

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

export const TouchableCard: React.FC<TouchableCardProps> = ({
  variant = 'default',
  shadow = 'card',
  padding = 'm',
  margin,
  backgroundColor,
  borderColor,
  borderWidth,
  borderRadius: radius = 'xl',
  style,
  children,
  activeOpacity = 0.8,
  ...props
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    shadows[shadow],
    {
      padding: figma.spacing(spacing[padding]),
      borderRadius: figma.borderRadius(borderRadius[radius]),
    },
    backgroundColor && { backgroundColor: colors[backgroundColor] },
    borderColor && { borderColor: colors[borderColor] },
    borderWidth && { borderWidth },
    margin && { margin: figma.spacing(spacing[margin]) },
    style,
  ];

  return (
    <TouchableOpacity
      style={cardStyle}
      activeOpacity={activeOpacity}
      accessible={true}
      accessibilityRole="button"
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.card,
    borderRadius: figma.borderRadius(borderRadius.xl),
  },
  
  default: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  
  elevated: {
    backgroundColor: colors.card,
    borderWidth: 0,
  },
  
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  dark: {
    backgroundColor: colors.cardDark,
    borderWidth: 0,
  },
});