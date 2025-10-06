import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useBusiness } from '@/contexts/BusinessContext';
import { courses } from '@/mocks/courses';
import { ArrowLeft, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react-native';

export default function CourseQuizScreen() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { employees, addCompletion } = useBusiness();
  const { courseId } = useLocalSearchParams<{ courseId: string }>();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const course = courses.find(c => c.id === courseId);
  const currentEmployee = employees.find(e => e.email === user?.email);

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

  const currentQuestion = course.quiz[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === course.quiz.length - 1;
  const hasAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!hasAnswered) {
      Alert.alert('Please select an answer', 'You must select an answer before continuing.');
      return;
    }

    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    course.quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / course.quiz.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    if (currentEmployee) {
      addCompletion(currentEmployee.id, course.id, finalScore, finalScore >= 80);
    }
  };

  const handleRetake = () => {
    router.back();
    Alert.alert(
      'Retake Course',
      'To retake the quiz, you must complete the course again from the beginning.',
      [{ text: 'OK' }]
    );
  };

  const handleViewCertificate = () => {
    router.push('/business/certificates' as any);
  };

  const handleBackToLibrary = () => {
    router.push('/dashboard/employee');
  };

  if (showResults) {
    const passed = score >= 80;

    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={{ width: 24 }} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Quiz Results</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.resultsContainer}>
            <View
              style={[
                styles.resultIcon,
                { backgroundColor: passed ? colors.success + '20' : colors.error + '20' },
              ]}
            >
              {passed ? (
                <Award size={64} color={colors.success} />
              ) : (
                <XCircle size={64} color={colors.error} />
              )}
            </View>

            <Text style={[styles.resultTitle, { color: colors.text }]}>
              {passed ? 'Congratulations!' : 'Not Quite There'}
            </Text>

            <Text style={[styles.resultSubtitle, { color: colors.textSecondary }]}>
              {passed
                ? 'You have successfully completed this course!'
                : 'You need 80% to pass. Keep learning and try again!'}
            </Text>

            <View style={[styles.scoreCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.scoreLabel, { color: colors.textMuted }]}>Your Score</Text>
              <Text
                style={[
                  styles.scoreValue,
                  { color: passed ? colors.success : colors.error },
                ]}
              >
                {score}%
              </Text>
              <Text style={[styles.scoreDetail, { color: colors.textSecondary }]}>
                {selectedAnswers.filter((ans, idx) => ans === course.quiz[idx].correctAnswer).length} out of{' '}
                {course.quiz.length} correct
              </Text>
            </View>

            {passed ? (
              <>
                <View style={[styles.passMessage, { backgroundColor: colors.success + '15', borderColor: colors.success }]}>
                  <CheckCircle size={20} color={colors.success} />
                  <Text style={[styles.passMessageText, { color: colors.success }]}>
                    Your certificate has been generated and is ready to download!
                  </Text>
                </View>

                <Pressable
                  style={[styles.actionButton, { backgroundColor: colors.primary }]}
                  onPress={handleViewCertificate}
                >
                  <Award size={20} color={colors.background} />
                  <Text style={[styles.actionButtonText, { color: colors.background }]}>
                    View Certificate
                  </Text>
                </Pressable>

                <Pressable
                  style={[styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={handleBackToLibrary}
                >
                  <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
                    Back to Library
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  style={[styles.actionButton, { backgroundColor: colors.primary }]}
                  onPress={handleRetake}
                >
                  <RotateCcw size={20} color={colors.background} />
                  <Text style={[styles.actionButtonText, { color: colors.background }]}>
                    Retake Course
                  </Text>
                </Pressable>

                <Pressable
                  style={[styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={handleBackToLibrary}
                >
                  <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
                    Back to Library
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Quiz</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
            Question {currentQuestionIndex + 1} of {course.quiz.length}
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
              width: `${((currentQuestionIndex + 1) / course.quiz.length) * 100}%`,
            },
          ]}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionContainer}>
          <Text style={[styles.questionText, { color: colors.text }]}>
            {currentQuestion.question}
          </Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;

              return (
                <Pressable
                  key={index}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor: isSelected ? colors.primary + '15' : colors.card,
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => handleSelectAnswer(index)}
                >
                  <View
                    style={[
                      styles.optionRadio,
                      {
                        borderColor: isSelected ? colors.primary : colors.border,
                        backgroundColor: isSelected ? colors.primary : 'transparent',
                      },
                    ]}
                  >
                    {isSelected && <View style={[styles.optionRadioInner, { backgroundColor: colors.background }]} />}
                  </View>
                  <Text style={[styles.optionText, { color: colors.text }]}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <Pressable
          style={[
            styles.submitButton,
            {
              backgroundColor: hasAnswered ? colors.primary : colors.surface,
              opacity: hasAnswered ? 1 : 0.5,
            },
          ]}
          onPress={handleNext}
          disabled={!hasAnswered}
        >
          <Text style={[styles.submitButtonText, { color: hasAnswered ? colors.background : colors.textMuted }]}>
            {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
          </Text>
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
  questionContainer: {
    gap: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 12,
  },
  optionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  resultsContainer: {
    alignItems: 'center',
    gap: 20,
  },
  resultIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  scoreCard: {
    width: '100%',
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: 'bold' as const,
  },
  scoreDetail: {
    fontSize: 15,
  },
  passMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
  },
  passMessageText: {
    fontSize: 14,
    fontWeight: '500' as const,
    flex: 1,
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
  },
  secondaryButtonText: {
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
