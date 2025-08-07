// src/screens/onboarding/Onboarding1Screen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  LayoutRectangle,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { figma } from '../../utils/px';
import { Onboarding1ScreenProps } from '../../navigation/types';
import { getFontSize, getLineHeight, getPlatformShadow } from '../../utils/platformStyles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const FRAME_IMAGE = require('../../../assets/images/onboardingimage.png');
const BRUSH = require('../../../assets/images/brush.png');
const BACKGROUND_IMAGE = require('../../../assets/images/Background.png');

export const Onboarding1Screen: React.FC<Onboarding1ScreenProps> = ({ navigation }) => {
  const [identifyBox, setIdentifyBox] = useState<LayoutRectangle | null>(null);

  const handleContinue = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={BACKGROUND_IMAGE}
        style={styles.bg}
        imageStyle={styles.bgImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <StatusBar 
            barStyle="dark-content" 
            backgroundColor="transparent" 
            translucent 
          />

          <View style={styles.content}>
            <View style={styles.headerSection}>
              <View style={styles.titleWrap}>
                <View style={styles.titleLines}>
                  <Typography style={[styles.titleText, styles.z1]}>Take a photo to </Typography>
                  <Typography
                    style={[styles.titleIdentify, styles.z1]}
                    onLayout={(e) => setIdentifyBox(e.nativeEvent.layout)}
                  >
                    identify
                  </Typography>
                </View>
                <Typography style={[styles.titleText, styles.z1]}>the plant!</Typography>

                {identifyBox && (
                  <Image
                    source={BRUSH}
                    resizeMode="stretch"
                    style={[
                      styles.brush,
                      {
                        left: identifyBox.x,
                        top: identifyBox.y + identifyBox.height,
                        width: identifyBox.width + 8,
                      },
                    ]}
                  />
                )}
              </View>
            </View>

            <View style={styles.imageSection}>
                <Image 
                  source={FRAME_IMAGE} 
                  style={styles.plantImage} 
                  resizeMode="contain"
                  onError={(error) => {
                    console.log('Görsel yükleme hatası:', error.nativeEvent.error);
                  }}
                  onLoad={() => {
                    console.log('Görsel başarıyla yüklendi');
                  }}
                />
            </View>

            <View style={styles.bottomSection}>
              <Button
                title="Continue"
                variant="primary"
                size="large"
                fullWidth
                onPress={handleContinue}
                style={styles.continueButton}
              />
              <View style={styles.dotsContainer}>
                <View style={styles.activeDot} />
                <View style={styles.inactiveDot} />
                <View style={styles.inactiveDot} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { 
    flex: 1,
  },
  bg: { 
    flex: 1,
  },
  bgImage: { 
    width: '100%', 
    height: '100%',
  },

  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  content: {
    flex: 1,
    paddingHorizontal: figma.spacing(spacing.xl),
  },

  headerSection: {
    paddingTop: Platform.OS === 'android' ? 35 : 19,
    marginBottom: figma.spacing(spacing.xl),
  },
  
  titleWrap: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  
  titleLines: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  z1: { 
    zIndex: 1,
    elevation: 1,
  },
  
  titleText: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Medium' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
    fontSize: getFontSize(30),
    lineHeight: getLineHeight(30, 1.1),
    letterSpacing: -1,
    color: colors.textPrimary,
    includeFontPadding: false,
  },
  
  titleIdentify: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-ExtraBold' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '800' : undefined,
    fontSize: getFontSize(30),
    lineHeight: getLineHeight(30, 1.1),
    letterSpacing: -1,
    color: colors.textPrimary,
    includeFontPadding: false,
  },
  
  brush: {
    position: 'absolute',
    height: Platform.OS === 'android' ? 10 : 12,
    zIndex: 0,
    elevation: 0,
  },

  imageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: figma.spacing(spacing['8xl']),
    minHeight: Platform.OS === 'android' ? 180 : 200,
  },

  plantImage: {
    width: Platform.OS === 'android' ? screenWidth * 1.35 : screenWidth * 1.45,
    height: Platform.OS === 'android' ? 
      (screenWidth * 1.35) * (2985 / 942) : 
      (screenWidth * 1.8) * (2985 / 942),
    maxWidth: Platform.OS === 'android' ? 1800 : 1900,
    maxHeight: Platform.OS === 'android' ? 1890 : 1990,
  },

  bottomSection: {
    paddingBottom: figma.spacing(spacing['2xl']),
  },
  
  continueButton: {
    marginBottom: 0,
    ...getPlatformShadow(4),
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: figma.spacing(spacing.l),
  },
  
  activeDot: {
    width: Platform.OS === 'android' ? 9 : 10,
    height: Platform.OS === 'android' ? 9 : 10,
    borderRadius: Platform.OS === 'android' ? 4.5 : 5,
    backgroundColor: colors.dotActive,
  },
  
  inactiveDot: {
    width: Platform.OS === 'android' ? 5 : 6,
    height: Platform.OS === 'android' ? 5 : 6,
    borderRadius: Platform.OS === 'android' ? 2.5 : 3,
    backgroundColor: colors.dotInactive,
  },
});
