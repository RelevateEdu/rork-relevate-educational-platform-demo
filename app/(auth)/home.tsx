import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { onScrollToTop } from '@/utils/scrollEvents';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bottomNavHeight } from '@/components/BottomNav';

export default function Home() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const off = onScrollToTop((e) => {
      if (e.routeName === 'home') {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
    });
    return off;
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + 12,
          paddingBottom: bottomNavHeight + Math.max(insets.bottom, 12),
        },
      ]}
    > 
      <Text style={[styles.title, { color: colors.text }]} testID="home-title">Home</Text>
      <View style={{ height: 800 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: '700' as const },
});