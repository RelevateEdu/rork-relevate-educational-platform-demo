import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { BookOpen, Brain, FileText, Gamepad2 } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function StudentDashboard() {
  const { colors } = useThemeContext();

  const subjects = [
    { name: 'Business', progress: 65, topics: 8, id: 'business' },
    { name: 'ICT', progress: 80, topics: 6, id: 'ict' },
    { name: 'Digital Technology', progress: 55, topics: 6, id: 'digital-technology' },
    { name: 'Welsh', progress: 70, topics: 12, id: 'welsh' },
  ];



  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcome}>
          <Text style={[styles.welcomeTitle, { color: colors.text }]}>Welcome back!</Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>
            Ready to continue your learning journey?
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Subjects</Text>
          <View style={styles.subjectsGrid}>
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                style={[styles.subjectCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push(`/subjects/${subject.id}`)}
              >
                <BookOpen size={24} color={colors.primary} />
                <Text style={[styles.subjectName, { color: colors.text }]}>{subject.name}</Text>
                <Text style={[styles.subjectTopics, { color: colors.textSecondary }]}>
                  {subject.topics} topics
                </Text>
                <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { backgroundColor: colors.primary, width: `${subject.progress}%` },
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                  {subject.progress}% complete
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Quiz</Text>
          <View style={[styles.quizCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.quizHeader}>
              <Brain size={24} color={colors.secondary} />
              <Text style={[styles.quizTitle, { color: colors.text }]}>Test Your Knowledge</Text>
            </View>
            <Text style={[styles.quizDescription, { color: colors.textSecondary }]}>
              Answer 3 quick questions to reinforce your learning
            </Text>
            <TouchableOpacity style={[styles.quizButton, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.quizButtonText, { color: colors.background }]}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Assistant</Text>
          <View style={[styles.aiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.aiTitle, { color: colors.text }]}>Need help understanding something?</Text>
            <Text style={[styles.aiDescription, { color: colors.textSecondary }]}>
              Ask our AI to explain any concept in simple terms
            </Text>
            <TouchableOpacity style={[styles.aiButton, { backgroundColor: colors.primary }]}>
              <Text style={[styles.aiButtonText, { color: colors.background }]}>Explain This</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Learning Games</Text>
          <TouchableOpacity 
            style={[styles.gamesCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push('/subjects/business/topics/enterprise/games')}
          >
            <Gamepad2 size={24} color={colors.warning} />
            <View style={styles.gamesInfo}>
              <Text style={[styles.gamesTitle, { color: colors.text }]}>Play Learning Games</Text>
              <Text style={[styles.gamesDescription, { color: colors.textSecondary }]}>
                Interactive games to reinforce your learning
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Past Papers</Text>
          <TouchableOpacity style={[styles.paperCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <FileText size={24} color={colors.success} />
            <View style={styles.paperInfo}>
              <Text style={[styles.paperTitle, { color: colors.text }]}>Access Past Papers</Text>
              <Text style={[styles.paperDescription, { color: colors.textSecondary }]}>
                Practice with real exam questions
              </Text>
            </View>
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
  content: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    marginBottom: 16,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  subjectCard: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginTop: 8,
    marginBottom: 4,
  },
  subjectTopics: {
    fontSize: 12,
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
  },
  quizCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginLeft: 8,
  },
  quizDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  quizButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quizButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  aiCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  aiDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  aiButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  aiButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  paperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  paperInfo: {
    marginLeft: 12,
    flex: 1,
  },
  paperTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  paperDescription: {
    fontSize: 14,
  },
  gamesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  gamesInfo: {
    marginLeft: 12,
    flex: 1,
  },
  gamesTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  gamesDescription: {
    fontSize: 14,
  },
});