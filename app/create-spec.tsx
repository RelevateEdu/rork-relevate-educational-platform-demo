import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Upload, CheckCircle, Play, FileText, Brain, Zap } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

type Step = 1 | 2 | 3;

export default function CreateSpecScreen() {
  const { colors } = useThemeContext();
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const mockTopics = [
    'Quadratic Equations and Functions',
    'Trigonometric Identities',
    'Calculus: Differentiation',
    'Calculus: Integration',
    'Statistics and Probability',
    'Vectors and Matrices',
  ];

  const mockQuiz = [
    {
      question: 'Solve for x: x² - 5x + 6 = 0',
      options: ['x = 2, 3', 'x = 1, 6', 'x = -2, -3', 'x = 0, 5'],
      correct: 0,
    },
    {
      question: 'What is the derivative of 3x² + 2x - 1?',
      options: ['6x + 2', '3x + 2', '6x - 1', '3x² + 2'],
      correct: 0,
    },
    {
      question: 'Calculate ∫(2x + 3)dx',
      options: ['x² + 3x + C', '2x² + 3x + C', 'x² + 3x', '2x + 3'],
      correct: 0,
    },
  ];

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Upload size={32} color={colors.primary} />
        <Text style={[styles.stepTitle, { color: colors.text }]}>Upload Specification</Text>
        <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
          Upload your curriculum specification document (PDF format)
        </Text>
      </View>

      <View style={[styles.uploadArea, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <FileText size={48} color={colors.textMuted} />
        <Text style={[styles.uploadText, { color: colors.text }]}>
          Drag and drop your PDF here
        </Text>
        <Text style={[styles.uploadSubtext, { color: colors.textMuted }]}>
          or click to browse files
        </Text>
        
        <TouchableOpacity
          style={[styles.uploadButton, { backgroundColor: colors.primary }]}
          onPress={() => setCurrentStep(2)}
        >
          <Text style={[styles.uploadButtonText, { color: colors.background }]}>
            Choose File
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.note, { color: colors.textMuted }]}>
        Demo: Click "Choose File" to proceed with sample data
      </Text>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <CheckCircle size={32} color={colors.success} />
        <Text style={[styles.stepTitle, { color: colors.text }]}>Review Extracted Topics</Text>
        <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
          Our AI has identified these key topics from your specification
        </Text>
      </View>

      <View style={[styles.topicsContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.topicsTitle, { color: colors.text }]}>Extracted Topics</Text>
        {mockTopics.map((topic, index) => (
          <View key={index} style={styles.topicItem}>
            <CheckCircle size={16} color={colors.success} />
            <Text style={[styles.topicText, { color: colors.text }]}>{topic}</Text>
          </View>
        ))}
      </View>

      <View style={styles.stepActions}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => setCurrentStep(1)}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => setCurrentStep(3)}
        >
          <Text style={[styles.primaryButtonText, { color: colors.background }]}>Generate Course</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Zap size={32} color={colors.secondary} />
        <Text style={[styles.stepTitle, { color: colors.text }]}>Course Generated!</Text>
        <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
          Your personalized course is ready with interactive quizzes and content
        </Text>
      </View>

      <View style={[styles.quizPreview, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.quizHeader}>
          <Brain size={24} color={colors.secondary} />
          <Text style={[styles.quizTitle, { color: colors.text }]}>Sample Quiz Questions</Text>
        </View>

        {mockQuiz.map((question, index) => (
          <View key={index} style={styles.questionItem}>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {index + 1}. {question.question}
            </Text>
            <View style={styles.optionsContainer}>
              {question.options.map((option, optionIndex) => (
                <View
                  key={optionIndex}
                  style={[
                    styles.option,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    optionIndex === question.correct && { backgroundColor: colors.success + '20', borderColor: colors.success },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: optionIndex === question.correct ? colors.success : colors.text },
                    ]}
                  >
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.stepActions}>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => setCurrentStep(1)}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Start Over</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.secondary }]}>
          <Play size={16} color={colors.background} />
          <Text style={[styles.primaryButtonText, { color: colors.background }]}>Start Learning</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressTitle, { color: colors.text }]}>Create from Specification</Text>
          
          <View style={styles.progressBar}>
            {[1, 2, 3].map((step) => (
              <View key={step} style={styles.progressStep}>
                <View
                  style={[
                    styles.progressDot,
                    {
                      backgroundColor: step <= currentStep ? colors.primary : colors.surface,
                      borderColor: step <= currentStep ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.progressDotText,
                      { color: step <= currentStep ? colors.background : colors.textMuted },
                    ]}
                  >
                    {step}
                  </Text>
                </View>
                {step < 3 && (
                  <View
                    style={[
                      styles.progressLine,
                      { backgroundColor: step < currentStep ? colors.primary : colors.border },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
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
  progressContainer: {
    marginBottom: 32,
  },
  progressTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 24,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotText: {
    fontSize: 14,
    fontWeight: 'bold' as const,
  },
  progressLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  stepContent: {
    alignItems: 'center',
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginTop: 16,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  uploadArea: {
    width: '100%',
    maxWidth: 400,
    padding: 40,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginTop: 16,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 14,
    marginBottom: 24,
  },
  uploadButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  note: {
    fontSize: 12,
    fontStyle: 'italic' as const,
    textAlign: 'center',
  },
  topicsContainer: {
    width: '100%',
    maxWidth: 500,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32,
  },
  topicsTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    marginBottom: 16,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  topicText: {
    fontSize: 14,
    flex: 1,
  },
  quizPreview: {
    width: '100%',
    maxWidth: 600,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  questionItem: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
  },
  stepActions: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
});