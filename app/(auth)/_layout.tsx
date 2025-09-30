import React, { useMemo, useState, useEffect } from 'react';
import { Tabs, usePathname, router } from 'expo-router';
import { useThemeContext } from '@/contexts/ThemeContext';
import BottomNav from '@/components/BottomNav';
import { scrollToTop } from '@/utils/scrollToTop';

export default function AuthTabsLayout() {
  const { colors } = useThemeContext();
  const pathname = usePathname();
  const activeKey = useMemo<"home" | "progress" | "profile">(() => {
    if (pathname?.includes('/(auth)/progress')) return 'progress';
    if (pathname?.includes('/(auth)/profile')) return 'profile';
    return 'home';
  }, [pathname]);

  const [lastActive, setLastActive] = useState<typeof activeKey>(activeKey);
  useEffect(() => {
    setLastActive(activeKey);
  }, [activeKey]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
        sceneStyle: { backgroundColor: colors.background },
      }}
      tabBar={() => (
        <BottomNav
          active={activeKey}
          onChange={(key: 'home' | 'progress' | 'profile') => {
            if (key === activeKey) {
              scrollToTop(key);
              return;
            }
            switch (key) {
              case 'home':
                router.replace('/(auth)/home');
                break;
              case 'progress':
                router.replace('/(auth)/progress');
                break;
              case 'profile':
                router.replace('/(auth)/profile');
                break;
            }
          }}
        />
      )}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
