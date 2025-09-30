import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { registerScrollHandler, unregisterScrollHandler } from '@/utils/scrollToTop';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { colors } = useThemeContext();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const ref = useRef<ScrollView | null>(null);

  useEffect(() => {
    registerScrollHandler('profile', { scrollToTop: () => ref.current?.scrollTo({ y: 0, animated: true }) });
    return () => unregisterScrollHandler('profile');
  }, []);

  return (
    <ScrollView ref={ref} contentContainerStyle={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 12, paddingBottom: insets.bottom + 72 }]} testID="profile-scroll">
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      <Text style={[styles.paragraph, { color: colors.textSecondary }]}>Signed in as {user?.email ?? 'Unknown'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '700' as const, marginBottom: 8 },
  paragraph: { fontSize: 16, lineHeight: 22 },
});
