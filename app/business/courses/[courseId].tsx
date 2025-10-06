import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';
import { courses } from '@/mocks/courses';
import { ArrowLeft, Clock, BookOpen, Award, CheckCircle } from 'lucide-react-native';

export default function CourseWelcomeScreen() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const [showStartButton, setShowStartButton] = useState(false);

  const course = courses.find(c => c.id === courseId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartButton(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Course not found</Text>
        </View>
      </View>
    );
  }

  const handleStartCourse = () => {
    router.push(`/business/courses/${courseId}/learn` as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {course.title}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: course.imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.welcomeSection}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.categoryBadgeText, { color: colors.primary }]}>
              {course.category}
            </Text>
          </View>

          <Text style={[styles.courseTitle, { color: colors.text }]}>
            Welcome to {course.title}
          </Text>

          <Text style={[styles.courseDescription, { color: colors.textSecondary }]}>
            {course.description}
          </Text>

          <View style={styles.metaRow}>
            <View style={[styles.metaCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Clock size={20} color={colors.primary} />
              <Text style={[styles.metaValue, { color: colors.text }]}>{course.estimatedMinutes} min</Text>
              <Text style={[styles.metaLabel, { color: colors.textMuted }]}>Duration</Text>
            </View>

            <View style={[styles.metaCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <BookOpen size={20} color={colors.primary} />
              <Text style={[styles.metaValue, { color: colors.text }]}>{course.pages.length}</Text>
              <Text style={[styles.metaLabel, { color: colors.textMuted }]}>Lessons</Text>
            </View>

            <View style={[styles.metaCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Award size={20} color={colors.primary} />
              <Text style={[styles.metaValue, { color: colors.text }]}>{course.quiz.length}</Text>
              <Text style={[styles.metaLabel, { color: colors.textMuted }]}>Questions</Text>
            </View>
          </View>

          <View style={[styles.learningSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.learningTitle, { color: colors.text }]}>
              What you&apos;ll learn:
            </Text>
            <View style={styles.learningPoints}>
              {course.learningPoints.map((point, index) => (
                <View key={index} style={styles.learningPoint}>
                  <CheckCircle size={18} color={colors.success} />
                  <Text style={[styles.learningPointText, { color: colors.textSecondary }]}>
                    {point}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {showStartButton ? (
            <Pressable
              style={[styles.startButton, { backgroundColor: colors.primary }]}
              onPress={handleStartCourse}
            >
              <Text style={[styles.startButtonText, { color: colors.background }]}>
                Start this course
              </Text>
            </Pressable>
          ) : (
            <View style={[styles.loadingButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.loadingButtonText, { color: colors.textMuted }]}>
                Loading course...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  heroImage: {
    width: '100%',
    height: 240,
  },
  welcomeSection: {
    padding: 24,
    gap: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryBadgeText: {
    fontSize: 13,
    fontWeight: '600' as const,
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 36,
  },
  courseDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  metaValue: {
    fontSize: 20,
    fontWeight: 'bold' as const,
  },
  metaLabel: {
    fontSize: 12,
  },
  learningSection: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
  learningTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  learningPoints: {
    gap: 12,
  },
  learningPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  learningPointText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  startButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: '600' as const,
  },
  loadingButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 1,
  },
  loadingButtonText: {
    fontSize: 17,
    fontWeight: '600' as const,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
  },
});
