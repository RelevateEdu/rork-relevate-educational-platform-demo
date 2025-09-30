import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, BookOpen, Users, Briefcase, Globe } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

interface Topic {
  id: string;
  name: string;
  description: string;
  progress: number;
}

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  topics: Topic[];
}

const subjectsData: Record<string, Subject> = {
  business: {
    id: 'business',
    name: 'Business',
    description: 'Learn about enterprise, business planning, and market dynamics',
    icon: Briefcase,
    topics: [
      { id: 'enterprise', name: 'Enterprise', description: 'Understanding entrepreneurship and business ventures', progress: 75 },
      { id: 'business-plans', name: 'Business Plans', description: 'Creating comprehensive business strategies', progress: 60 },
      { id: 'markets', name: 'Markets', description: 'Market analysis and understanding consumer behavior', progress: 80 },
      { id: 'market-research', name: 'Market Research', description: 'Techniques for gathering market intelligence', progress: 45 },
      { id: 'business-structure', name: 'Business Structure', description: 'Different types of business organizations', progress: 90 },
      { id: 'business-location', name: 'Business Location', description: 'Factors affecting business location decisions', progress: 55 },
      { id: 'business-finance', name: 'Business Finance', description: 'Financial management and funding sources', progress: 70 },
      { id: 'business-costs', name: 'Business Costs', description: 'Understanding fixed and variable costs', progress: 85 },
    ],
  },
  ict: {
    id: 'ict',
    name: 'ICT',
    description: 'Information and Communication Technology fundamentals',
    icon: Users,
    topics: [
      { id: 'data-information-knowledge', name: 'Data/Information/Knowledge', description: 'Understanding the hierarchy of data processing', progress: 85 },
      { id: 'value-of-data', name: 'Value of Data', description: 'How data creates business value', progress: 70 },
      { id: 'quality-of-information', name: 'Quality of Information', description: 'Characteristics of high-quality information', progress: 90 },
      { id: 'validation-verification', name: 'Validation/Verification', description: 'Ensuring data accuracy and integrity', progress: 65 },
      { id: 'capabilities-of-ict', name: 'Capabilities of ICT', description: 'What ICT systems can achieve', progress: 80 },
      { id: 'limitations-of-ict', name: 'Limitations of ICT', description: 'Understanding ICT constraints and challenges', progress: 75 },
    ],
  },
  'digital-technology': {
    id: 'digital-technology',
    name: 'Digital Technology',
    description: 'Modern digital systems and emerging technologies',
    icon: Globe,
    topics: [
      { id: 'connected-systems', name: 'Connected Systems', description: 'Networks and interconnected digital systems', progress: 60 },
      { id: 'development-of-ai', name: 'Development of AI', description: 'Artificial intelligence evolution and applications', progress: 45 },
      { id: 'development-life-cycles', name: 'Development Life-cycles', description: 'Software and system development methodologies', progress: 70 },
      { id: 'user-centred-design', name: 'User-centred Design', description: 'Designing with the user in mind', progress: 85 },
      { id: 'human-computer-interaction', name: 'Human Computer Interaction', description: 'How humans interact with computers', progress: 55 },
      { id: 'functions-uses-social-media', name: 'Functions/Uses of Social Media', description: 'Social media platforms and their impact', progress: 90 },
    ],
  },
  welsh: {
    id: 'welsh',
    name: 'Welsh',
    description: 'Welsh language and culture studies',
    icon: BookOpen,
    topics: [
      { id: 'basic-vocabulary', name: 'Basic Vocabulary', description: 'Essential Welsh words and phrases', progress: 80 },
      { id: 'grammar-fundamentals', name: 'Grammar Fundamentals', description: 'Welsh grammar rules and structure', progress: 65 },
      { id: 'conversation-skills', name: 'Conversation Skills', description: 'Practical speaking and listening', progress: 70 },
      { id: 'reading-comprehension', name: 'Reading Comprehension', description: 'Understanding Welsh texts', progress: 75 },
      { id: 'writing-skills', name: 'Writing Skills', description: 'Expressing ideas in written Welsh', progress: 60 },
      { id: 'welsh-culture', name: 'Welsh Culture', description: 'History and traditions of Wales', progress: 85 },
      { id: 'literature', name: 'Literature', description: 'Welsh poetry and prose', progress: 55 },
      { id: 'pronunciation', name: 'Pronunciation', description: 'Correct Welsh pronunciation', progress: 70 },
      { id: 'idioms-expressions', name: 'Idioms & Expressions', description: 'Common Welsh sayings and expressions', progress: 50 },
      { id: 'formal-informal', name: 'Formal & Informal Language', description: 'Appropriate language for different contexts', progress: 65 },
      { id: 'regional-dialects', name: 'Regional Dialects', description: 'Variations in Welsh across regions', progress: 40 },
      { id: 'modern-welsh', name: 'Modern Welsh', description: 'Contemporary Welsh language usage', progress: 75 },
    ],
  },
};

export default function SubjectPage() {
  const { colors } = useThemeContext();
  const { subjectId } = useLocalSearchParams<{ subjectId: string }>();
  
  const subject = subjectsData[subjectId as string];
  
  if (!subject) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Subject not found</Text>
        </View>
      </View>
    );
  }
  
  const IconComponent = subject.icon;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.subjectInfo}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
              <IconComponent size={32} color={colors.primary} />
            </View>
            <Text style={[styles.subjectTitle, { color: colors.text }]}>{subject.name}</Text>
            <Text style={[styles.subjectDescription, { color: colors.textSecondary }]}>
              {subject.description}
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Topics</Text>
          <View style={styles.topicsContainer}>
            {subject.topics.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                style={[styles.topicCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push(`/subjects/${subjectId}/topics/${topic.id}`)}
              >
                <View style={styles.topicHeader}>
                  <Text style={[styles.topicName, { color: colors.text }]}>{topic.name}</Text>
                  <Text style={[styles.topicProgress, { color: colors.primary }]}>
                    {topic.progress}%
                  </Text>
                </View>
                <Text style={[styles.topicDescription, { color: colors.textSecondary }]}>
                  {topic.description}
                </Text>
                <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { backgroundColor: colors.primary, width: `${topic.progress}%` },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))}
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
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  subjectInfo: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  subjectTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  subjectDescription: {
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
  topicsContainer: {
    gap: 16,
  },
  topicCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicName: {
    fontSize: 18,
    fontWeight: '600' as const,
    flex: 1,
  },
  topicProgress: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  topicDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
});