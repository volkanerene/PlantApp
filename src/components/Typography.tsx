// src/components/Typography.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography, TypographyStyle } from '../theme/typography';

interface TypographyProps extends TextProps {
  variant?: TypographyStyle;
  color?: keyof typeof colors;
  align?: 'left' | 'center' | 'right' | 'justify';
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'textPrimary',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const textStyle = [
    styles.base,
    typography.styles[variant],
    { color: colors[color] },
    { textAlign: align },
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

// Specific typography components for convenience
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const Heading4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h4" {...props} />
);

export const BodyText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const SmallText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="small" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);