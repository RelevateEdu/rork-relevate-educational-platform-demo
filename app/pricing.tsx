import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const isWeb = width > 768;

export default function PricingScreen() {
  const { colors } = useThemeContext();

  const plans = [
    {
      name: 'Colleges',
      price: 'Per pupil',
      description: 'Perfect for schools and colleges',
      features: [
        'Curriculum mapping',
        'Class progress tracking',
        'Bulk student management',
        'Assessment analytics',
        'Teacher dashboard',
        'Priority support',
      ],
      buttonText: 'Request Demo',
      popular: false,
    },
    {
      name: 'Personal',
      price: '£20/month',
      description: 'For university students',
      features: [
        'Up to 3 specifications',
        'AI-powered explanations',
        'Personal progress tracking',
        'Past paper access',
        'Study reminders',
        'Mobile app access',
      ],
      buttonText: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Business',
      price: 'From £150/month',
      description: '12 seats included',
      features: [
        'Custom training content',
        'Employee progress tracking',
        'Compliance reporting',
        'Team management',
        'API access',
        'Dedicated support',
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={[styles.title, { color: colors.text }]}>Choose Your Plan</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Start your learning journey with the perfect plan for your needs
          </Text>
        </View>

        <View style={[styles.plansContainer, isWeb && styles.plansWeb]}>
          {plans.map((plan, index) => (
            <View
              key={index}
              style={[
                styles.planCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                plan.popular && { borderColor: colors.primary, borderWidth: 2 },
              ]}
            >
              {plan.popular && (
                <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.popularText, { color: colors.background }]}>Most Popular</Text>
                </View>
              )}
              
              <Text style={[styles.planName, { color: colors.text }]}>{plan.name}</Text>
              <Text style={[styles.planPrice, { color: colors.primary }]}>{plan.price}</Text>
              <Text style={[styles.planDescription, { color: colors.textSecondary }]}>
                {plan.description}
              </Text>

              <View style={styles.features}>
                {plan.features.map((feature, featureIndex) => (
                  <View key={featureIndex} style={styles.feature}>
                    <Check size={16} color={colors.success} />
                    <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.planButton,
                  { backgroundColor: plan.popular ? colors.primary : colors.surface },
                ]}
              >
                <Text
                  style={[
                    styles.planButtonText,
                    { color: plan.popular ? colors.background : colors.text },
                  ]}
                >
                  {plan.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  hero: {
    padding: 24,
    alignItems: 'center',
    paddingVertical: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 500,
  },
  plansContainer: {
    padding: 16,
    gap: 16,
  },
  plansWeb: {
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: 1000,
    alignSelf: 'center',
  },
  planCard: {
    flex: 1,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 24,
    right: 24,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  popularText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    marginBottom: 24,
  },
  features: {
    gap: 12,
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  planButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  planButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
});