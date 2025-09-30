import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { router, usePathname } from 'expo-router';


const { width } = Dimensions.get('window');
const isWeb = width > 768;

export default function HomeScreen() {
  const { colors } = useThemeContext();
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user && pathname === '/') {
      router.replace('/login');
    }
  }, [isLoading, user, pathname]);

  const products = [
    {
      title: 'Relevate for Colleges',
      description: 'Interactive, curriculum-mapped revision for A-level students. Gamified tools and analytics that help teachers track progress and boost outcomes.',
      route: '/pricing?plan=colleges',
      gradient: ['#3b82f6', '#8b5cf6'] as const,
    },
    {
      title: 'Relevate for Learners',
      description: 'Personalised study companion for individual students. Upload your course specs and let Relevate generate quizzes, flashcards, and study games that adapt to your learning style.',
      route: '/pricing?plan=personal',
      gradient: ['#8b5cf6', '#ec4899'] as const,
    },
    {
      title: 'Relevate for Businesses',
      description: 'Custom training from your own policies and materials. Relevate transforms employee briefs into interactive learning games, making compliance and skills training engaging and measurable.',
      route: '/pricing?plan=business',
      gradient: ['#10b981', '#3b82f6'] as const,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image 
            source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/5uhc470tk56yxk9vlq2he' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            Transform Learning with AI
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            Relevate creates personalized, engaging educational experiences for students, educators, and businesses.
          </Text>
        </View>

        <View style={[styles.productsContainer, isWeb && styles.productsWeb]}>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              route={product.route}
              gradient={product.gradient}
            />
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
  logo: {
    width: 500,
    height: 200,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 600,
  },
  productsContainer: {
    padding: 16,
  },
  productsWeb: {
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
  },
});