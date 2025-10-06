import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Check } from 'lucide-react-native';

type PlanType = 'starter' | 'growth' | 'enterprise';

interface Plan {
  id: PlanType;
  name: string;
  price: string;
  pricePerEmployee: string;
  description: string;
  maxEmployees: string;
  features: string[];
  popular?: boolean;
}

export default function PlansScreen() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '£6.99',
      pricePerEmployee: 'per employee / month',
      description: 'Perfect for small teams getting started',
      maxEmployees: 'Up to 10 employees',
      features: [
        'Access to all training modules',
        'Progress tracking dashboard',
        'Basic analytics',
        'Email support',
        'Monthly reports',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '£6.49',
      pricePerEmployee: 'per employee / month',
      description: 'Ideal for growing businesses',
      maxEmployees: 'Up to 50 employees',
      features: [
        'Everything in Starter',
        'Advanced analytics',
        'Custom training paths',
        'Priority support',
        'Weekly reports',
        'Team management tools',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '£5.99',
      pricePerEmployee: 'per employee / month',
      description: 'For large organizations',
      maxEmployees: '50+ employees',
      features: [
        'Everything in Growth',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'Daily reports',
        'Advanced security features',
        'Unlimited training modules',
      ],
    },
  ];

  const handleSelectPlan = (planId: PlanType) => {
    router.push(`/signup-employer?plan=${planId}` as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: colors.text }]}>
            Choose your plan and start training your team
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select the perfect plan for your organization&apos;s needs
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <View
              key={plan.id}
              style={[
                styles.planCard,
                {
                  backgroundColor: colors.card,
                  borderColor: plan.popular ? colors.primary : colors.border,
                },
                plan.popular && styles.popularCard,
              ]}
            >
              {plan.popular && (
                <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.popularBadgeText, { color: colors.background }]}>
                    Most Popular
                  </Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={[styles.planName, { color: colors.text }]}>{plan.name}</Text>
                <Text style={[styles.planDescription, { color: colors.textSecondary }]}>
                  {plan.description}
                </Text>
              </View>

              <View style={styles.pricingSection}>
                <View style={styles.priceRow}>
                  <Text style={[styles.price, { color: colors.text }]}>{plan.price}</Text>
                  <Text style={[styles.priceUnit, { color: colors.textSecondary }]}>
                    {plan.pricePerEmployee}
                  </Text>
                </View>
                <Text style={[styles.maxEmployees, { color: colors.textMuted }]}>
                  {plan.maxEmployees}
                </Text>
              </View>

              <View style={styles.featuresSection}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <View style={[styles.checkIcon, { backgroundColor: colors.primary + '20' }]}>
                      <Check size={16} color={colors.primary} strokeWidth={3} />
                    </View>
                    <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>

              <Pressable
                style={[
                  styles.selectButton,
                  {
                    backgroundColor: plan.popular ? colors.primary : colors.card,
                    borderColor: colors.primary,
                  },
                  !plan.popular && styles.selectButtonOutline,
                ]}
                onPress={() => handleSelectPlan(plan.id)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Select ${plan.name} plan`}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    { color: plan.popular ? colors.background : colors.primary },
                  ]}
                >
                  Select Plan
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={[styles.footer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            All plans include a 14-day free trial. No credit card required.
          </Text>
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
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  plansContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 32,
  },
  planCard: {
    width: 340,
    borderRadius: 16,
    borderWidth: 2,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  popularCard: {
    borderWidth: 3,
    elevation: 8,
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 0,
    right: 0,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  popularBadgeText: {
    fontSize: 13,
    fontWeight: '700' as const,
    textAlign: 'center',
  },
  planHeader: {
    marginBottom: 20,
    marginTop: 8,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  pricingSection: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    marginRight: 8,
  },
  priceUnit: {
    fontSize: 14,
    lineHeight: 20,
  },
  maxEmployees: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  featuresSection: {
    marginBottom: 24,
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 24,
    flex: 1,
  },
  selectButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectButtonOutline: {
    borderWidth: 2,
    elevation: 0,
    shadowOpacity: 0,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  footer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
