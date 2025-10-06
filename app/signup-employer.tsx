import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Eye, EyeOff, CheckSquare, Square, Loader2 } from 'lucide-react-native';

type PlanType = 'starter' | 'growth' | 'enterprise';

export default function SignUpEmployerScreen() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ plan?: string }>();
  const selectedPlan = (params.plan as PlanType) || 'growth';

  const [companyName, setCompanyName] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    companyName: '',
    employerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });

  const planNames: Record<PlanType, string> = {
    starter: 'Starter',
    growth: 'Growth',
    enterprise: 'Enterprise',
  };

  const validateEmail = (email: string) => {
    if (!email || !email.trim()) return false;
    if (email.length > 254) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validateForm = () => {
    const newErrors = {
      companyName: '',
      employerName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
    };

    if (!companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!employerName.trim()) {
      newErrors.employerName = 'Your name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Account created:', {
        companyName,
        employerName,
        email,
        plan: selectedPlan,
      });

      router.replace('/dashboard/employer');
    } catch (error) {
      console.error('Error creating account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      companyName.trim() !== '' &&
      employerName.trim() !== '' &&
      email.trim() !== '' &&
      validateEmail(email) &&
      password.trim() !== '' &&
      password.length >= 8 &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword &&
      agreedToTerms
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

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
          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>Create Your Account</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Join Relevate with the {planNames[selectedPlan]} plan
              </Text>
            </View>

            <View style={[styles.form, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Company Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      borderColor: errors.companyName ? colors.error : colors.border,
                      backgroundColor: colors.card,
                    },
                  ]}
                  value={companyName}
                  onChangeText={(text) => {
                    setCompanyName(text);
                    if (errors.companyName) {
                      setErrors({ ...errors, companyName: '' });
                    }
                  }}
                  placeholder="Enter your company name"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="words"
                  accessible={true}
                  accessibilityLabel="Company name"
                />
                {errors.companyName ? (
                  <Text style={[styles.errorText, { color: colors.error }]}>{errors.companyName}</Text>
                ) : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Your Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      borderColor: errors.employerName ? colors.error : colors.border,
                      backgroundColor: colors.card,
                    },
                  ]}
                  value={employerName}
                  onChangeText={(text) => {
                    setEmployerName(text);
                    if (errors.employerName) {
                      setErrors({ ...errors, employerName: '' });
                    }
                  }}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="words"
                  accessible={true}
                  accessibilityLabel="Your name"
                />
                {errors.employerName ? (
                  <Text style={[styles.errorText, { color: colors.error }]}>{errors.employerName}</Text>
                ) : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      borderColor: errors.email ? colors.error : colors.border,
                      backgroundColor: colors.card,
                    },
                  ]}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors({ ...errors, email: '' });
                    }
                  }}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  accessible={true}
                  accessibilityLabel="Email address"
                />
                {errors.email ? (
                  <Text style={[styles.errorText, { color: colors.error }]}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      {
                        color: colors.text,
                        borderColor: errors.password ? colors.error : colors.border,
                        backgroundColor: colors.card,
                      },
                    ]}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) {
                        setErrors({ ...errors, password: '' });
                      }
                    }}
                    placeholder="Create a password"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showPassword}
                    autoComplete="password-new"
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
                {errors.password ? (
                  <Text style={[styles.errorText, { color: colors.error }]}>{errors.password}</Text>
                ) : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      {
                        color: colors.text,
                        borderColor: errors.confirmPassword ? colors.error : colors.border,
                        backgroundColor: colors.card,
                      },
                    ]}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (errors.confirmPassword) {
                        setErrors({ ...errors, confirmPassword: '' });
                      }
                    }}
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!showConfirmPassword}
                    autoComplete="password-new"
                    accessible={true}
                    accessibilityLabel="Confirm password"
                  />
                  <Pressable
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel={showConfirmPassword ? 'Hide password' : 'Show password'}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color={colors.textMuted} />
                    ) : (
                      <Eye size={20} color={colors.textMuted} />
                    )}
                  </Pressable>
                </View>
                {errors.confirmPassword ? (
                  <Text style={[styles.errorText, { color: colors.error }]}>{errors.confirmPassword}</Text>
                ) : null}
              </View>

              <Pressable
                style={styles.checkboxContainer}
                onPress={() => {
                  setAgreedToTerms(!agreedToTerms);
                  if (errors.terms) {
                    setErrors({ ...errors, terms: '' });
                  }
                }}
                accessible={true}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: agreedToTerms }}
                accessibilityLabel="Agree to Terms and Conditions"
              >
                {agreedToTerms ? (
                  <CheckSquare size={24} color={colors.primary} strokeWidth={2} />
                ) : (
                  <Square size={24} color={colors.border} strokeWidth={2} />
                )}
                <Text style={[styles.checkboxLabel, { color: colors.text }]}>
                  I agree to the{' '}
                  <Text style={{ color: colors.primary, fontWeight: '600' as const }}>
                    Terms & Conditions
                  </Text>
                </Text>
              </Pressable>
              {errors.terms ? (
                <Text style={[styles.errorText, { color: colors.error, marginTop: 4 }]}>
                  {errors.terms}
                </Text>
              ) : null}

              <Pressable
                style={[
                  styles.createButton,
                  {
                    backgroundColor: isFormValid() ? colors.primary : colors.textMuted,
                    opacity: isFormValid() ? 1 : 0.6,
                  },
                ]}
                onPress={handleCreateAccount}
                disabled={!isFormValid() || isLoading}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Create account"
                accessibilityState={{ disabled: !isFormValid() || isLoading }}
              >
                <View style={styles.buttonContent}>
                  {isLoading && <Loader2 size={16} color={colors.background} style={styles.spinner} />}
                  <Text style={[styles.createButtonText, { color: colors.background }]}>
                    Create Account
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.backToLogin}
                onPress={() => router.back()}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Back to login"
              >
                <Text style={[styles.backToLoginText, { color: colors.textSecondary }]}>
                  Already have an account?{' '}
                  <Text style={{ color: colors.primary, fontWeight: '600' as const }}>Sign In</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 24,
  },
  formContainer: {
    maxWidth: 500,
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: 50,
    borderWidth: 1.5,
    borderRadius: 12,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500' as const,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingVertical: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  createButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  backToLogin: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backToLoginText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
