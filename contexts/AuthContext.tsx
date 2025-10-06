import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'student' | 'teacher' | 'employee' | 'employer';

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
      if (userData && userData.trim() && userData !== 'undefined' && userData !== 'null') {
        try {
          const parsed = JSON.parse(userData);
          if (parsed && typeof parsed === 'object' && parsed.id && parsed.email && parsed.role) {
            const validRoles = ['student', 'teacher', 'employee', 'employer'];
            if (validRoles.includes(parsed.role)) {
              setUser(parsed);
            } else {
              console.log('Invalid role, clearing storage');
              await AsyncStorage.removeItem('user');
            }
          } else {
            console.log('Invalid user data format, clearing storage');
            await AsyncStorage.removeItem('user');
          }
        } catch (parseError) {
          console.error('JSON Parse error in user data:', parseError);
          console.log('Corrupted data:', userData);
          await AsyncStorage.removeItem('user');
        }
      } else if (userData) {
        console.log('Empty or invalid user data, clearing storage');
        await AsyncStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error loading user:', error);
      try {
        await AsyncStorage.removeItem('user');
      } catch (clearError) {
        console.error('Error clearing storage:', clearError);
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