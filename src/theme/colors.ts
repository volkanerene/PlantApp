// src/theme/colors.ts
export const colors = {
  // Primary color
  primary: '#28AF6E',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  
  // Card colors
  card: '#FFFFFF',
  cardDark: '#111517',
  cardBorder: '#E8E8E8',
  
  // Text colors
  textPrimary: '#13231B', // Ana text rengi
  textSecondary: 'rgba(19, 35, 27, 0.7)', // textPrimary'nin 0.7 opacity hali
  textLight: '#FFFFFF', // Button text color
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Icon colors
  iconPrimary: '#13231B', // Ana text ile aynı
  iconSecondary: 'rgba(19, 35, 27, 0.6)',
  iconLight: '#FFFFFF',
  
  // Premium banner
  premiumBanner: '#2D3748',
  premiumText: '#F7FAFC',
  premiumAccent: '#FBD38D',
  
  // Paywall specific
  paywallOverlay: 'rgba(11, 11, 11, 0.8)',
  paywallCard: 'rgba(17, 21, 23, 0.9)',
  
  // Categories
  categoryCard: '#FFFFFF',
  categoryBorder: '#F0F0F0',
  
  // Search
  searchBackground: '#F5F5F5',
  searchPlaceholder: 'rgba(19, 35, 27, 0.4)',
  
  // Dots
  dotActive: '#13231B', // rgba(19, 35, 27, 1)
  dotInactive: 'rgba(19, 35, 27, 0.25)', // rgba(19, 35, 27, 0.25)
} as const;

export type ColorKey = keyof typeof colors;