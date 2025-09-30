import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Shield, Users, Lock, Eye } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function AboutScreen() {
  const { colors } = useThemeContext();

  const privacyCommitments = [
    {
      icon: Shield,
      title: 'Data Minimisation',
      description: 'We only collect data that is essential for providing our educational services.',
    },
    {
      icon: Lock,
      title: 'Role-Based Access Control',
      description: 'Strict access controls ensure users only see data relevant to their role.',
    },
    {
      icon: Users,
      title: 'No Cross-Tenant Mixing',
      description: 'Student data from different institutions is completely isolated.',
    },
    {
      icon: Eye,
      title: 'Transparent Processing',
      description: 'Clear documentation of how we process and protect your data.',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={[styles.title, { color: colors.text }]}>About Relevate</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Transforming education through AI-powered personalized learning
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Mission</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            Relevate is dedicated to revolutionizing education by making learning more engaging, 
            personalized, and effective. We believe that every student deserves access to 
            high-quality educational content that adapts to their unique learning style and pace.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy & Data Protection</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We are committed to protecting your privacy and ensuring compliance with data 
            protection regulations including GDPR. Our platform is designed with privacy by design principles.
          </Text>
          
          <View style={styles.commitmentsGrid}>
            {privacyCommitments.map((commitment, index) => {
              const IconComponent = commitment.icon;
              return (
                <View
                  key={index}
                  style={[styles.commitmentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <IconComponent size={24} color={colors.primary} />
                  <Text style={[styles.commitmentTitle, { color: colors.text }]}>
                    {commitment.title}
                  </Text>
                  <Text style={[styles.commitmentDescription, { color: colors.textSecondary }]}>
                    {commitment.description}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>DPIA Commitments</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            Our Data Protection Impact Assessment (DPIA) process ensures that privacy risks 
            are identified and mitigated at every stage of product development. We regularly 
            review and update our privacy practices to maintain the highest standards of data protection.
          </Text>
          
          <View style={[styles.dpiaCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.dpiaTitle, { color: colors.text }]}>Key DPIA Elements</Text>
            <Text style={[styles.dpiaItem, { color: colors.textSecondary }]}>
              • Regular privacy risk assessments
            </Text>
            <Text style={[styles.dpiaItem, { color: colors.textSecondary }]}>
              • Automated data retention policies
            </Text>
            <Text style={[styles.dpiaItem, { color: colors.textSecondary }]}>
              • Encryption of all sensitive data
            </Text>
            <Text style={[styles.dpiaItem, { color: colors.textSecondary }]}>
              • Regular security audits and penetration testing
            </Text>
            <Text style={[styles.dpiaItem, { color: colors.textSecondary }]}>
              • Staff training on data protection best practices
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Us</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            Have questions about our privacy practices or want to learn more about Relevate? 
            We'd love to hear from you.
          </Text>
          <Text style={[styles.contact, { color: colors.primary }]}>
            Email: privacy@relevate.com
          </Text>
          <Text style={[styles.contact, { color: colors.primary }]}>
            Data Protection Officer: dpo@relevate.com
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
    padding: 20,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
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
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  commitmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
  },
  commitmentCard: {
    flex: 1,
    minWidth: 250,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  commitmentTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  commitmentDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  dpiaCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
  },
  dpiaTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 12,
  },
  dpiaItem: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  contact: {
    fontSize: 16,
    marginBottom: 8,
  },
});