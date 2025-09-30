import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { Users, TrendingUp, BookOpen, Award } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function TeacherDashboard() {
  const { colors } = useThemeContext();

  const classData = [
    { topic: 'Quadratic Equations', mastery: 85, students: 28 },
    { topic: 'Photosynthesis', mastery: 72, students: 25 },
    { topic: 'Chemical Bonding', mastery: 91, students: 30 },
    { topic: 'Cell Division', mastery: 68, students: 27 },
  ];

  const activityStats = [
    { label: 'Quizzes Completed', value: 1247 },
    { label: 'Study Sessions', value: 892 },
    { label: 'Questions Answered', value: 15634 },
    { label: 'Average Score', value: '78%' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Teacher Dashboard</Text>
          <View style={[styles.demoBadge, { backgroundColor: colors.warning }]}>
            <Text style={[styles.demoText, { color: colors.background }]}>DEMO DATA</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {activityStats.map((stat, index) => (
            <View
              key={index}
              style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Class Topic Mastery</Text>
          <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {classData.map((item, index) => (
              <View key={index} style={styles.topicRow}>
                <View style={styles.topicInfo}>
                  <Text style={[styles.topicName, { color: colors.text }]}>{item.topic}</Text>
                  <Text style={[styles.studentCount, { color: colors.textSecondary }]}>
                    {item.students} students
                  </Text>
                </View>
                <View style={styles.masteryContainer}>
                  <View style={[styles.masteryBar, { backgroundColor: colors.surface }]}>
                    <View
                      style={[
                        styles.masteryFill,
                        { 
                          backgroundColor: item.mastery > 80 ? colors.success : item.mastery > 60 ? colors.warning : colors.error,
                          width: `${item.mastery}%` 
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.masteryText, { color: colors.text }]}>{item.mastery}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <View style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Users size={24} color={colors.primary} />
              <Text style={[styles.actionTitle, { color: colors.text }]}>Manage Students</Text>
              <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>
                View and organize your classes
              </Text>
            </View>
            
            <View style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <BookOpen size={24} color={colors.secondary} />
              <Text style={[styles.actionTitle, { color: colors.text }]}>Create Assignment</Text>
              <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>
                Set up new learning activities
              </Text>
            </View>
            
            <View style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TrendingUp size={24} color={colors.success} />
              <Text style={[styles.actionTitle, { color: colors.text }]}>View Reports</Text>
              <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>
                Analyze student progress
              </Text>
            </View>
            
            <View style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Award size={24} color={colors.warning} />
              <Text style={[styles.actionTitle, { color: colors.text }]}>Achievements</Text>
              <Text style={[styles.actionDescription, { color: colors.textSecondary }]}>
                Reward student milestones
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  demoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  demoText: {
    fontSize: 12,
    fontWeight: 'bold' as const,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    minWidth: width > 768 ? 150 : 120,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    marginBottom: 16,
  },
  chartCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  topicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 2,
  },
  studentCount: {
    fontSize: 12,
  },
  masteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  masteryBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  masteryFill: {
    height: '100%',
    borderRadius: 3,
  },
  masteryText: {
    fontSize: 12,
    fontWeight: '600' as const,
    minWidth: 35,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: width > 768 ? 200 : 150,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
});