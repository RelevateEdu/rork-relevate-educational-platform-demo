import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Animated, AccessibilityInfo, Platform, Pressable, Modal, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { colors, theme } = useThemeContext();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'education' | 'business'>('education');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [authError, setAuthError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const roleScaleAnims = useRef({
    student: new Animated.Value(1),
    teacher: new Animated.Value(1),
    employee: new Animated.Value(1),
    employer: new Animated.Value(1)
  }).current;
  
  const categoryScaleAnims = useRef({
    education: new Animated.Value(1),
    business: new Animated.Value(1)
  }).current;
  
  // Input focus animations
  const emailFocusAnim = useRef(new Animated.Value(0)).current;
  const passwordFocusAnim = useRef(new Animated.Value(0)).current;
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const educationRoles: { value: UserRole; label: string }[] = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
  ];
  
  const businessRoles: { value: UserRole; label: string }[] = [
    { value: 'employee', label: 'Employee' },
    { value: 'employer', label: 'Employer' },
  ];
  
  const currentRoles = selectedCategory === 'education' ? educationRoles : businessRoles;
  
  useEffect(() => {
    // Load saved role
    loadSavedRole();
    
    // Check for reduce motion preference
    if (Platform.OS !== 'web') {
      AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
    }
    
    // Mount animation
    if (!reduceMotion) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
    }
  }, [reduceMotion, fadeAnim, slideAnim]);
  
  const loadSavedRole = async () => {
    // Role persistence will be handled by a provider in the future
    // For now, default to student role
    console.log('Loading saved role - feature coming soon');
  };
  
  const saveRole = async (role: UserRole) => {
    // Validate role input
    if (!role || !role.trim()) return;
    if (role.length > 20) return;
    const sanitizedRole = role.trim();
    
    const validRoles = ['student', 'teacher', 'employee', 'employer'];
    if (!validRoles.includes(sanitizedRole)) {
      return;
    }
    
    // Role persistence will be handled by a provider in the future
    console.log('Saving role:', sanitizedRole);
  };
  
  const validateEmail = (email: string) => {
    // Validate email input
    if (!email || !email.trim()) return false;
    if (email.length > 254) return false;
    const sanitizedEmail = email.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitizedEmail);
  };
  
  const handleEmailBlur = () => {
    setEmailFocused(false);
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
    
    if (!reduceMotion) {
      Animated.timing(emailFocusAnim, {
        toValue: email ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };
  
  const handleEmailFocus = () => {
    setEmailFocused(true);
    setAuthError('');
    
    if (!reduceMotion) {
      Animated.timing(emailFocusAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };
  
  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    setAuthError('');
    
    if (!reduceMotion) {
      Animated.timing(passwordFocusAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };
  
  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    
    if (!reduceMotion) {
      Animated.timing(passwordFocusAnim, {
        toValue: password ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };
  
  const handleCategoryPress = (category: 'education' | 'business') => {
    setSelectedCategory(category);
    setAuthError('');
    
    // Set default role for the category
    if (category === 'education') {
      setSelectedRole('student');
    } else {
      setSelectedRole('employee');
    }
    
    if (!reduceMotion) {
      Animated.sequence([
        Animated.timing(categoryScaleAnims[category], {
          toValue: 0.98,
          duration: 60,
          useNativeDriver: true,
        }),
        Animated.timing(categoryScaleAnims[category], {
          toValue: 1,
          duration: 60,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };
  
  const handleRolePress = (role: UserRole) => {
    // Validate role input
    if (!role || !role.trim()) return;
    if (role.length > 20) return;
    const sanitizedRole = role.trim() as UserRole;
    
    const validRoles = ['student', 'teacher', 'employee', 'employer'];
    if (!validRoles.includes(sanitizedRole)) {
      return;
    }
    
    setSelectedRole(sanitizedRole);
    saveRole(sanitizedRole);
    setAuthError('');
    
    if (!reduceMotion) {
      // Scale animation for tap feedback
      Animated.sequence([
        Animated.timing(roleScaleAnims[role], {
          toValue: 0.98,
          duration: 60,
          useNativeDriver: true,
        }),
        Animated.timing(roleScaleAnims[role], {
          toValue: 1,
          duration: 60,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };
  
  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '' && !emailError && validateEmail(email);
  };

  const handleLogin = async () => {
    if (!isFormValid()) {
      return;
    }

    setIsLoading(true);
    setAuthError('');
    
    try {
      await login(email, password, selectedRole);
      
      // Navigate to appropriate dashboard
      switch (selectedRole) {
        case 'student':
          router.replace('/dashboard/student');
          break;
        case 'teacher':
          router.replace('/dashboard/teacher');
          break;
        case 'employee':
          router.replace('/dashboard/employee');
          break;
        case 'employer':
          router.replace('/dashboard/employer');
          break;
      }
    } catch {
      setAuthError('Could not sign in. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };
  
  const closeForgotPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header showAuth={false} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        <Animated.View 
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sign in to your Relevate account
            </Text>
          </View>

          {/* Auth Error */}
          {authError ? (
            <View style={[styles.errorAlert, { backgroundColor: colors.error + '15', borderColor: colors.error + '30' }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>{authError}</Text>
            </View>
          ) : null}

          {/* Form Card */}
          <View style={[styles.form, { backgroundColor: colors.card, borderColor: theme === 'dark' ? '#333333' : '#e2e8f0' }]}>
                {/* Category Toggle */}
                <View style={styles.categorySelector}>
                  <View style={styles.categoryButtons}>
                    <Animated.View
                      style={[styles.categoryButtonWrapper, { transform: [{ scale: categoryScaleAnims.education }] }]}
                    >
                      <Pressable
                        style={[
                          styles.categoryButton,
                          { borderColor: colors.border },
                          selectedCategory === 'education' && { 
                            backgroundColor: colors.primary, 
                            borderColor: colors.primary 
                          },
                        ]}
                        onPress={() => handleCategoryPress('education')}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Select Education category"
                        accessibilityState={{ selected: selectedCategory === 'education' }}
                        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                      >
                        <Text
                          style={[
                            styles.categoryButtonText,
                            { color: selectedCategory === 'education' ? colors.background : colors.text },
                          ]}
                        >
                          Education
                        </Text>
                      </Pressable>
                    </Animated.View>
                    
                    <Animated.View
                      style={[styles.categoryButtonWrapper, { transform: [{ scale: categoryScaleAnims.business }] }]}
                    >
                      <Pressable
                        style={[
                          styles.categoryButton,
                          { borderColor: colors.border },
                          selectedCategory === 'business' && { 
                            backgroundColor: colors.primary, 
                            borderColor: colors.primary 
                          },
                        ]}
                        onPress={() => handleCategoryPress('business')}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Select Business category"
                        accessibilityState={{ selected: selectedCategory === 'business' }}
                        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                      >
                        <Text
                          style={[
                            styles.categoryButtonText,
                            { color: selectedCategory === 'business' ? colors.background : colors.text },
                          ]}
                        >
                          Business
                        </Text>
                      </Pressable>
                    </Animated.View>
                  </View>
                </View>

                {/* Role Selector */}
                <View style={styles.roleSelector}>
                  <View style={styles.roleButtons}>
                    {currentRoles.map((role) => (
                      <Animated.View
                        key={role.value}
                        style={[{ transform: [{ scale: roleScaleAnims[role.value] }] }]}
                      >
                        <Pressable
                          style={[
                            styles.roleButton,
                            { borderColor: colors.border },
                            selectedRole === role.value && { 
                              backgroundColor: colors.primary, 
                              borderColor: colors.primary 
                            },
                          ]}
                          onPress={() => handleRolePress(role.value)}
                          accessible={true}
                          accessibilityRole="button"
                          accessibilityLabel={`Select ${role.label} role`}
                          accessibilityState={{ selected: selectedRole === role.value }}
                          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                          <Text
                            style={[
                              styles.roleButtonText,
                              { color: selectedRole === role.value ? colors.background : colors.text },
                            ]}
                          >
                            {role.label}
                          </Text>
                        </Pressable>
                      </Animated.View>
                    ))}
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[
                        styles.input, 
                        { 
                          color: colors.text,
                          borderColor: emailFocused ? colors.primary : colors.border,
                          backgroundColor: colors.card,
                        },
                        emailFocused && { 
                          shadowColor: colors.primary,
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 2,
                        }
                      ]}
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        if (emailError) setEmailError('');
                      }}
                      onFocus={handleEmailFocus}
                      onBlur={handleEmailBlur}
                      placeholder="Email"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      accessible={true}
                      accessibilityLabel="Email address"
                    />
                  </View>
                  {emailError ? (
                    <Text style={[styles.inputError, { color: colors.error }]}>{emailError}</Text>
                  ) : null}
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[
                        styles.input, 
                        { 
                          color: colors.text, 
                          paddingRight: 50,
                          borderColor: passwordFocused ? colors.primary : colors.border,
                          backgroundColor: colors.card,
                        },
                        passwordFocused && { 
                          shadowColor: colors.primary,
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 2,
                        }
                      ]}
                      value={password}
                      onChangeText={setPassword}
                      onFocus={handlePasswordFocus}
                      onBlur={handlePasswordBlur}
                      placeholder="Password"
                      placeholderTextColor={colors.textMuted}
                      secureTextEntry={!showPassword}
                      autoComplete="password"
                      accessible={true}
                      accessibilityLabel="Password"
                    />
                    <Pressable
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color={colors.textMuted} />
                      ) : (
                        <Eye size={20} color={colors.textMuted} />
                      )}
                    </Pressable>
                  </View>
                </View>

                {/* Forgot Password Link */}
                <Pressable
                  style={styles.forgotPassword}
                  onPress={handleForgotPassword}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Forgot password"
                >
                  <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                    Forgot password?
                  </Text>
                </Pressable>

                {/* Sign In Button */}
                <Pressable
                  style={[
                    styles.loginButton,
                    { 
                      backgroundColor: isFormValid() ? colors.primary : colors.textMuted,
                      opacity: isFormValid() ? 1 : 0.6 
                    },
                  ]}
                  onPress={handleLogin}
                  disabled={!isFormValid() || isLoading}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Sign in"
                  accessibilityState={{ disabled: !isFormValid() || isLoading }}
                >
                  <View style={styles.loginButtonContent}>
                    {isLoading && (
                      <Loader2 size={16} color={colors.background} style={styles.loginSpinner} />
                    )}
                    <Text style={[styles.loginButtonText, { color: colors.background }]}>
                      Sign In
                    </Text>
                  </View>
                </Pressable>

                {/* Demo Note */}
                <Text style={[styles.demoNote, { color: colors.textMuted }]}>
                  Demo mode: use any email/password combination
                </Text>
              </View>
        </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Forgot Password Modal */}
      <Modal
        visible={showForgotPassword}
        transparent={true}
        animationType="fade"
        onRequestClose={closeForgotPassword}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Password Reset</Text>
            <Text style={[styles.modalText, { color: colors.textSecondary }]}>
              Password reset functionality is coming soon. Please contact support if you need assistance.
            </Text>
            <Pressable
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={closeForgotPassword}
            >
              <Text style={[styles.modalButtonText, { color: colors.background }]}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  formContainer: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  errorAlert: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500' as const,
  },
  form: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryButtonWrapper: {
    flex: 1,
  },
  categoryButton: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  categoryButtonText: {
    fontSize: 15,
    fontWeight: '700' as const,
    textAlign: 'center',
  },
  roleSelector: {
    marginBottom: 24,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    zIndex: 1,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    minHeight: 52,
    borderWidth: 1.5,
    borderRadius: 12,
    zIndex: 2,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  inputError: {
    fontSize: 13,
    marginTop: 6,
    marginLeft: 16,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    padding: 4,
    minHeight: 44,
    justifyContent: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginSpinner: {
    marginRight: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  demoNote: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
});