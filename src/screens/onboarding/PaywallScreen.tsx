// src/screens/onboarding/PaywallScreen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  Text,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { figma, getScreenDimensions } from '../../utils/px';
import { PaywallScreenProps } from '../../navigation/types';
import { setHasCompletedOnboarding } from '../../store/slices/appSlice';
import { AppDispatch } from '../../store';
import LinearGradient from 'react-native-linear-gradient';
import { getLineHeight } from '../../utils/platformStyles';

// Paywall background image
const PAYWALL_BG_IMAGE = require('../../../assets/images/paywallimage.png');

// Feature icons
const PLANT_CARE_ICON = require('../../../assets/images/plantcareicon.png');
const SCAN_ICON = require('../../../assets/images/scanicon.png');
const SPEEDOMETER_ICON = require('../../../assets/images/speedometer.png');

type SubscriptionPlan = 'monthly' | 'yearly';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  style?: any;
}


const RadioButton = ({ active }: { active: boolean }) => (
  <View style={[
    styles.radioButton, 
    active && styles.radioActive,
    Platform.OS === 'android' && styles.radioButtonAndroid
  ]}>
    {active && <View style={[
      styles.radioDot,
      Platform.OS === 'android' && styles.radioDotAndroid
    ]} />}
  </View>
);
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, subtitle, style }) => (
  <View style={[styles.featureCard, style]}>
    <View style={styles.iconBackground}>
      {icon}
    </View>
    <View style={styles.featureTextContainer}>
      <Typography style={styles.featureTitle}>
        {title}
      </Typography>
      <Typography style={styles.featureSubtitle}>
        {subtitle}
      </Typography>
    </View>
  </View>
);

export const PaywallScreen: React.FC<PaywallScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('yearly');

const handleClose = () => {
  dispatch(setHasCompletedOnboarding(true));
  if (navigation.canGoBack()) {
    navigation.goBack(); // Eğer main app'ten gelindiyse
  }
};

  const handleTryFree = () => {
    console.log('Try free subscription initiated for plan:', selectedPlan);
    handleClose();
  };

  const handleTermsPress = () => {
    Linking.openURL('https://example.com/terms').catch(() => {
      console.warn('Failed to open Terms');
    });
  };

  const handlePrivacyPress = () => {
    Linking.openURL('https://example.com/privacy').catch(() => {
      console.warn('Failed to open Privacy');
    });
  };

  const handleRestorePress = () => {
    console.log('Restore purchases');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground
        source={PAYWALL_BG_IMAGE}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={{ height: getScreenDimensions().height * 0.6 }}
      >
        {/* Dark overlay */}
        <View style={styles.overlay} />

        <SafeAreaView style={styles.safeArea}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Typography style={styles.closeButtonText}>✕</Typography>
          </TouchableOpacity>

          <View style={styles.mainContent}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <Typography style={styles.titlePlantApp}>PlantApp</Typography>
                <Typography style={styles.titlePremium}> Premium</Typography>
              </View>
              <Typography style={styles.subtitle}>
                Access All Features
              </Typography>
            </View>

            {/* Features */}
            <View style={styles.featuresSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuresContainer}
              >
                <FeatureCard
                  icon={
                    <Image
                      source={SCAN_ICON}
                      style={styles.iconImage}
                      resizeMode="contain"
                    />
                  }
                  title="Unlimited"
                  subtitle="Plant Identify"
                  style={styles.feature1}
                />
                <FeatureCard
                  icon={
                    <Image
                      source={SPEEDOMETER_ICON}
                      style={styles.iconImage}
                      resizeMode="contain"
                    />
                  }
                  title="Faster"
                  subtitle="Process"
                  style={styles.feature2}
                />
<FeatureCard
  icon={
    <Image
      source={PLANT_CARE_ICON}
      style={[styles.iconImage, styles.iconImageNoTint]}
      resizeMode="contain"
    />
  }
  title="Detailed"
  subtitle="Plant care"
  style={styles.feature3}
/>
              </ScrollView>
            </View>

            {/* Bottom content area */}
            <View style={styles.bottomContent}>
              {/* Subscription Plans */}
              <View style={styles.plansContainer}>
                {/* Monthly Plan */}
                <TouchableOpacity
                  style={[
                    styles.planCard,
                    styles.monthlyPlan,
                    selectedPlan === 'monthly' && styles.selectedPlan,
                  ]}
                  onPress={() => setSelectedPlan('monthly')}
                  accessible={true}
                  accessibilityLabel="Monthly plan: $2.99 per month"
                  accessibilityRole="button"
                >
                  <View style={styles.monthlyPlanContent}>
<RadioButton active={selectedPlan === 'monthly'} />

                    <View style={styles.planInfo}>
                      <Typography style={styles.planTitle}>1 Month</Typography>
                      <Typography style={styles.planSubtitle}>
                        $2.99/month, auto renewable
                      </Typography>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Yearly Plan */}
                <TouchableOpacity
                  style={[
                    styles.planCard,
                    styles.yearlyPlan,
                    selectedPlan === 'yearly' && styles.selectedPlan,
                  ]}
                  onPress={() => setSelectedPlan('yearly')}
                  accessible={true}
                  accessibilityLabel="Yearly plan: First 3 days free, then $529.99 per year"
                  accessibilityRole="button"
                >
    <LinearGradient
      colors={['rgba(40,175,110,0.24)', 'rgba(40,175,110,0)']}
      start={{x: 1, y: 1}}
      end={{x: 0.3, y: 0.5}}
      style={styles.yearlyPlanGradient}
      pointerEvents="none"
    >
                  {/* Save badge */}
                  <View style={styles.saveBadge}>
                    <Typography style={styles.saveText}>Save 50%</Typography>
                  </View>
                  
                  <View style={styles.yearlyPlanContent}>
<RadioButton active={selectedPlan === 'yearly'} />
                    <View style={styles.planInfo}>
                      <Typography style={styles.planTitleYearly}>1 Year</Typography>
                      <Typography style={styles.planSubtitleYearly}>
                        First 3 days free, then $529,99/year
                      </Typography>
                    </View>
                  </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* CTA Button */}
              <Button
                title="Try free for 3 days"
                variant="primary"
                size="large"
                fullWidth
                onPress={handleTryFree}
                style={styles.ctaButton}
              />

              {/* Footer Text */}
<Typography style={styles.footerText}>
  After the 3-day free trial period you’ll be charged ₺274.99 per year
  unless you cancel before the trial expires. Yearly Subscription is
  Auto-Renewable
</Typography>


              {/* Footer Links */}
<Typography style={styles.footerLinks}>
  <Text onPress={handleTermsPress}>Terms</Text>
  <Text style={styles.bullet}>  •  </Text>
  <Text onPress={handlePrivacyPress}>Privacy</Text>
  <Text style={styles.bullet}>  •  </Text>
  <Text onPress={handleRestorePress}
  >Restore</Text>
</Typography>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(16, 30, 23)',
  },
  
  backgroundImage: {
    flex: 1,
  },
  
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  
  safeArea: {
    flex: 1,
  },
  
  closeButton: {
    position: 'absolute',
    top: 55,
    right: 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'SF Pro Text',
    fontWeight: '600',
  },
  
  mainContent: {
    flex: 1,
    paddingHorizontal: figma.spacing(spacing.xl),
  },
  
header: {
  position: 'absolute',
  top: Platform.OS === 'android' ? 378 : 280, // android'de biraz daha aşağı
  left: figma.spacing(spacing.xl),
  right: figma.spacing(spacing.xl),
  overflow: 'visible',
},
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 0,
  },
  
  titlePlantApp: {
    fontFamily: 'VisbyBold',
    fontSize: 28,
    lineHeight: 34, 
    color: '#FFFFFF',
  },
  
  titlePremium: {
    fontFamily: 'VisbyLight',
    fontSize: 28,
    lineHeight: 34,
    color: '#FFFFFF',
  },
  
  subtitle: {
    fontFamily: 'Rubik-Light',
    fontSize: 17,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 0,
  },
  
featuresSection: {
  position: 'absolute',
  top: Platform.OS === 'android' ? 470 : 362, // android'de biraz daha aşağı
  left: 0,
  right: 0,
},
yearlyPlanGradient: {

  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'rgba(40,175,110,1)',
  borderRadius: figma.borderRadius(borderRadius.xl),
  height: 61.5,
  width: 367.5,
  elevation: 5,
},
  
  featuresContainer: {
    paddingHorizontal: figma.spacing(spacing.xl),
    flexDirection: 'row',
    gap: 8,
  },
  
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: figma.borderRadius(borderRadius.xl),
    padding: figma.spacing(spacing.m),
  },
  
  feature1: {
    width: 156,
    height: 130,
  },
  
  feature2: {
    width: 156,
    height: 130,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  
  feature3: {
    width: 156,
    height: 130,
  },
  
  iconBackground: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: figma.spacing(spacing.m),
  },
  
iconImage: {
  width: 20,
  height: 20,
  tintColor: 'rgba(255, 255, 255, 0.8)',
},
iconImageNoTint: {
  tintColor: undefined,
},
  
  featureTextContainer: {
    gap: 4,
  },
  
  featureTitle: {
    fontFamily: 'Rubik-Medium',
    fontSize: 20,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 1)',
  },
  
  featureSubtitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: figma.spacing(spacing.xl),
    paddingBottom: 40,
  },
  
plansContainer: {
  marginTop: 8,
  marginBottom: figma.spacing(spacing.xl),
  gap: 12,      
},
  
  planCard: {
    borderRadius: figma.borderRadius(borderRadius.xl),
    padding: 0,
    position: 'relative',
  },
  
  monthlyPlan: {
    width: 367.5,
    height: 60.5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 80,
    elevation: 5,
  },
  
  monthlyPlanContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  
  yearlyPlan: {
alignSelf: 'center',
  },
  
  yearlyPlanContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 12,
  },
  
  selectedPlan: {
    borderColor: colors.primary,
  },
  
radioButton: {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.15)',
  backgroundColor: 'rgba(255,255,255,0.08)',
  justifyContent: 'center',
  alignItems: 'center',
},
radioActive: {
  borderColor: '#28AF6E',
  backgroundColor: '#28AF6E',
},
radioDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#FFFFFF',
},
  
  planInfo: {
    flex: 1,
  },
  
  planTitle: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
  
  planTitleYearly: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
  
  planSubtitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  
  planSubtitleYearly: {
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  
  saveBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 77,
    height: 26,
    backgroundColor: 'rgba(40, 175, 110, 1)',
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  
  saveText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 1)',
  },
  
  ctaButton: {
    height: 52,
    marginBottom: figma.spacing(spacing.s),
  },
footerText: {
  fontFamily: 'Rubik-Light',
  fontSize: 9,
  lineHeight: 9 * 1.32,
  color: 'rgba(255,255,255,0.52)',
  textAlign: 'center',
  marginTop: 12,
  marginBottom: 8,
  paddingHorizontal: figma.spacing(spacing.s),
},
  
footerLinks: {
  fontFamily: 'Rubik-Regular',
  fontSize: 11,
  color: 'rgba(255,255,255,0.5)',
  textAlign: 'center',
},

bullet: {
  color: 'rgba(255,255,255,0.5)',
},
  
  linkSeparator: {
    fontFamily: 'Rubik-Regular',
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  radioButtonAndroid: {
    borderWidth: 1.5,
  },
  
  radioDotAndroid: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  monthlyPlanAndroid: {
    width: 350,
    height: 58,
  },
  
  yearlyPlanAndroid: {
    width: 350,
    height: 59,
  },
  footerTextAndroid: {
    lineHeight: getLineHeight(9, 1.4),
    paddingHorizontal: 8,
  },
});