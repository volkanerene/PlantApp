// src/screens/home/HomeScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '../../components/Typography';
import { CategoryCard } from '../../components/CategoryCard';
import { ArticleCard } from '../../components/ArticleCard';
import {
  Category as CategoryModel,
} from '../../store/slices/categoriesSlice';
import {
  Article as ArticleModel,
} from '../../store/slices/articlesSlice';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { figma } from '../../utils/px';
import { HomeScreenProps } from '../../navigation/types';
import { RootState, AppDispatch } from '../../store';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchArticles } from '../../store/slices/articlesSlice';
import { updateGreeting } from '../../store/slices/appSlice';
import { GradientText } from '../../components/GradientText';

// icons & bg
const mailIcon = require('../../../assets/images/mailicon.png');
const searchIcon = require('../../../assets/images/searchicon.png');
const PAYWALL_BG_IMAGE = require('../../../assets/images/mask.png');

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentGreeting } = useSelector((state: RootState) => state.app);
  const categories = useSelector((s: RootState) => s.categories?.data ?? []);
  const categoriesLoading = useSelector((s: RootState) => s.categories?.loading ?? false);
  const categoriesError = useSelector((s: RootState) => s.categories?.error ?? null);
  const articles = useSelector((s: RootState) => s.articles?.data ?? []);
  const articlesLoading = useSelector((s: RootState) => s.articles?.loading ?? false);
  const articlesError = useSelector((s: RootState) => s.articles?.error ?? null);

  const isLoading = categoriesLoading || articlesLoading;
  const hasError = categoriesError || articlesError;

  useEffect(() => {
    dispatch(updateGreeting());
    if (categories.length === 0) dispatch(fetchCategories());
    if (articles.length === 0) dispatch(fetchArticles());
  }, [dispatch, categories.length, articles.length]);

  const rootNav = navigation.getParent<
    import('@react-navigation/native').NavigationProp<
      import('../../navigation/types').RootStackParamList
    >
  >();

  const handlePremiumBannerPress = () => {
    rootNav?.navigate('Paywall');
  };

  type NavCategory = Pick<CategoryModel, 'id'  |'name'| 'title'>;
  type NavArticle  = Pick<ArticleModel,  'uri' | 'title'>;

  const handleCategoryPress = (c: NavCategory) => {
    rootNav?.navigate('Category', {
      id: c.id,
      slug: c.name,
      title: c.title,
    });
  };

  const handleArticlePress = (a: NavArticle) => {
    rootNav?.navigate('ArticleWeb', {
      url: a.uri,
      title: a.title,
    });
  };

  const renderArticleItem = ({ item }: { item: ArticleModel }) => (
    <ArticleCard
      article={item}
      onPress={handleArticlePress}
      style={styles.articleCard}
    />
  );

  const renderCategoryItem = ({ item, index }: { item: CategoryModel; index: number }) => (
    <CategoryCard
      category={item}
    onPress={handleCategoryPress}
      style={[styles.categoryCard, index % 2 === 1 && styles.categoryCardRight]}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Typography variant="h3" color="textSecondary" align="center" style={styles.emptyTitle}>
        🌱
      </Typography>
      <Typography variant="body" color="textSecondary" align="center" style={styles.emptyText}>
        No content available at the moment.{'\n'}Pull to refresh and try again.
      </Typography>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.emptyState}>
      <Typography variant="h3" color="error" align="center" style={styles.emptyTitle}>
        ⚠️
      </Typography>
      <Typography variant="body" color="error" align="center" style={styles.emptyText}>
        Something went wrong.{'\n'}Pull to refresh to try again.
      </Typography>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}

      >
        <View style={styles.bgOverlay} />
        {/* BG + Overlay */}
        <ImageBackground source={PAYWALL_BG_IMAGE} style={styles.heroBg} resizeMode="cover">


          {/* Header */}
          <View style={styles.header}>
            <Typography style={styles.greeting}>Hi, plant lover!</Typography>
            <Typography style={styles.welcomeText}>{currentGreeting}</Typography>
          </View>

          {/* Search */}
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => console.log('Search pressed')}
            accessible
            accessibilityLabel="Search for plants"
            accessibilityRole="button"
          >
            <View style={styles.searchBar}>
              <Image source={searchIcon} style={styles.searchIcon} />
              <Typography style={styles.searchPlaceholder}>Search for plants</Typography>
            </View>
          </TouchableOpacity>
        </ImageBackground>

        {/* Premium Banner */}
<TouchableOpacity
  style={styles.premiumBanner}
  onPress={handlePremiumBannerPress}
  accessible
  accessibilityLabel="FREE Premium Available - Tap to upgrade your account"
  accessibilityRole="button"
>
  <View style={styles.bannerRow}>
    {/* ICON + BADGE */}
    <View style={styles.bannerIconContainer}>
      <Image source={mailIcon} style={styles.bannerIcon} />
      <View style={styles.notificationBadge}>
        <Typography style={styles.badgeText}>1</Typography>
      </View>
    </View>

<View style={styles.bannerTextBlock}>
  <GradientText
                style={{
                  fontFamily: 'SF Pro Text',
                  fontSize: 16,
                  lineHeight: 21,
                  marginBottom: 2,
                }}   colors={['#FFDE9C', '#F5C25B']}  >
    FREE Premium Available
  </GradientText>

<GradientText
  colors={['#FFDE9C', '#F5C25B']}
  start={{ x: 0, y: 0.5 }}
  end={{ x: 1, y: 0.5 }}
  style={styles.bannerSubtitle}
>
  Tap to upgrade your account!
</GradientText>
</View>

    {/* ARROW */}
    <View style={styles.bannerArrowBox}>
      <Typography style={styles.bannerArrow}>›</Typography>
    </View>
  </View>
</TouchableOpacity>

        {/* Loading */}
        {isLoading && categories.length === 0 && articles.length === 0 && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Typography variant="body" color="textSecondary" style={styles.loadingText}>
              Loading content...
            </Typography>
          </View>
        )}

        {/* Error */}
        {hasError && categories.length === 0 && articles.length === 0 && !isLoading && renderErrorState()}

        {/* Content */}
        {!hasError && (categories.length > 0 || articles.length > 0) && (
          <>
            {articles.length > 0 && (
              <View style={styles.getStartedSection}>
                <Typography style={styles.sectionTitle}>Get Started</Typography>
                <FlatList
                  data={articles.slice(0, 5)}
                  renderItem={renderArticleItem}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.articlesContainer}
                />
              </View>
            )}

            {categories.length > 0 && (
              <View style={styles.categoriesSection}>
                <FlatList<CategoryModel>
                  data={categories}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  scrollEnabled={false}
                  contentContainerStyle={styles.categoriesContainer}
                />
              </View>
            )}
          </>
        )}

        {!hasError && !isLoading && categories.length === 0 && articles.length === 0 && renderEmptyState()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: figma.spacing(spacing['2xl']) },

  heroBg: { width: '100%' },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(246, 246, 246, 0.8)',
  },

  header: {
    marginTop: 20,
    height: 53,
    paddingHorizontal: figma.spacing(spacing.xl),
    justifyContent: 'center',
  },
  greeting: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    color: 'rgba(19, 35, 27, 1)',
    marginBottom: 6,
    letterSpacing: 0.07,
  },
  welcomeText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 24,
    lineHeight: 28,
    color: 'rgba(19, 35, 27, 1)',
  },

  searchContainer: {
    marginTop: 14,
    paddingHorizontal: figma.spacing(spacing.xl),
    marginBottom: figma.spacing(spacing.l),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(60, 60, 67, 0.25)',
    borderRadius: figma.borderRadius(borderRadius.lg),
    paddingHorizontal: 16,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: 'rgba(171, 171, 171, 1)',
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: 'Rubik-Regular',
    fontSize: 15.5,
    color: 'rgba(175, 175, 175, 1)',
  },
premiumBanner: {
  marginTop: 16,
  height: 64,
  width: 377,
  alignSelf: 'center',
  backgroundColor: 'rgba(36, 32, 26, 1)',
  borderRadius: 12,
  paddingLeft: 10,
  paddingRight: 12,
  marginBottom: 16,
},

bannerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
},

bannerIconContainer: {
  position: 'relative',
  width: 32,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
},

bannerIcon: {
  width: 52,
  height: 52,
  tintColor: 'rgba(208,176,112,1)', // #D0B070
  marginLeft: 17,
  marginTop:8,
},

notificationBadge: {

  position: 'absolute',
  right: -15,
  top: -2,
  width: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: 'rgba(232,44,19,0.9)',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
},

badgeText: {
  color: '#FFFFFF',
  fontSize: 11,
  fontWeight: '600',
lineHeight: 18,
textAlign: 'center'
},

bannerTextBlock: {
  marginLeft: 27,
  flex: 1,
  justifyContent: 'center',
},

bannerTitle: {
  fontFamily: 'SF Pro Text',
  fontSize: 16,
  lineHeight: 21,
  color: 'rgba(208,176,112,0.8)',
  marginBottom: 2,
  textShadowColor: 'rgba(0,0,0,0.32)',
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 4,
},

bannerSubtitle: {
  fontFamily: 'SF Pro Text',
  fontSize: 13,
  lineHeight: 16,
  textShadowColor: 'rgba(0,0,0,0.32)',
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 4,
},

bannerArrowBox: {
  width: 24,
  height: 24,
  marginLeft: 8,
  alignItems: 'center',
  justifyContent: 'center',
},

bannerArrow: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'rgba(208,176,112,1)', // #D0B070
},
  bannerContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },

  bannerText: { flex: 1 },

  getStartedSection: { marginBottom: figma.spacing(spacing.xl) },
  sectionTitle: {
    fontFamily: 'Rubik-Medium',
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(19, 35, 27, 1)',
    paddingHorizontal: figma.spacing(spacing.xl),
    marginBottom: figma.spacing(spacing.m),
  },
  articlesContainer: { paddingLeft: figma.spacing(spacing.xl), gap: 10 },
  articleCard: { width: 240, marginRight: figma.spacing(spacing.s) },

  categoriesSection: { paddingHorizontal: figma.spacing(spacing.xl), marginBottom: figma.spacing(spacing.xl) },
  categoriesContainer: { gap: 16 },
  categoryCard: {
    flex: 1,
  },
  categoryCardRight: { marginLeft: figma.spacing(spacing.s) },

  loadingContainer: { alignItems: 'center', paddingVertical: figma.spacing(spacing['3xl']) },
  loadingText: { marginTop: figma.spacing(spacing.m) },
  emptyState: { alignItems: 'center', paddingVertical: figma.spacing(spacing['4xl']), paddingHorizontal: figma.spacing(spacing.xl) },
  emptyTitle: { fontSize: 48, marginBottom: figma.spacing(spacing.l) },
  emptyText: { lineHeight: 24 },
});