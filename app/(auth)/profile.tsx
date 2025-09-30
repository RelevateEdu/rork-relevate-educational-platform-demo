import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { onScrollToTop } from '@/utils/scrollEvents';
import { useAuth } from '@/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bottomNavHeight } from '@/components/BottomNav';

export default function Profile() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const off = onScrollToTop((e) => {
      if (e.routeName === 'profile') {
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
      <Text style={[styles.title, { color: colors.text }]} testID="profile-title">Profile</Text>
      <Pressable onPress={logout} style={[styles.logoutBtn, { backgroundColor: colors.primary }]} testID="logout-button">
        <Text style={{ color: colors.background, fontWeight: '600' as const }}>Log out</Text>
      </Pressable>
      <View style={{ height: 800 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: '700' as const, marginBottom: 16 },
  logoutBtn: { paddingVertical: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: 140 },
});