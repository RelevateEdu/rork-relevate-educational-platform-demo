import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { registerScrollHandler, unregisterScrollHandler } from '@/utils/scrollToTop';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProgressScreen() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const ref = useRef<ScrollView | null>(null);

  useEffect(() => {
    registerScrollHandler('progress', { scrollToTop: () => ref.current?.scrollTo({ y: 0, animated: true }) });
    return () => unregisterScrollHandler('progress');
  }, []);

  return (
    <ScrollView ref={ref} contentContainerStyle={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 12, paddingBottom: insets.bottom + 72 }]} testID="progress-scroll">
      <Text style={[styles.title, { color: colors.text }]}>Progress</Text>
      <Text style={[styles.paragraph, { color: colors.textSecondary }]}>Your learning progress and stats.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '700' as const, marginBottom: 8 },
  paragraph: { fontSize: 16, lineHeight: 22 },
});
