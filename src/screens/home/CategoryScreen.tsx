// src/screens/home/CategoryScreen.tsx
import React, { useEffect } from 'react';
import {
     Platform,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { CategoryScreenProps } from '../../navigation/types';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { colors } from '../../theme/colors';
import { Typography } from '../../components/Typography';
import LinearGradient from 'react-native-linear-gradient';
import { getPlatformShadow } from '../../utils/platformStyles';


const backIcon = require('../../../assets/images/back-arrow.png');


export const CategoryScreen: React.FC<CategoryScreenProps> = ({ route, navigation }) => {  const { id } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const SBH = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  const { data, loading } = useSelector((s: RootState) => s.categories);
  const category = data.find((c) => c.id === id);
  const handleGoBack = () => {
    navigation.goBack();
  };
  // Kategori listesi yüklü değilse çek
  useEffect(() => {
    if (!category && !loading) dispatch(fetchCategories());
  }, [category, loading, dispatch]);

  if (loading || !category) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />


      {/* HERO ------------------------------------------------ */}
      <ImageBackground
        source={{ uri: category.image.url }}
        style={[styles.hero, { paddingTop: SBH + 12 }]}   // başlık kesilmiyor
        imageStyle={{ alignSelf: 'stretch' }}             // boşluk yok
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />

        {/* BACK BTN */}
        <TouchableOpacity
          style={[styles.backButton, { top: SBH + 12 }]}  // tam üstte
          onPress={handleGoBack}
        >
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>

        <Typography style={styles.heroTitle}>{category.title}</Typography>
      </ImageBackground>

      {/* INFO */}
      <View style={styles.infoBox}>
        <Typography style={styles.infoText}>
          {category.plantCount
            ? `${category.plantCount} plants`
            : 'No plants listed yet'}
        </Typography>
      </View>

      {/* CONTENT – şimdilik boş durum */}
      <View style={styles.center}>
        <Typography style={styles.placeholder}>
          We’ll show plants in this category soon 🌱
        </Typography>
      </View>
    </SafeAreaView>
  );
};
// styles (aynı dosya içinde)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  hero: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
    /* paddingTop dinamik eklendi */
  },

  heroTitle: {
    fontSize: 28,
    color: '#FFF',
    fontFamily: 'Rubik-Medium',
    marginBottom: 8, 
    marginLeft:12,            // biraz nefes
    lineHeight: 34, 
  },

  backButton: {
    position: 'absolute',
    left: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    ...getPlatformShadow(1),
  },

  backIcon: { width: 18, height: 18, tintColor: colors.textPrimary },

  infoBox: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },

  infoText: {
    fontSize: 14,
    color: '#13231B',
    fontFamily: 'Rubik-Regular',
  },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholder: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});