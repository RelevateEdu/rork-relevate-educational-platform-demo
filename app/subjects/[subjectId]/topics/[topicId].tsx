import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, BookOpen, Brain, MessageCircle, Users, Briefcase, Globe } from 'lucide-react-native';
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

export default function TopicPage() {
  const { colors } = useThemeContext();
  const { subjectId, topicId } = useLocalSearchParams<{ subjectId: string; topicId: string }>();
  
  const subject = subjectsData[subjectId as string];
  const topic = subject?.topics.find(t => t.id === topicId);
  
  if (!subject || !topic) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Topic not found</Text>
        </View>
      </View>
    );
  }
  
  const learningOptions = [
    {
      id: 'revise',
      title: 'Revise',
      description: 'Review key concepts and materials for this topic',
      icon: BookOpen,
      color: colors.primary,
      backgroundColor: colors.primary + '20',
    },
    {
      id: 'test',
      title: 'Test Your Knowledge',
      description: 'Take a quiz to assess your understanding',
      icon: Brain,
      color: colors.secondary,
      backgroundColor: colors.secondary + '20',
    },
    {
      id: 'ai-tutor',
      title: 'AI Tutor',
      description: 'Get personalized help from our AI assistant',
      icon: MessageCircle,
      color: colors.success,
      backgroundColor: colors.success + '20',
    },
  ];
  
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
          
          <View style={styles.topicInfo}>
            <Text style={[styles.subjectName, { color: colors.textSecondary }]}>{subject.name}</Text>
            <Text style={[styles.topicTitle, { color: colors.text }]}>{topic.name}</Text>
            <Text style={[styles.topicDescription, { color: colors.textSecondary }]}>
              {topic.description}
            </Text>
            
            <View style={styles.progressContainer}>
              <Text style={[styles.progressLabel, { color: colors.text }]}>Progress</Text>
              <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                <View
                  style={[
                    styles.progressFill,
                    { backgroundColor: colors.primary, width: `${topic.progress}%` },
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colors.primary }]}>
                {topic.progress}% complete
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Choose Your Learning Method</Text>
          <View style={styles.optionsContainer}>
            {learningOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.optionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => {
                    if (option.id === 'ai-tutor') {
                      router.push(`/subjects/${subjectId}/topics/${topicId}/ai-tutor`);
                    } else if (option.id === 'revise' && subjectId === 'business' && topicId === 'enterprise') {
                      router.push(`/subjects/${subjectId}/topics/${topicId}/games`);
                    } else {
                      // For demo purposes, show an alert or navigate to a placeholder
                      console.log(`Selected ${option.title} for ${topic.name}`);
                      // You could navigate to specific learning modules here
                      // router.push(`/subjects/${subjectId}/topics/${topicId}/${option.id}`);
                    }
                  }}
                >
                  <View style={[styles.optionIconContainer, { backgroundColor: option.backgroundColor }]}>
                    <IconComponent size={32} color={option.color} />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={[styles.optionTitle, { color: colors.text }]}>{option.title}</Text>
                    <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                      {option.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Stats</Text>
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: colors.primary }]}>12</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Study Sessions</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: colors.secondary }]}>8</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Quizzes Taken</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: colors.success }]}>85%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Average Score</Text>
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
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  topicInfo: {
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '500' as const,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  topicTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    marginBottom: 8,
    textAlign: 'center',
  },
  topicDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  optionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
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