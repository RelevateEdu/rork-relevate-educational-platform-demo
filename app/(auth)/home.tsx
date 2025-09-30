import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { registerScrollHandler, unregisterScrollHandler } from '@/utils/scrollToTop';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const ref = useRef<ScrollView | null>(null);

  useEffect(() => {
    registerScrollHandler('home', { scrollToTop: () => ref.current?.scrollTo({ y: 0, animated: true }) });
    return () => unregisterScrollHandler('home');
  }, []);

  return (
    <ScrollView ref={ref} contentContainerStyle={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 12, paddingBottom: insets.bottom + 72 }]} testID="home-scroll">
      <Text style={[styles.title, { color: colors.text }]}>Home</Text>
      <Text style={[styles.paragraph, { color: colors.textSecondary }]}>Welcome to your dashboard.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '700' as const, marginBottom: 8 },
  paragraph: { fontSize: 16, lineHeight: 22 },
});
