import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { colors } from '../theme/colors';
import { spacing, dimensions } from '../theme/spacing';
import { figma } from '../utils/px';
import { Typography } from '../components/Typography';

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

// Assets
const homeIcon      = require('../../assets/images/homeicon.png');
const diagnoseIcon  = require('../../assets/images/diagnoseicon.png');
const scanIcon      = require('../../assets/images/scanicon.png');
const mygardenIcon  = require('../../assets/images/mygardenicon.png');
const profileIcon   = require('../../assets/images/profileicon.png');

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Colors
const ACTIVE = '#28AF6E';
const INACTIVE = '#BDBDBD';
const DIVIDER = 'rgba(19,35,27,0.10)';

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
          <RootStack.Screen name="MainTabs" component={MainTabsNavigator} />
        ) : (
          <RootStack.Screen name="OnboardingStack" component={OnboardingStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: DIVIDER,
    height: 84.5,
    paddingTop: 8,
    paddingBottom: 18,
    paddingHorizontal: figma.spacing(spacing.m),
  },

  tabIcon: {
    width: 73,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconImg: {
    width: 25,
    height: 25,
    marginBottom: 6,
  },

  tabLabel: {
    fontSize: 10,
    textAlign: 'center',
  },

  scanTabItem: {
    top: -10,
  },
  scanWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ACTIVE,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },
  scanWrapperFocused: {
    transform: [{ scale: 1.04 }],
  },
  scanImg: {
    width: 25,
    height: 25,
    tintColor: '#FFFFFF',
  },
});

export default RootNavigator;