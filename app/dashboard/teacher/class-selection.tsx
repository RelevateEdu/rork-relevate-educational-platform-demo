import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Animated } from 'react-native';
import { Stack, router } from 'expo-router';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Users, LogOut, Settings } from 'lucide-react-native';

interface ClassData {
  id: string;
  name: string;
  studentCount: number;
  subject: string;
}

const mockClasses: ClassData[] = [
  { id: '1', name: 'AS Business Class 1', studentCount: 28, subject: 'Business Studies' },
  { id: '2', name: 'A-Level Business Class 2', studentCount: 24, subject: 'Business Studies' },
  { id: '3', name: 'GCSE Business Class 3', studentCount: 30, subject: 'Business Studies' },
];

interface ClassSelectionProps {
  onSelectClass: (classId: string) => void;
}

export default function ClassSelection({ onSelectClass }: ClassSelectionProps) {
  const { colors, theme } = useThemeContext();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>My Classes</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Select a class to view details
            </Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => console.log('Settings')}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Settings"
            >
              <Settings size={20} color={colors.text} />
            </Pressable>
            <Pressable
              style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={handleLogout}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Log out"
            >
              <LogOut size={20} color={colors.error} />
            </Pressable>
          </View>
        </View>

        <View style={styles.classGrid}>
          {mockClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classData={classItem}
              onPress={() => onSelectClass(classItem.id)}
              colors={colors}
              theme={theme}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

interface ClassCardProps {
  classData: ClassData;
  onPress: () => void;
  colors: any;
  theme: 'light' | 'dark';
}

function ClassCard({ classData, onPress, colors, theme }: ClassCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={[
          styles.classCard,
          {
            backgroundColor: colors.card,
            borderColor: theme === 'dark' ? '#333333' : colors.border,
          },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${classData.name}, ${classData.studentCount} students`}
      >
        <View style={[styles.cardIconContainer, { backgroundColor: colors.primary + '15' }]}>
          <Users size={28} color={colors.primary} />
        </View>
        <View style={styles.cardContent}>
          <Text style={[styles.className, { color: colors.text }]}>{classData.name}</Text>
          <Text style={[styles.classSubject, { color: colors.textSecondary }]}>
            {classData.subject}
          </Text>
          <View style={styles.studentBadge}>
            <Users size={14} color={colors.textMuted} />
            <Text style={[styles.studentCount, { color: colors.textMuted }]}>
              {classData.studentCount} students
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
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
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classGrid: {
    gap: 16,
  },
  classCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    marginBottom: 4,
  },
  classSubject: {
    fontSize: 14,
    marginBottom: 8,
  },
  studentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  studentCount: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
});
