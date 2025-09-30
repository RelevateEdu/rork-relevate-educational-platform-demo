import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Home, LineChart, User2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { emitScrollToTop } from '@/utils/scrollEvents';

const NAV_HEIGHT = 64;

type TabKey = 'home' | 'progress' | 'profile';

export default function BottomNav(props: BottomTabBarProps) {
  const { state, descriptors, navigation } = props;
  const { colors, theme } = useThemeContext();
  const insets = useSafeAreaInsets();
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  const tabs = useMemo(() => {
    return state.routes.map((route) => {
      const options = descriptors[route.key]?.options ?? {};
      const name = route.name as TabKey;
      return { key: route.key, name, route };
    }).filter(t => ['home','progress','profile'].includes(t.name));
  }, [state.routes, descriptors]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setReduceMotion(false);
    } else {
      const { AccessibilityInfo } = require('react-native');
      AccessibilityInfo.isReduceMotionEnabled?.().then((v: boolean) => setReduceMotion(Boolean(v))).catch(() => setReduceMotion(false));
    }
  }, []);

  const handlePress = useCallback((index: number, routeName: string, isFocused: boolean) => {
    if (Platform.OS !== 'web') {
      try { Haptics.selectionAsync(); } catch { /* noop web */ }
    } else {
      console.log('Haptics not available on web');
    }

    if (isFocused) {
      emitScrollToTop(routeName);
      return;
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index].key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate({ name: state.routes[index].name, params: state.routes[index].params });
    }
  }, [navigation, state.routes]);

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}
      pointerEvents="box-none"
      testID="bottom-nav-wrapper"
    >
      <View
        style={[
          styles.bar,
          {
            backgroundColor: colors.card,
            borderColor: (colors as any).border ?? '#e5e7eb',
          },
        ]}
        pointerEvents="auto"
        testID="bottom-nav-bar"
      >
        {tabs.map((t, idx) => (
          <TabItem
            key={t.key}
            index={idx}
            routeName={t.name}
            isFocused={state.index === idx}
            onPress={handlePress}
            colors={{
              primary: colors.primary,
              text: colors.text,
              muted: colors.textMuted ?? '#8E8E93',
              background: colors.background,
              card: colors.card,
              border: (colors as any).border ?? '#e5e7eb',
            }}
            reduceMotion={reduceMotion}
            badge={t.name === 'progress' ? descriptors[tabs[idx].key]?.options?.tabBarBadge as number | undefined : undefined}
          />
        ))}
      </View>
    </View>
  );
}

function TabItem({ index, routeName, isFocused, onPress, colors, reduceMotion, badge }: {
  index: number;
  routeName: TabKey;
  isFocused: boolean;
  onPress: (index: number, routeName: string, isFocused: boolean) => void;
  colors: { primary: string; text: string; muted: string; background: string; card: string; border: string };
  reduceMotion: boolean;
  badge?: number;
}) {
  const widthAnim = useRef(new Animated.Value(isFocused ? 110 : 48)).current;
  const fadeAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (reduceMotion) {
      widthAnim.setValue(isFocused ? 110 : 48);
      fadeAnim.setValue(isFocused ? 1 : 0);
      return;
    }
    Animated.timing(widthAnim, {
      toValue: isFocused ? 110 : 48,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 160,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [isFocused, widthAnim, fadeAnim, reduceMotion]);

  const Icon = useMemo(() => {
    switch (routeName) {
      case 'home':
        return Home;
      case 'progress':
        return LineChart;
      case 'profile':
        return User2;
    }
  }, [routeName]);

  const label = useMemo(() => {
    switch (routeName) {
      case 'home': return 'Home';
      case 'progress': return 'Progress';
      case 'profile': return 'Profile';
    }
  }, [routeName]);

  const onLongPress = useCallback(() => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 800);
  }, []);

  const handlePressIn = useCallback(() => {
    if (!reduceMotion) {
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }).start();
    }
  }, [reduceMotion, scaleAnim]);

  const handlePressOut = useCallback(() => {
    if (!reduceMotion) {
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }).start();
    }
  }, [reduceMotion, scaleAnim]);

  return (
    <Pressable
      onPress={() => onPress(index, routeName, isFocused)}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabPressable}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFocused }}
      testID={`tab-${routeName}`}
    >
      <Animated.View
        style={[
          styles.tab,
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: isFocused ? (Platform.OS === 'ios' ? colors.card : colors.card) : 'transparent',
            borderColor: isFocused ? colors.primary : 'transparent',
          },
        ]}
      >
        <Animated.View style={[styles.pill, { width: widthAnim, backgroundColor: isFocused ? colors.primary : 'transparent' }]}> 
          <Icon size={22} color={isFocused ? colors.background : colors.text} />
          <Animated.View style={{ opacity: fadeAnim }}>
            {isFocused ? (
              <Text style={[styles.label, { color: colors.background }]} numberOfLines={1}>
                {label}
              </Text>
            ) : null}
          </Animated.View>
          {routeName === 'progress' && typeof badge === 'number' && badge > 0 ? (
            <View style={[styles.badge, { backgroundColor: '#FF3B30' }]}
              testID="progress-badge"
            >
              <Text style={styles.badgeText}>{badge > 99 ? '99+' : String(badge)}</Text>
            </View>
          ) : null}
        </Animated.View>
        {showTooltip ? (
          <View style={[styles.tooltip, { backgroundColor: colors.card, borderColor: colors.border }]} pointerEvents="none">
            <Text style={[styles.tooltipText, { color: colors.text }]}>{label}</Text>
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    alignItems: 'center',
  },
  bar: {
    height: NAV_HEIGHT,
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  tabPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tab: {
    height: 44,
    borderRadius: 22,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    height: 44,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700' as const,
  },
  tooltip: {
    position: 'absolute',
    bottom: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
});

export const bottomNavHeight = NAV_HEIGHT;