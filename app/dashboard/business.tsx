import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Download, Users, TrendingUp, Clock, Target } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function BusinessDashboard() {
  const { colors } = useThemeContext();

  const trainingStats = [
    { label: 'Active Employees', value: 247, icon: Users },
    { label: 'Courses Completed', value: 1834, icon: Target },
    { label: 'Training Hours', value: '2,456', icon: Clock },
    { label: 'Compliance Rate', value: '94%', icon: TrendingUp },
  ];

  const handleExportReport = () => {
    Alert.alert(
      'Export Training Report',
      'This would download a CSV file with training data in a real implementation.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Business Dashboard</Text>
          <View style={[styles.demoBadge, { backgroundColor: colors.warning }]}>
            <Text style={[styles.demoText, { color: colors.background }]}>DEMO DATA</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {trainingStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View
                key={index}
                style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <IconComponent size={24} color={colors.primary} />
                <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Training Overview</Text>
          <View style={[styles.overviewCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.overviewTitle, { color: colors.text }]}>Q4 2024 Training Summary</Text>
            <Text style={[styles.overviewDescription, { color: colors.textSecondary }]}>
              Your team has completed 1,834 training modules this quarter with an average score of 87%.
              Compliance training completion rate is at 94%, exceeding the target of 90%.
            </Text>
            
            <View style={styles.progressSection}>
              <Text style={[styles.progressTitle, { color: colors.text }]}>Department Progress</Text>
              
              <View style={styles.progressItem}>
                <Text style={[styles.departmentName, { color: colors.text }]}>Sales</Text>
                <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.success, width: '92%' }]} />
                </View>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>92%</Text>
              </View>
              
              <View style={styles.progressItem}>
                <Text style={[styles.departmentName, { color: colors.text }]}>Engineering</Text>
                <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.success, width: '98%' }]} />
                </View>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>98%</Text>
              </View>
              
              <View style={styles.progressItem}>
                <Text style={[styles.departmentName, { color: colors.text }]}>Marketing</Text>
                <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.warning, width: '85%' }]} />
                </View>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>85%</Text>
              </View>
              
              <View style={styles.progressItem}>
                <Text style={[styles.departmentName, { color: colors.text }]}>HR</Text>
                <View style={[styles.progressBar, { backgroundColor: colors.surface }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.success, width: '96%' }]} />
                </View>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>96%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions</Text>
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: colors.primary }]}
            onPress={handleExportReport}
          >
            <Download size={20} color={colors.background} />
            <Text style={[styles.exportButtonText, { color: colors.background }]}>
              Export Training Report (CSV)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
          <View style={[styles.activityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.activityItem}>
              <Text style={[styles.activityText, { color: colors.text }]}>
                Sarah Johnson completed "Data Privacy Fundamentals"
              </Text>
              <Text style={[styles.activityTime, { color: colors.textMuted }]}>2 hours ago</Text>
            </View>
            
            <View style={styles.activityItem}>
              <Text style={[styles.activityText, { color: colors.text }]}>
                Marketing team achieved 85% completion rate
              </Text>
              <Text style={[styles.activityTime, { color: colors.textMuted }]}>1 day ago</Text>
            </View>
            
            <View style={styles.activityItem}>
              <Text style={[styles.activityText, { color: colors.text }]}>
                New course "Cybersecurity Basics" was assigned
              </Text>
              <Text style={[styles.activityTime, { color: colors.textMuted }]}>3 days ago</Text>
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
    minWidth: 120,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    marginTop: 8,
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
  overviewCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },
  overviewDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  progressSection: {
    gap: 12,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  departmentName: {
    fontSize: 14,
    minWidth: 80,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    minWidth: 35,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  activityCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  activityText: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
  },
});