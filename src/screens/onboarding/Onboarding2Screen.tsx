// src/screens/onboarding/Onboarding2Screen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  LayoutRectangle,
  Dimensions,
  Platform,
} from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { figma, getScreenDimensions } from '../../utils/px';
import { Onboarding2ScreenProps } from '../../navigation/types';
import { getFontSize, getLineHeight, getPlatformShadow } from '../../utils/platformStyles';

const { width: screenWidth } = Dimensions.get('window');

const ONBOARDING2_IMAGE = require('../../../assets/images/onboarding2image.png');
const ARTWORK_IMAGE = require('../../../assets/images/Artwork.png');
const OBJECT_IMAGE = require('../../../assets/images/Object.png');
const BRUSH = require('../../../assets/images/brush.png');

export const Onboarding2Screen: React.FC<Onboarding2ScreenProps> = ({
  navigation,
}) => {
  const { height } = getScreenDimensions();
  const [careGuidesBox, setCareGuidesBox] = useState<LayoutRectangle | null>(null);

  const handleContinue = () => {
    navigation.navigate('Paywall');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={colors.background}
        translucent={Platform.OS === 'android'}
      />
      
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.titleWrap}>
            <View style={styles.titleLines}>
              <Typography style={[styles.titleTextMedium, styles.z1]}>Get plant </Typography>
              <Typography
                style={[styles.titleTextBold, styles.z1]}
                onLayout={(e) => setCareGuidesBox(e.nativeEvent.layout)}
              >
                care guides
              </Typography>
            </View>

            {careGuidesBox && (
              <View
                style={[
                  styles.brushWrapper,
                  {
                    left: careGuidesBox.x,
                    top: careGuidesBox.y + careGuidesBox.height + 2,
                    width: careGuidesBox.width + 10,
                  },
                ]}
                pointerEvents="none"
              >
                <Image source={BRUSH} style={styles.brushImage} resizeMode="stretch" />
              </View>
            )}
          </View>
        </View>

        <View style={styles.imageSection}>
          <View style={styles.phoneContainer}>
            <Image
              source={ONBOARDING2_IMAGE}
              style={styles.phoneImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.orangeCircleContainer}>
            <Image
              source={OBJECT_IMAGE}
              style={styles.orangeCircleImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.purpleCircleContainer}>
            <Image
              source={ARTWORK_IMAGE}
              style={styles.purpleCircleImage}
              resizeMode="contain"
            />
          </View>
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
            <View style={styles.inactiveDot} />
            <View style={styles.activeDot} />
            <View style={styles.inactiveDot} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: figma.spacing(spacing.xl),
  },
  
headerSection: {
  paddingTop: Platform.OS === 'android' ? 40 : 40,
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
  
  titleTextMedium: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Medium' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
    fontSize: getFontSize(30),
    lineHeight: getLineHeight(30, 1.1),
    letterSpacing: -1,
    color: colors.textPrimary,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    includeFontPadding: false,
  },
  
  titleTextBold: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-ExtraBold' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '800' : undefined,
    fontSize: getFontSize(30),
    lineHeight: getLineHeight(30, 1.1),
    letterSpacing: -1,
    color: colors.textPrimary,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    includeFontPadding: false,
  },
  
  brushWrapper: {
    position: 'absolute',
    height: Platform.OS === 'android' ? 12 : 14,
    zIndex: 0,
    ...getPlatformShadow(2),
  },
  
  brushImage: {
    width: '100%',
    height: '100%',
  },
  
  imageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: Platform.OS === 'android' ? 30 : 40,
  },
  
  phoneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginBottom: Platform.OS === 'android' ? -75 : -158,
  },
  
phoneImage: {
  width: Platform.OS === 'android' ? screenWidth * 0.72 : screenWidth * 0.72,
  height: Platform.OS === 'android' ? 
    (screenWidth * 0.72) * 1.95 : 
    (screenWidth * 0.72) * 1.8,
  maxWidth: Platform.OS === 'android' ? 340 : 340,
  maxHeight: Platform.OS === 'android' ? 640 : 620,
  transform: [{ translateY: Platform.OS === 'android' ? 20 : 8 }],
},
  
purpleCircleContainer: {
  position: 'absolute',
  top: Platform.OS === 'android' ? '-8%' : '-15%',
  right: Platform.OS === 'android' ? '-5%' : '-5%',
  zIndex: 2,
},
  
purpleCircleImage: {
  width: Platform.OS === 'android' ? 440 : 420,
  height: Platform.OS === 'android' ? 440 : 420,
},
  
  orangeCircleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  
  orangeCircleImage: {
    width: '100%',
    height: '100%',
    transform: [
      { rotate: '-73.6deg' },
      { scale: Platform.OS === 'android' ? 1.15 : 1.25 }
    ],
  },
  
  bottomSection: {
    paddingBottom: figma.spacing(spacing['2xl']),
    zIndex: 2,
    elevation: 2,
  },
  
  continueButton: {
    marginBottom: figma.spacing(spacing.xl),
    ...getPlatformShadow(4),
  },
  
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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