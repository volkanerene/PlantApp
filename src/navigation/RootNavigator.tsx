// src/navigation/RootNavigator.tsx
import React from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { colors } from '../theme/colors';
import { spacing, dimensions } from '../theme/spacing';
import { figma } from '../utils/px';
import { Typography } from '../components/Typography';
import { getFontSize, getLineHeight, getPlatformShadow } from '../utils/platformStyles';

import { 
  RootStackParamList, 
  OnboardingStackParamList, 
  MainTabParamList 
} from './types';

import { GetStartedScreen } from '../screens/onboarding/GetStartedScreen';
import { Onboarding1Screen } from '../screens/onboarding/Onboarding1Screen';
import { Onboarding2Screen } from '../screens/onboarding/Onboarding2Screen';
import { PaywallScreen } from '../screens/onboarding/PaywallScreen';

import { HomeScreen } from '../screens/home/HomeScreen';
import { DiagnoseScreen } from '../screens/home/DiagnoseScreen';
import { ScanScreen } from '../screens/home/ScanScreen';
import { MyGardenScreen } from '../screens/home/MyGardenScreen';
import { ProfileScreen } from '../screens/home/ProfileScreen';
import { CategoryScreen } from '../screens/home/CategoryScreen';
import { ArticleWebScreen } from '../screens/home/ArticleWebScreen';

// Assets
const homeIcon      = require('../../assets/images/homeicon.png');
const diagnoseIcon  = require('../../assets/images/diagnoseicon.png');
const scanIcon      = require('../../assets/images/scanicon.png');
const mygardenIcon  = require('../../assets/images/mygardenicon.png');
const profileIcon   = require('../../assets/images/profileicon.png');

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Colors from Figma
const ACTIVE = '#28AF6E';
const INACTIVE = '#BDBDBD';
const DIVIDER = 'rgba(19,35,27,0.10)';

// Tab icon component - Platform düzeltmeleri ile
type ImgTabProps = { focused: boolean; source: any; label: string };
const ImgTab: React.FC<ImgTabProps> = ({ focused, source, label }) => {
  return (
    <View style={styles.tabIcon}>
      <Image
        source={source}
        style={[
          styles.iconImg,
          { tintColor: focused ? ACTIVE : INACTIVE }
        ]}
        resizeMode="contain"
      />
      <Typography
        variant="caption"
        style={[
          styles.tabLabel,
          { color: focused ? ACTIVE : INACTIVE }
        ]}
      >
        {label}
      </Typography>
    </View>
  );
};

// Center Scan button - Platform düzeltmeleri ile
const ScanButton: React.FC<{ focused: boolean }> = ({ focused }) => {
  return (
    <View style={[styles.scanWrapper, focused && styles.scanWrapperFocused]}>
      <Image
        source={scanIcon}
        style={styles.scanImg}
        resizeMode="contain"
      />
    </View>
  );
};

// Onboarding stack
const OnboardingStackNavigator = () => (
  <OnboardingStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
    <OnboardingStack.Screen name="GetStarted" component={GetStartedScreen} />
    <OnboardingStack.Screen name="Onboarding1" component={Onboarding1Screen} />
    <OnboardingStack.Screen name="Onboarding2" component={Onboarding2Screen} />
    <OnboardingStack.Screen name="Paywall" component={PaywallScreen} />
  </OnboardingStack.Navigator>
);

// Main tabs
const MainTabsNavigator = () => (
  <MainTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarShowLabel: false,
    }}
  >
    <MainTab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => <ImgTab focused={focused} source={homeIcon} label="Home" />,
      }}
    />
    <MainTab.Screen
      name="Diagnose"
      component={DiagnoseScreen}
      options={{
        tabBarIcon: ({ focused }) => <ImgTab focused={focused} source={diagnoseIcon} label="Diagnose" />,
      }}
    />
    <MainTab.Screen
      name="Scan"
      component={ScanScreen}
      options={{
        tabBarIcon: ({ focused }) => <ScanButton focused={focused} />,
        tabBarItemStyle: styles.scanTabItem,
      }}
    />
    <MainTab.Screen
      name="MyGarden"
      component={MyGardenScreen}
      options={{
        tabBarIcon: ({ focused }) => <ImgTab focused={focused} source={mygardenIcon} label="My Garden" />,
      }}
    />
    <MainTab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => <ImgTab focused={focused} source={profileIcon} label="Profile" />,
      }}
    />
  </MainTab.Navigator>
);

// Root navigator
export const RootNavigator: React.FC = () => {
  const { hasCompletedOnboarding } = useSelector((state: RootState) => state.app);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
        {hasCompletedOnboarding ? (
          <>
            <RootStack.Screen name="MainTabs" component={MainTabsNavigator} />
            <RootStack.Screen name="Category" component={CategoryScreen} />
            <RootStack.Screen name="ArticleWeb" component={ArticleWebScreen} />
            <RootStack.Screen name="Paywall" component={PaywallScreen} />
          </>
        ) : (
          <RootStack.Screen name="OnboardingStack" component={OnboardingStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Tab bar - Platform düzeltmeleri
  tabBar: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: DIVIDER,
    height: Platform.OS === 'android' ? 80 : 84.5,
    paddingTop: Platform.OS === 'android' ? 6 : 8,
    paddingBottom: Platform.OS === 'android' ? 15 : 18,
    paddingHorizontal: figma.spacing(spacing.m),
    ...getPlatformShadow(8),
  },

  tabIcon: {
    width: Platform.OS === 'android' ? 70 : 73,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconImg: {
    width: Platform.OS === 'android' ? 23 : 25,
    height: Platform.OS === 'android' ? 23 : 25,
    marginBottom: Platform.OS === 'android' ? 4 : 6,
  },

  tabLabel: {
    fontSize: getFontSize(10),
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'Rubik-Regular' : 'Rubik',
    includeFontPadding: false,
  },

  // Scan button - Platform düzeltmeleri
  scanTabItem: {
    top: Platform.OS === 'android' ? -8 : -10,
  },
  
  scanWrapper: {
    width: Platform.OS === 'android' ? 60 : 64,
    height: Platform.OS === 'android' ? 60 : 64,
    borderRadius: Platform.OS === 'android' ? 30 : 32,
    backgroundColor: ACTIVE,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    ...getPlatformShadow(8),
  },
  
  scanWrapperFocused: {
    transform: [{ scale: Platform.OS === 'android' ? 1.02 : 1.04 }],
  },
  
  scanImg: {
    width: Platform.OS === 'android' ? 23 : 25,
    height: Platform.OS === 'android' ? 23 : 25,
    tintColor: '#FFFFFF',
  },
});

export default RootNavigator;