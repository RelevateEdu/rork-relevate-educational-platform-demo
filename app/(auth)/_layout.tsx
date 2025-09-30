import React, { useEffect } from 'react';
import { Tabs, Redirect } from 'expo-router';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log('[AuthLayout] user changed', user?.email);
  }, [user]);

  if (isLoading) return null;
  if (!user) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNav {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress', tabBarBadge: 0 }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}