import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Moon, Sun, User, ChevronDown } from 'lucide-react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  showAuth?: boolean;
}

export function Header({ showAuth = true }: HeaderProps) {
  const { colors, theme, toggleTheme } = useThemeContext();
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleAuthPress = () => {
    router.push('/login');
  };

  const handleAboutDropdownPress = (route: '/about' | '/changelog' | '/waitlist') => {
    setShowAboutDropdown(false);
    router.push(route);
  };

  const handleLogout = async () => {
    setShowUserDropdown(false);
    await logout();
    router.push('/');
  };

  const handleSettings = () => {
    setShowUserDropdown(false);
    router.push('/settings');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.logoContainer} onPress={() => router.push('/')}>
        <Image 
          source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/lnjb9kjp1asayud121gje' }}
          style={styles.logoImage}
          resizeMode="contain"
        />

      </TouchableOpacity>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.themeButton, { backgroundColor: colors.surface }]}
          onPress={toggleTheme}
        >
          {theme === 'light' ? (
            <Moon size={20} color={colors.text} />
          ) : (
            <Sun size={20} color={colors.text} />
          )}
        </TouchableOpacity>
        
        {!user && (
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[styles.dropdownButton, { backgroundColor: colors.surface }]}
              onPress={() => setShowAboutDropdown(!showAboutDropdown)}
            >
              <Text style={[styles.dropdownText, { color: colors.text }]}>About</Text>
              <ChevronDown size={16} color={colors.text} />
            </TouchableOpacity>
            
            {showAboutDropdown && (
              <View style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleAboutDropdownPress('/about')}
                >
                  <Text style={[styles.dropdownItemText, { color: colors.text }]}>About us</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleAboutDropdownPress('/changelog')}
                >
                  <Text style={[styles.dropdownItemText, { color: colors.text }]}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleAboutDropdownPress('/waitlist')}
                >
                  <Text style={[styles.dropdownItemText, { color: colors.text }]}>Refer us</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        
        {showAuth && (
          user ? (
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={[styles.authButton, { backgroundColor: colors.surface }]}
                onPress={() => setShowUserDropdown(!showUserDropdown)}
              >
                <User size={20} color={colors.text} />
                <ChevronDown size={16} color={colors.text} />
              </TouchableOpacity>
              
              {showUserDropdown && (
                <View style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={handleSettings}
                  >
                    <Text style={[styles.dropdownItemText, { color: colors.text }]}>Settings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={handleLogout}
                  >
                    <Text style={[styles.dropdownItemText, { color: colors.text }]}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.authButton, { backgroundColor: colors.primary }]}
              onPress={handleAuthPress}
            >
              <Text style={[styles.authText, { color: colors.background }]}>Log In</Text>
            </TouchableOpacity>
          )
        )}
      </View>
      
      {(showAboutDropdown || showUserDropdown) && (
        <Pressable 
          style={styles.overlay} 
          onPress={() => {
            setShowAboutDropdown(false);
            setShowUserDropdown(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    zIndex: 10002,
    position: 'relative',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authButton: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
    gap: 4,
  },
  authText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 10001,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 4,
    minWidth: 120,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10002,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10001,
  },
});