import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Stack, router } from 'expo-router';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { ChevronDown, ChevronUp, ArrowLeft, BookOpen, TrendingUp } from 'lucide-react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TopicData {
  id: string;
  name: string;
  averageScore: number;
  completionRate: number;
  targetMet: number;
}

const mockTopics: TopicData[] = [
  { id: '1', name: 'Aims and Objectives', averageScore: 85, completionRate: 95, targetMet: 90 },
  { id: '2', name: 'Financial Data', averageScore: 62, completionRate: 78, targetMet: 45 },
  { id: '3', name: 'Market Research', averageScore: 78, completionRate: 88, targetMet: 75 },
  { id: '4', name: 'Business Planning', averageScore: 71, completionRate: 82, targetMet: 68 },
];

interface ClassDashboardProps {
  classId: string;
  className: string;
  onBack: () => void;
  onSetHomework: (topicId: string, task: string) => void;
  onViewProgress: () => void;
}

export default function ClassDashboard({ classId, className, onBack, onSetHomework, onViewProgress }: ClassDashboardProps) {
  const { colors, theme } = useThemeContext();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const toggleTopic = (topicId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={onBack}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <ArrowLeft size={24} color={colors.text} />
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: colors.text }]}>{className}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Class Overview
            </Text>
          </View>
        </View>

        <View style={[styles.aiInsightsCard, { backgroundColor: colors.card, borderColor: theme === 'dark' ? '#333333' : colors.border }]}>
          <View style={styles.insightsHeader}>
            <TrendingUp size={20} color={colors.primary} />
            <Text style={[styles.insightsTitle, { color: colors.text }]}>AI Insights</Text>
          </View>
          <Text style={[styles.insightsText, { color: colors.textSecondary }]}>
            60% of students seem to be struggling with Financial Data. However, 95% of students are receiving 80% or above in the Aims and Objectives quiz.
          </Text>
        </View>

        <View style={styles.topicsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Topics</Text>
          {mockTopics.map((topic) => (
            <TopicPanel
              key={topic.id}
              topic={topic}
              isExpanded={expandedTopic === topic.id}
              onToggle={() => toggleTopic(topic.id)}
              onSetHomework={onSetHomework}
              colors={colors}
              theme={theme}
            />
          ))}
        </View>

        <Pressable
          style={[styles.viewProgressButton, { backgroundColor: colors.primary }]}
          onPress={onViewProgress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="View students' progress"
        >
          <Text style={[styles.viewProgressText, { color: colors.background }]}>
            View Students' Progress
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

interface TopicPanelProps {
  topic: TopicData;
  isExpanded: boolean;
  onToggle: () => void;
  onSetHomework: (topicId: string, task: string) => void;
  colors: any;
  theme: 'light' | 'dark';
}

function TopicPanel({ topic, isExpanded, onToggle, onSetHomework, colors, theme }: TopicPanelProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return colors.success;
    if (score >= 60) return colors.warning;
    return colors.error;
  };

  return (
    <View style={[styles.topicPanel, { backgroundColor: colors.card, borderColor: theme === 'dark' ? '#333333' : colors.border }]}>
      <Pressable
        style={styles.topicHeader}
        onPress={onToggle}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${topic.name}, ${isExpanded ? 'collapse' : 'expand'}`}
      >
        <View style={styles.topicHeaderLeft}>
          <BookOpen size={20} color={colors.primary} />
          <Text style={[styles.topicName, { color: colors.text }]}>{topic.name}</Text>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <ChevronDown size={20} color={colors.textMuted} />
        </Animated.View>
      </Pressable>

      {isExpanded && (
        <View style={styles.topicContent}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Average Score</Text>
              <View style={styles.statValueRow}>
                <Text style={[styles.statValue, { color: getScoreColor(topic.averageScore) }]}>
                  {topic.averageScore}%
                </Text>
                <View style={styles.miniChart}>
                  <View style={[styles.miniChartBar, { backgroundColor: colors.surface }]}>
                    <View
                      style={[
                        styles.miniChartFill,
                        {
                          backgroundColor: getScoreColor(topic.averageScore),
                          width: `${topic.averageScore}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completion</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {topic.completionRate}%
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Target Met</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {topic.targetMet}%
              </Text>
            </View>
          </View>

          <Pressable
            style={[styles.setHomeworkButton, { backgroundColor: colors.primary }]}
            onPress={() => onSetHomework(topic.id, topic.name)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Set homework for ${topic.name}`}
          >
            <Text style={[styles.setHomeworkText, { color: colors.background }]}>
              Set Homework
            </Text>
          </Pressable>
        </View>
      )}
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
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
  },
  aiInsightsCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  insightsText: {
    fontSize: 14,
    lineHeight: 20,
  },
  topicsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginBottom: 16,
  },
  topicPanel: {
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  topicHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  topicName: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  topicContent: {
    padding: 16,
    paddingTop: 0,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  statValueRow: {
    gap: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  miniChart: {
    marginTop: 4,
  },
  miniChartBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  miniChartFill: {
    height: '100%',
    borderRadius: 3,
  },
  setHomeworkButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  setHomeworkText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  viewProgressButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  viewProgressText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
});
