import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Platform, AccessibilityInfo, Easing } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, LineChart, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useThemeContext } from '@/contexts/ThemeContext';

const easeOut = (value: Animated.Value, toValue: number, duration: number, useNativeDriver: boolean) =>
  Animated.timing(value, { toValue, duration, easing: Easing.out(Easing.cubic), useNativeDriver });

type IconName = 'home' | 'progress' | 'profile';

function getIcon(name: IconName, color: string) {
  const size = 22;
  switch (name) {
    case 'home':
      return <Home width={size} height={size} color={color} />;
    case 'progress':
      return <LineChart width={size} height={size} color={color} />;
    case 'profile':
      return <User width={size} height={size} color={color} />;
  }
}

export default function BottomNav(props: BottomTabBarProps) {
  const { state, descriptors, navigation } = props;
  const insets = useSafeAreaInsets();
  const { colors, theme } = useThemeContext();
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => setReduceMotion(false));
    }
  }, []);

  const routes = state.routes as typeof state.routes & { name: string }[];

  const anims = useRef(
    routes.reduce<Record<string, { width: Animated.Value; labelOpacity: Animated.Value; labelTranslate: Animated.Value }>>((acc, r) => {
      acc[r.key] = {
        width: new Animated.Value(48),
        labelOpacity: new Animated.Value(0),
        labelTranslate: new Animated.Value(4),
      };
      return acc;
    }, {})
  ).current;

  useEffect(() => {
    routes.forEach((route, index) => {
      const focused = state.index === index;
      const a = anims[route.key];
      if (!a) return;
      if (reduceMotion) {
        a.width.setValue(focused ? 120 : 48);
        a.labelOpacity.setValue(focused ? 1 : 0);
        a.labelTranslate.setValue(focused ? 0 : 4);
        return;
      }
      Animated.parallel([
        easeOut(a.width, focused ? 120 : 48, 220, true),
        easeOut(a.labelOpacity, focused ? 1 : 0, 160, true),
        easeOut(a.labelTranslate, focused ? 0 : 4, 160, true),
      ]).start();
    });
  }, [state.index, routes, anims, reduceMotion]);

  const onPressTab = useCallback(
    (routeName: string, routeKey: string, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });

      if (Platform.OS !== 'web') {
        try {
          if (typeof Haptics.selectionAsync === 'function') {
            Haptics.selectionAsync();
          }
        } catch {}
      } else {
        console.log('Haptics not available on web');
      }

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName as never);
      } else if (isFocused) {
        // Emit a custom event for scroll-to-top for any listeners in the screen
        navigation.emit({ type: 'tabLongPress', target: routeKey });
        // Also emit a custom event name that screen can listen for
        navigation.emit({ type: 'reselect', target: routeKey } as any);
      }
    },
    [navigation]
  );

  const [tooltip, setTooltip] = useState<{ key: string; label: string } | null>(null);

  return (
    <View style={[styles.wrapper]} pointerEvents="box-none">
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.card,
            borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb',
            paddingBottom: insets.bottom + 8,
            shadowColor: theme === 'dark' ? '#000' : '#0a0a0a',
          },
        ]}
        testID="bottom-nav"
      >
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label = (options.title ?? route.name) as string;
          const iconName: IconName = route.name === 'home' ? 'home' : route.name === 'progress' ? 'progress' : 'profile';
          const badge = (options as unknown as { tabBarBadge?: number }).tabBarBadge;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={label}
              onPress={() => onPressTab(route.name, route.key, isFocused)}
              onLongPress={() => {
                setTooltip({ key: route.key, label });
                setTimeout(() => setTooltip((t) => (t?.key === route.key ? null : t)), 750);
              }}
              style={styles.tab}
              testID={`tab-${route.name}`}
            >
              <Animated.View
                style={[
                  styles.pill,
                  {
                    backgroundColor: isFocused ? colors.primary : 'transparent',
                    borderColor: isFocused ? colors.primary : colors.border,
                    width: anims[route.key]?.width ?? 48,
                  },
                ]}
                pointerEvents="none"
              >
                {badge && badge > 0 ? (
                  <View style={[styles.badge, { backgroundColor: colors.error }]}>
                    <Text style={styles.badgeText}>{badge > 99 ? '99+' : String(badge)}</Text>
                  </View>
                ) : null}
                <View style={styles.pillContent} pointerEvents="none">
                  {getIcon(iconName, isFocused ? colors.background : colors.text)}
                  <Animated.Text
                    style={[
                      styles.pillLabel,
                      {
                        color: colors.background,
                        opacity: anims[route.key]?.labelOpacity ?? 0,
                        transform: [{ translateX: anims[route.key]?.labelTranslate ?? new Animated.Value(4) }],
                      },
                    ]}
                    numberOfLines={1}
                  >
                    <Text style={[styles.pillLabel, { color: colors.background }]}>{label}</Text>
                  </Animated.Text>
                </View>
              </Animated.View>
              {tooltip?.key === route.key ? (
                <View style={[styles.tooltip, { backgroundColor: theme === 'dark' ? '#111827' : '#111827' }]}
                  pointerEvents="none"
                >
                  <Text style={[styles.tooltipText, { color: '#ffffff' }]}>{label}</Text>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    zIndex: 100,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  pill: {
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  pillLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  tooltip: {
    position: 'absolute',
    bottom: 54,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    opacity: 0.95,
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
