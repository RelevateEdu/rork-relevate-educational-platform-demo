import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '@/app/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeTab() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 64 }]} testID="home-tab-container">
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
