

// src/screens/onboarding/GetStartedScreen.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Linking,
  SafeAreaView,
  Platform
} from 'react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { figma, getScreenDimensions } from '../../utils/px';
import { GetStartedScreenProps } from '../../navigation/types';
import { getFontSize, getLineHeight, getPlatformShadow } from '../../utils/platformStyles';
import LinearGradient from 'react-native-linear-gradient';

const FRAME_IMAGE = require('../../../assets/images/getstartedframe.png');

export const GetStartedScreen: React.FC<GetStartedScreenProps> = ({
  navigation,
}) => {
  const { height } = getScreenDimensions();

  const handleGetStarted = () => {
    navigation.navigate('Onboarding1');
  };

  const handleTermsPress = () => {
    Linking.openURL('https://example.com/terms').catch(() => {
      console.warn('Failed to open Terms of Use');
    });
  };

  const handlePrivacyPress = () => {
    Linking.openURL('https://example.com/privacy').catch(() => {
      console.warn('Failed to open Privacy Policy');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={colors.background} 
        translucent={Platform.OS === 'android'}
      />
      
      <View style={styles.content}>
        {/* Background gradients */}
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(11,183,240,0.35)', 'transparent']}
          start={{x: 0.2, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.topRightBlue}
        />

        <LinearGradient
          pointerEvents="none"
          colors={['rgba(173,216,230,0.18)', 'transparent']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.leftBlue}
        />

        <View style={styles.headerSection}>
          <View style={styles.titleContainer}>
            <Typography style={styles.welcomeText}>
              Welcome to
            </Typography>
            <Typography style={styles.appNameText}>
              PlantApp
            </Typography>
          </View>
          
          <Typography style={styles.subtitleText}>
            Identify more than 3000+ plants and{'\n'}88% accuracy.
          </Typography>
        </View>

        <View style={styles.imageSection}>
          <Image
            source={FRAME_IMAGE}
            style={styles.plantImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonSection}>
          <Button
            title="Get Started"
            variant="primary"
            size="large"
            fullWidth
            onPress={handleGetStarted}
            style={styles.getStartedButton}
          />
          
          <View style={styles.termsContainer}>
            <Typography style={styles.termsText}>
              By tapping next, you are agreeing to PlantID{'\n'}.
              <Typography style={styles.linkText} onPress={handleTermsPress}>
                Terms of Use
              </Typography>
              {' & '}
              <Typography style={styles.linkText} onPress={handlePrivacyPress}>
                Privacy Policy
              </Typography>
              .
            </Typography>
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
    paddingTop: Platform.OS === 'android' ? 20 : 12,
    marginBottom: figma.spacing(spacing.l),
  },
  
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    marginBottom: figma.spacing(spacing.s),
  },
  
  welcomeText: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Regular' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '400' : undefined,
    fontSize: getFontSize(28),
    lineHeight: getLineHeight(28, 1.21),
    letterSpacing: 0.07,
    color: '#13231B',
    includeFontPadding: false,
  },
  
  appNameText: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-SemiBold' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '600' : undefined,
    fontSize: getFontSize(28),
    lineHeight: getLineHeight(28, 1.21),
    letterSpacing: 0.07,
    color: '#13231B',
    marginLeft: figma.spacing(spacing.s),
    includeFontPadding: false,
  },

  subtitleText: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Regular' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '400' : undefined,
    fontSize: getFontSize(16),
    letterSpacing: 0.07,
    lineHeight: getLineHeight(16, 1.375),
    color: 'rgba(19, 35, 27, 0.7)',
    textAlign: 'left',
    marginBottom: figma.spacing(spacing.l),
    includeFontPadding: false,
  },

  imageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: figma.spacing(spacing.xl),
    maxHeight: Platform.OS === 'android' ? 550 : 600,
  },
  
  plantImage: {
    marginTop: Platform.OS === 'android' ? 40 : 53,
    marginRight: Platform.OS === 'android' ? 50 : 63,
    maxWidth: Platform.OS === 'android' ? 580 : 620,
    maxHeight: Platform.OS === 'android' ? 700 : 750,
  },
  
  topRightBlue: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -30 : -40,
    right: Platform.OS === 'android' ? -20 : -30,
    width: Platform.OS === 'android' ? 260 : 280,
    height: Platform.OS === 'android' ? 260 : 280,
    opacity: 0.22,
    transform: [{ rotate: '12deg' }],
    zIndex: -1,
  },

  leftBlue: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 100 : 120,
    left: Platform.OS === 'android' ? -50 : -60,
    width: Platform.OS === 'android' ? 220 : 240,
    height: Platform.OS === 'android' ? 240 : 260,
    opacity: 0.14,
    transform: [{ rotate: '-8deg' }],
    zIndex: -1,
  },
  
  buttonSection: {
    paddingBottom: figma.spacing(spacing.xl),
    paddingTop: figma.spacing(spacing.m),
  },
  
  getStartedButton: {
    marginBottom: 17,
    ...getPlatformShadow(4),
  },
  
  termsContainer: {
    paddingHorizontal: figma.spacing(spacing.m),
    marginTop: figma.spacing(spacing.s),
    alignItems: 'center',
  },
  
  termsText: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Regular' : 'Rubik',
    fontSize: getFontSize(11),
    lineHeight: getLineHeight(11, 1.36),
    letterSpacing: 0.07,
    color: 'rgba(89, 113, 101, 0.7)',
    textAlign: 'center',
    includeFontPadding: false,
  },
  
  linkText: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Regular' : 'Rubik',
    fontSize: getFontSize(11),
    letterSpacing: 0.07,
    color: 'rgba(89, 113, 101, 0.7)',
    textDecorationLine: 'underline',
    includeFontPadding: false,
  },
});
