import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../components/Typography';

export const ProfileScreen: React.FC = () => (
  <View style={styles.container}>
    <Typography style={styles.label}>profilescreen</Typography>
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
export default ProfileScreen;