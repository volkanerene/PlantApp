// src/screens/home/DiagnoseScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../components/Typography';

export const DiagnoseScreen: React.FC = () => (
  <View style={styles.container}>
    <Typography style={styles.label}>diagnosescreen</Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    color: '#13231B',
    textTransform: 'lowercase',
  },
});
export default DiagnoseScreen;