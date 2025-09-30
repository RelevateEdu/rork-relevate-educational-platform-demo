import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'student' | 'teacher' | 'business';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData && userData.trim()) {
        try {
          const parsed = JSON.parse(userData);
          if (parsed && typeof parsed === 'object' && parsed.id && parsed.email && parsed.role) {
            setUser(parsed);
          } else {
            console.log('Invalid user data format, clearing storage');
            await AsyncStorage.removeItem('user');
          }
        } catch (parseError) {
          console.log('Error parsing user data, clearing storage');
          await AsyncStorage.removeItem('user');
        }
      } else if (userData) {
        console.log('Empty or invalid user data, clearing storage');
        await AsyncStorage.removeItem('user');
      }
    } catch (error) {
      console.log('Error loading user:', error);
      try {
        await AsyncStorage.removeItem('user');
      } catch (clearError) {
        console.log('Error clearing storage:', clearError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - in real app would call API
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role,
    };
    
    setUser(mockUser);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return {
    user,
    isLoading,
    login,
    logout,
  };
});