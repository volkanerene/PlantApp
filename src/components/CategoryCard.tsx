// src/components/CategoryCard.tsx
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ImageBackground,
  StyleProp, 
  ViewStyle
} from 'react-native';
import { Typography } from './Typography';
import { borderRadius } from '../theme/spacing';
import { figma } from '../utils/px';
import { Category } from '../store/slices/categoriesSlice';

interface CategoryCardProps {
  category: Category;
  onPress?: (category: Category) => void;
  style?: StyleProp<ViewStyle>;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
  style
}) => {
  const handlePress = () => {
    onPress?.(category);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
      accessible={true}
      accessibilityLabel={`Category: ${category.title}`}
      accessibilityRole="button"
    >
      <View style={styles.backgroundContainer}>
          <View style={styles.textContainer}>
    <Typography style={styles.categoryTitle}>{category.title}</Typography>
  </View>
        <View style={styles.gradientBackground} />
        
        <View style={styles.solidBackground} />
        
        <ImageBackground
          source={{ uri: category.image?.url }}
          style={styles.imageBackground}
          imageStyle={styles.image}
          resizeMode="cover"
        >

        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 158,
    height: 152,
    borderRadius: figma.borderRadius(borderRadius.lg),
    overflow: 'hidden',
    marginBottom: 8,
  },
  
  backgroundContainer: {
    flex: 1,
    position: 'relative',
  },
  
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(244, 246, 246, 1)',
    borderWidth: 1,
    borderColor: 'rgba(60, 60, 67, 0.1)',
    borderRadius: figma.borderRadius(borderRadius.lg),
  },
  
  solidBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(244, 246, 246, 1)',
    borderWidth: 0,
    borderColor: 'rgba(41, 187, 137, 0.18)',
    borderRadius: figma.borderRadius(borderRadius.lg),
  },
  
imageBackground: {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 116,
  height: '100%',
},

  
  image: {
    borderTopRightRadius: figma.borderRadius(borderRadius.lg),
    borderBottomRightRadius: figma.borderRadius(borderRadius.lg),
  },
  
textContainer: {
  position: 'absolute',
  top: 12,
  left: 12,
  right: 12,
  zIndex: 2,
},
  
categoryTitle: {
  fontFamily: 'Rubik-Medium',
  fontSize: 16,
  lineHeight: 21,
  color: 'rgba(19, 35, 27, 1)',
},
  
  categorySubtitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(19, 35, 27, 1)',
  },
});