import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Briefcase } from 'lucide-react-native';

export default function EmployeeDashboard() {
  const { colors } = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerContent}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <Briefcase size={64} color={colors.primary} />
          </View>
          
          <Text style={[styles.title, { color: colors.text }]}>
            Employee Dashboard
          </Text>
          
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Coming Soon
          </Text>
          
          <View style={[styles.descriptionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              The Employee Dashboard is currently under development. This space will provide access to your training modules, progress tracking, and learning resources.
            </Text>
          </View>
          
          <View style={[styles.featureList, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              Upcoming Features:
            </Text>
            <View style={styles.featureItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                Access assigned training courses
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                Track your learning progress
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                View certificates and achievements
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>
                Complete compliance training
              </Text>
            </View>
          </View>
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
    flexGrow: 1,
    padding: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500' as const,
  },
  descriptionCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    width: '100%',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  featureList: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});
