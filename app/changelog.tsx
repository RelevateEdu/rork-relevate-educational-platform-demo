import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Calendar, Palette, UserCheck, FileText } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function ChangelogScreen() {
  const { colors } = useThemeContext();

  const changes = [
    {
      date: '2024-12-15',
      version: 'v1.2.0',
      icon: Palette,
      title: 'Added Light/Dark Mode',
      description: 'Users can now switch between light and dark themes. The preference is automatically saved and persists across sessions.',
      type: 'feature',
    },
    {
      date: '2024-12-10',
      version: 'v1.1.0',
      icon: UserCheck,
      title: 'Simplified Onboarding',
      description: 'Streamlined the user registration process with role-based dashboards. New users can now get started in under 2 minutes.',
      type: 'improvement',
    },
    {
      date: '2024-12-05',
      version: 'v1.0.1',
      icon: FileText,
      title: 'Past Papers on Quiz Screen',
      description: 'Past paper access is now available directly from the quiz interface, making it easier for students to practice with real exam questions.',
      type: 'feature',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return colors.success;
      case 'improvement':
        return colors.primary;
      case 'fix':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'feature':
        return 'New Feature';
      case 'improvement':
        return 'Improvement';
      case 'fix':
        return 'Bug Fix';
      default:
        return 'Update';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={[styles.title, { color: colors.text }]}>Changelog</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Stay up to date with the latest Relevate features and improvements
          </Text>
        </View>

        <View style={styles.timeline}>
          {changes.map((change, index) => {
            const IconComponent = change.icon;
            return (
              <View key={index} style={styles.changeItem}>
                <View style={styles.changeHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
                    <IconComponent size={20} color={colors.primary} />
                  </View>
                  <View style={styles.changeInfo}>
                    <View style={styles.changeTitleRow}>
                      <Text style={[styles.changeTitle, { color: colors.text }]}>
                        {change.title}
                      </Text>
                      <View style={[styles.typeBadge, { backgroundColor: getTypeColor(change.type) }]}>
                        <Text style={[styles.typeText, { color: colors.background }]}>
                          {getTypeLabel(change.type)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.changeMeta}>
                      <Text style={[styles.changeVersion, { color: colors.primary }]}>
                        {change.version}
                      </Text>
                      <Text style={[styles.changeDate, { color: colors.textMuted }]}>
                        {new Date(change.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={[styles.changeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.changeDescription, { color: colors.textSecondary }]}>
                    {change.description}
                  </Text>
                </View>
                
                {index < changes.length - 1 && (
                  <View style={[styles.timelineLine, { backgroundColor: colors.border }]} />
                )}
              </View>
            );
          })}
        </View>

        <View style={[styles.footer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Calendar size={20} color={colors.textMuted} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            More updates coming soon! Follow our progress and suggest features.
          </Text>
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
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 500,
  },
  timeline: {
    marginBottom: 32,
  },
  changeItem: {
    marginBottom: 24,
    position: 'relative',
  },
  changeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  changeInfo: {
    flex: 1,
  },
  changeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  changeTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
  changeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  changeVersion: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  changeDate: {
    fontSize: 14,
  },
  changeCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginLeft: 52,
  },
  changeDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  timelineLine: {
    position: 'absolute',
    left: 19,
    top: 60,
    width: 2,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  footerText: {
    fontSize: 14,
    flex: 1,
  },
});