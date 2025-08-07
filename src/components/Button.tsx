// src/components/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Typography } from './Typography';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius, dimensions } from '../theme/spacing';
import { shadows } from '../theme/shadows';
import { figma } from '../utils/px';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'large',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  onPress,
  ...props
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textVariant = size === 'large' ? 'buttonLarge' : 'button';
  const textColor = getTextColor(variant, disabled);

  const handlePress = (event: any) => {
    if (!loading && !disabled && onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessible={true}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={textColor}
          size="small"
        />
      ) : (
        <>
          {leftIcon}
          <Typography
            style={[
              textVariant === 'buttonLarge' ? typography.styles.buttonLarge : typography.styles.button,
              { color: colors[textColor as keyof typeof colors] },
              textStyle
            ]}
          >
            {title}
          </Typography>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const getTextColor = (variant: ButtonVariant, disabled: boolean): keyof typeof colors => {
  if (disabled) return 'textSecondary';
  
  switch (variant) {
    case 'primary':
      return 'textLight';
    case 'secondary':
      return 'textPrimary';
    case 'outline':
      return 'primary';
    case 'ghost':
      return 'textPrimary';
    default:
      return 'textLight';
  }
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: figma.borderRadius(borderRadius.xl),
    paddingHorizontal: figma.spacing(spacing.xl),
    ...shadows.button,
  },
  
  primary: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  
  secondary: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  
  small: {
    height: figma.height(dimensions.buttonHeight.small),
    paddingHorizontal: figma.spacing(spacing.m),
  },
  
  medium: {
    height: figma.height(dimensions.buttonHeight.medium),
    paddingHorizontal: figma.spacing(spacing.l),
  },
  
  large: {
    height: figma.height(dimensions.buttonHeight.large),
    paddingHorizontal: figma.spacing(spacing.xl),
  },
  
  disabled: {
    opacity: 0.5,
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.border,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  text: {
    marginHorizontal: figma.spacing(spacing.s),
  },
});