import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MessageCircle, BookOpen, Users, Briefcase, Globe, Send } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useRorkAgent } from '@rork/toolkit-sdk';

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

export default function AITutorPage() {
  const { colors } = useThemeContext();
  const { subjectId, topicId } = useLocalSearchParams<{ subjectId: string; topicId: string }>();
  const [inputText, setInputText] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  
  const subject = subjectsData[subjectId as string];
  const topic = subject?.topics.find(t => t.id === topicId);
  
  const { messages, sendMessage: sendAIMessage } = useRorkAgent({ tools: {} });
  

  
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputText.trim() || !subject || !topic) return;
    
    const messageToSend = inputText.trim();
    setInputText('');
    
    try {
      const systemPrompt = `You are Relevate's study explainer for ${subject.name} - ${topic.name}. Help learners understand concepts step by step. Never give direct answers to graded exam questions. Be encouraging and educational.`;
      const fullMessage = messages.length === 0 
        ? `${systemPrompt}\n\nUser: ${messageToSend}`
        : messageToSend;
      await sendAIMessage(fullMessage);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };
  
  const isLoading = messages.length > 0 && messages[messages.length - 1]?.role === 'user';
  
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
  
  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
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
          <View style={styles.aiTutorBadge}>
            <MessageCircle size={16} color={colors.success} />
            <Text style={[styles.aiTutorText, { color: colors.success }]}>AI Tutor</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.chatContainer}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.filter(m => m.role !== 'system').length === 0 && (
            <View style={styles.welcomeContainer}>
              <MessageCircle size={48} color={colors.primary} />
              <Text style={[styles.welcomeTitle, { color: colors.text }]}>AI Tutor Ready</Text>
              <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>
                Ask me anything about {topic.name}. I&apos;m here to help you understand the concepts step by step.
              </Text>
            </View>
          )}
          
          {messages.filter(m => m.role !== 'system').map((message) => (
            <View key={message.id} style={[
              styles.messageContainer,
              message.role === 'user' ? styles.userMessage : styles.assistantMessage
            ]}>
              <View style={[
                styles.messageBubble,
                message.role === 'user' 
                  ? { backgroundColor: colors.primary } 
                  : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }
              ]}>
                {message.parts.map((part, i) => {
                  if (part.type === 'text') {
                    return (
                      <Text key={i} style={[
                        styles.messageText,
                        { color: message.role === 'user' ? '#ffffff' : colors.text }
                      ]}>
                        {part.text}
                      </Text>
                    );
                  }
                  return null;
                })}
              </View>
            </View>
          ))}
          
          {isLoading && (
            <View style={[styles.messageContainer, styles.assistantMessage]}>
              <View style={[styles.messageBubble, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}>
                <View style={styles.typingIndicator}>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={[styles.typingText, { color: colors.textSecondary }]}>AI is typing...</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        
        <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TextInput
            style={[styles.textInput, { color: colors.text, backgroundColor: colors.background, borderColor: colors.border }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Ask about ${topic.name}...`}
            placeholderTextColor={colors.textSecondary}
            multiline
            maxLength={500}
            onSubmitEditing={handleSendMessage}
            blurOnSubmit={false}
          />
          <TouchableOpacity 
            style={[styles.sendButton, { backgroundColor: inputText.trim() ? colors.primary : colors.border }]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <Send size={20} color={inputText.trim() ? '#ffffff' : colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  backButton: {
    marginBottom: 16,
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
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 8,
    textAlign: 'center',
  },
  aiTutorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  aiTutorText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  chatContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  messageContainer: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
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