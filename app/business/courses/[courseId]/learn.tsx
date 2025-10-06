import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';
import { courses } from '@/mocks/courses';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react-native';

export default function CourseLearningScreen() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const course = courses.find(c => c.id === courseId);

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

  const currentPage = course.pages[currentPageIndex];
  const isLastPage = currentPageIndex === course.pages.length - 1;
  const isFirstPage = currentPageIndex === 0;

  const handleNext = () => {
    if (isLastPage) {
      router.push(`/business/courses/${courseId}/quiz` as any);
    } else {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstPage) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
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
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
            {course.title}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
            Lesson {currentPageIndex + 1} of {course.pages.length}
          </Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: colors.primary,
              width: `${((currentPageIndex + 1) / course.pages.length) * 100}%`,
            },
          ]}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageContent}>
          <Text style={[styles.pageTitle, { color: colors.text }]}>
            {currentPage.title}
          </Text>

          <Text style={[styles.pageText, { color: colors.textSecondary }]}>
            {currentPage.content}
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <Pressable
          style={[
            styles.navButton,
            styles.previousButton,
            {
              backgroundColor: isFirstPage ? colors.surface : colors.card,
              borderColor: colors.border,
              opacity: isFirstPage ? 0.5 : 1,
            },
          ]}
          onPress={handlePrevious}
          disabled={isFirstPage}
        >
          <ArrowLeft size={20} color={colors.text} />
          <Text style={[styles.navButtonText, { color: colors.text }]}>Previous</Text>
        </Pressable>

        <Pressable
          style={[styles.navButton, styles.nextButton, { backgroundColor: colors.primary }]}
          onPress={handleNext}
        >
          <Text style={[styles.navButtonText, { color: colors.background }]}>
            {isLastPage ? 'Start Quiz' : 'Next'}
          </Text>
          {isLastPage ? (
            <CheckCircle size={20} color={colors.background} />
          ) : (
            <ArrowRight size={20} color={colors.background} />
          )}
        </Pressable>
      </View>
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  progressBar: {
    height: 4,
  },
  progressFill: {
    height: '100%',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  pageContent: {
    gap: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  pageText: {
    fontSize: 16,
    lineHeight: 26,
    whiteSpace: 'pre-line' as any,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
  },
  previousButton: {
    borderWidth: 1,
  },
  nextButton: {},
  navButtonText: {
    fontSize: 16,
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
