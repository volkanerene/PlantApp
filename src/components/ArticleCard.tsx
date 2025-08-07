import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Linking,
  ViewStyle,
  StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from './Typography';
import { shadows } from '../theme/shadows';
import { Article } from '../store/slices/articlesSlice';

interface ArticleCardProps {
  article: Article;
  onPress?: (article: Article) => void;
  style?: StyleProp<ViewStyle>;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onPress,
  style
}) => {
  const handlePress = async () => {
    if (onPress) {
      onPress(article);
    } else if (article.uri) {
      try {
        await Linking.openURL(article.uri);
      } catch (error) {
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.85}
      accessible
      accessibilityLabel={`Article: ${article.title}`}
      accessibilityRole="button"
    >
      {/* Background image */}
      <Image source={{ uri: article.image_uri }} style={styles.image} resizeMode="cover" />

      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.72)']}
        locations={[0, 1]}
        style={styles.gradient}
      />

      <View style={styles.textBand}>
        <View style={styles.textBandDivider} />
        <View style={styles.textInner}>
          <Typography
            numberOfLines={2}
            style={styles.title}
          >
            {article.title}
          </Typography>

        </View>
      </View>
    </TouchableOpacity>
  );
};

const RADIUS = 16;

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 194,
    marginRight: 12,
    borderRadius: RADIUS,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.articleCard,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  textBand: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  textBandDivider: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  textInner: {
    flex: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Rubik-Medium',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

});

export default ArticleCard;