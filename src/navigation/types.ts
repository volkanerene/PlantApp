// src/navigation/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Onboarding Stack Parameters
export type OnboardingStackParamList = {
  GetStarted: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Paywall: undefined;
};

// Main Tab Parameters
export type MainTabParamList = {
  Home: undefined;
  Diagnose: undefined;
  Scan: undefined;
  MyGarden: undefined;
  Profile: undefined;
};

// Root Stack Parameters
export type RootStackParamList = {
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Paywall: undefined;
  Category: { id: number; slug: string; title: string };
  ArticleWeb: { url: string; title: string };
};

// Screen Props Types
export type OnboardingStackScreenProps<T extends keyof OnboardingStackParamList> = 
  NativeStackScreenProps<OnboardingStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = 
  BottomTabScreenProps<MainTabParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

// Individual Screen Props
export type GetStartedScreenProps = OnboardingStackScreenProps<'GetStarted'>;
export type Onboarding1ScreenProps = OnboardingStackScreenProps<'Onboarding1'>;
export type Onboarding2ScreenProps = OnboardingStackScreenProps<'Onboarding2'>;
export type PaywallScreenProps = OnboardingStackScreenProps<'Paywall'>;

export type HomeScreenProps = MainTabScreenProps<'Home'>;
export type DiagnoseScreenProps = MainTabScreenProps<'Diagnose'>;
export type ScanScreenProps = MainTabScreenProps<'Scan'>;
export type MyGardenScreenProps = MainTabScreenProps<'MyGarden'>;
export type ProfileScreenProps = MainTabScreenProps<'Profile'>;

export type CategoryScreenProps   = RootStackScreenProps<'Category'>;
export type ArticleWebScreenProps = RootStackScreenProps<'ArticleWeb'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}