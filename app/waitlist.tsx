import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function ReferralScreen() {
  const { colors } = useThemeContext();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeAddress, setCollegeAddress] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!collegeAddress.trim()) {
      Alert.alert('Error', 'Please enter your college name and address');
      return;
    }
    if (!consentChecked) {
      Alert.alert('Error', 'Please agree to let Relevate contact your college');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mwprvdao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          college_address: collegeAddress,
          _subject: 'Relevate referral',
          _origin: 'rork-app',
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Referral submission error:', error);
      Alert.alert('Error', 'Could not send. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    router.push('/');
  };

  if (showSuccess) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header />
        
        <View style={styles.content}>
          <View style={[styles.successCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.successTitle, { color: colors.text }]}>Thank You!</Text>
            <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
              Thanks — we'll contact your college and keep you updated.
            </Text>
            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: colors.primary }]}
              onPress={handleDone}
            >
              <Text style={[styles.doneButtonText, { color: colors.background }]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={[styles.form, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Refer Your College</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Help us bring Relevate to your college. We'll reach out to them directly.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Full Name *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Email Address *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>College Name and Full Address *</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]}
              value={collegeAddress}
              onChangeText={setCollegeAddress}
              placeholder="Enter your college name and full address"
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setConsentChecked(!consentChecked)}
          >
            <View style={[styles.checkbox, { borderColor: colors.border, backgroundColor: consentChecked ? colors.primary : colors.surface }]}>
              {consentChecked && (
                <Text style={[styles.checkmark, { color: colors.background }]}>✓</Text>
              )}
            </View>
            <Text style={[styles.checkboxText, { color: colors.text }]}>
              I agree Relevate may contact my college. *
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: isLoading ? colors.textMuted : colors.primary }]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={[styles.submitButtonText, { color: colors.background }]}>
              {isLoading ? 'Submitting...' : 'Submit Referral'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  form: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 100,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold' as const,
  },
  checkboxText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  successCard: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  doneButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
});