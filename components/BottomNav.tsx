import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { Home, LineChart, User } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';

export type BottomNavKey = 'home' | 'progress' | 'profile';

export type BottomNavProps = {
  active: BottomNavKey;
  onChange: (key: BottomNavKey) => void;
  progressBadgeCount?: number;
};

const EASING = (t: number) => 1 - Math.pow(1 - t, 3);

export default function BottomNav({ active, onChange, progressBadgeCount }: BottomNavProps) {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();

  const keys: BottomNavKey[] = ['home', 'progress', 'profile'];
  const anims = useRef<Record<BottomNavKey, Animated.Value>>({
    home: new Animated.Value(0),
    progress: new Animated.Value(0),
    profile: new Animated.Value(0),
  }).current;

  const [tooltip, setTooltip] = useState<BottomNavKey | null>(null);
  useEffect(() => {
    keys.forEach((k) => {
      Animated.timing(anims[k], {
        toValue: k === active ? 1 : 0,
        duration: 220,
        easing: EASING,
        useNativeDriver: false,
      }).start();
    });
  }, [active]);

  const iconFor = (k: BottomNavKey) => {
    const color = k === active ? colors.background : colors.text;
    const size = 20;
    switch (k) {
      case 'home':
        return <Home size={size} color={color} />;
      case 'progress':
        return <LineChart size={size} color={color} />;
      case 'profile':
        return <User size={size} color={color} />;
    }
  };

  const labelFor: Record<BottomNavKey, string> = {
    home: 'Home',
    progress: 'Progress',
    profile: 'Profile',
  };

  const handlePress = (k: BottomNavKey) => {
    if (Platform.OS !== 'web') {
      try { Haptics.selectionAsync(); } catch {}
    }
    onChange(k);
  };

  const handleLongPress = (k: BottomNavKey) => {
    setTooltip(k);
    setTimeout(() => setTooltip((t) => (t === k ? null : t)), 1000);
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8), backgroundColor: colors.card, borderTopColor: colors.border }]} pointerEvents="box-none">
      <View style={styles.row}>
        {keys.map((k) => {
          const w = anims[k].interpolate({ inputRange: [0, 1], outputRange: [44, 120] });
          const bg = anims[k].interpolate({ inputRange: [0, 1], outputRange: ['transparent', colors.primary] });
          const labelOpacity = anims[k].interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
          const labelTranslate = anims[k].interpolate({ inputRange: [0, 1], outputRange: [4, 0] });

          const isActive = k === active;

          return (
            <View key={k} style={styles.item}>
              {tooltip === k && (
                <View style={[styles.tooltip, { backgroundColor: colors.text, shadowColor: colors.text }]} pointerEvents="none">
                  <Text style={[styles.tooltipText, { color: colors.background }]}>{labelFor[k]}</Text>
                </View>
              )}
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                onLongPress={() => handleLongPress(k)}
                onPress={() => handlePress(k)}
                style={styles.pressable}
                testID={`tab-${k}`}
              >
                <Animated.View style={[styles.pill, { width: w, backgroundColor: bg, borderColor: colors.border }]}> 
                  {iconFor(k)}
                  <Animated.Text style={[styles.label, { opacity: labelOpacity, transform: [{ translateY: labelTranslate }], color: colors.background }]} numberOfLines={1}>
                    {labelFor[k]}
                  </Animated.Text>
                  {k === 'progress' && typeof progressBadgeCount === 'number' && progressBadgeCount > 0 ? (
                    <View style={[styles.badge, { backgroundColor: colors.error }]} testID="progress-badge">
                      <Text style={[styles.badgeText, { color: colors.background }]}>{progressBadgeCount}</Text>
                    </View>
                  ) : null}
                </Animated.View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pressable: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    minWidth: 44,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 999,
    borderWidth: 0,
    paddingHorizontal: 12,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    borderRadius: 999,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700' as const,
  },
  tooltip: {
    position: 'absolute',
    bottom: 56,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    elevation: 4,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
});
