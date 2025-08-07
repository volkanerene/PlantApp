import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import { Typography } from '../../components/Typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { figma } from '../../utils/px';
import { ArticleWebScreenProps } from '../../navigation/types';
import { getFontSize, getLineHeight } from '../../utils/platformStyles';

const backIcon = require('../../../assets/images/back-arrow.png');

export const ArticleWebScreen: React.FC<ArticleWebScreenProps> = ({ navigation, route }) => {
  const { url, title } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Typography style={styles.loadingText}>Loading article...</Typography>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Typography style={styles.errorTitle}>Unable to load article</Typography>
      <Typography style={styles.errorText}>
        Please check your internet connection and try again.
      </Typography>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => navigation.goBack()}
      >
        <Typography style={styles.retryButtonText}>Go Back</Typography>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={colors.background}
        translucent={Platform.OS === 'android'}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          accessible
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        
        <Typography style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Typography>
        
        <View style={styles.headerRight} />
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={renderLoading}
        renderError={renderError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={Platform.OS === 'android'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView HTTP error: ', nativeEvent);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: figma.spacing(spacing.xl),
    paddingVertical: figma.spacing(spacing.m),
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },

  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    width: 18,
    height: 18,
    tintColor: colors.textPrimary,
  },

  headerTitle: {
    flex: 1,
    fontFamily: Platform.OS === 'android' ? 'Rubik-Medium' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(16, 1.25),
    color: colors.textPrimary,
    textAlign: 'center',
    marginHorizontal: figma.spacing(spacing.m),
    includeFontPadding: false,
  },

  headerRight: {
    width: 32,
    height: 32,
  },

  webview: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  loadingText: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Regular' : 'Rubik',
    fontSize: getFontSize(16),
    color: colors.textSecondary,
    marginTop: figma.spacing(spacing.m),
    includeFontPadding: false,
  },

  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: figma.spacing(spacing.xl),
  },

  errorTitle: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Medium' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
    fontSize: getFontSize(18),
    lineHeight: getLineHeight(18, 1.22),
    color: colors.textPrimary,
    marginBottom: figma.spacing(spacing.s),
    textAlign: 'center',
    includeFontPadding: false,
  },

  errorText: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Regular' : 'Rubik',
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(14, 1.29),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: figma.spacing(spacing.l),
    includeFontPadding: false,
  },

  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: figma.spacing(spacing.xl),
    paddingVertical: figma.spacing(spacing.m),
    borderRadius: figma.borderRadius(spacing.m),
  },

  retryButtonText: {
    fontFamily: Platform.OS === 'android' ? 'Rubik-Medium' : 'Rubik',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
    fontSize: getFontSize(16),
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});