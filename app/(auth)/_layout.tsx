import React, { useMemo } from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import BottomNav from '@/components/BottomNav';

export default function AuthenticatedLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({ web: { display: 'flex' }, default: {} }) as unknown as undefined,
      }}
      tabBar={(props) => <BottomNav {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
