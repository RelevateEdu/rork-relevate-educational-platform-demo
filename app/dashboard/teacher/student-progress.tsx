import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { ArrowLeft, Download, ArrowUpDown } from 'lucide-react-native';

interface StudentData {
  id: string;
  name: string;
  completionRate: number;
  averageScore: number;
  topicScores: {
    [key: string]: number;
  };
}

const mockStudents: StudentData[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    completionRate: 95,
    averageScore: 85,
    topicScores: { 'Aims and Objectives': 90, 'Financial Data': 75, 'Market Research': 88, 'Business Planning': 87 },
  },
  {
    id: '2',
    name: 'Oliver Smith',
    completionRate: 78,
    averageScore: 72,
    topicScores: { 'Aims and Objectives': 82, 'Financial Data': 58, 'Market Research': 75, 'Business Planning': 73 },
  },
  {
    id: '3',
    name: 'Sophia Williams',
    completionRate: 100,
    averageScore: 92,
    topicScores: { 'Aims and Objectives': 95, 'Financial Data': 88, 'Market Research': 93, 'Business Planning': 92 },
  },
  {
    id: '4',
    name: 'James Brown',
    completionRate: 65,
    averageScore: 68,
    topicScores: { 'Aims and Objectives': 75, 'Financial Data': 52, 'Market Research': 70, 'Business Planning': 75 },
  },
  {
    id: '5',
    name: 'Isabella Davis',
    completionRate: 88,
    averageScore: 81,
    topicScores: { 'Aims and Objectives': 85, 'Financial Data': 72, 'Market Research': 84, 'Business Planning': 83 },
  },
];

type SortField = 'name' | 'completionRate' | 'averageScore';
type SortDirection = 'asc' | 'desc';

interface StudentProgressProps {
  className: string;
  onBack: () => void;
}

export default function StudentProgress({ className, onBack }: StudentProgressProps) {
  const { colors, theme } = useThemeContext();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedStudents = [...mockStudents].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else {
      comparison = a[sortField] - b[sortField];
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleExport = () => {
    console.log('Exporting data...');
    if (Platform.OS === 'web') {
      const csvContent = generateCSV(mockStudents);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${className}_progress.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.log('Export feature available on web');
    }
  };

  const generateCSV = (students: StudentData[]) => {
    const headers = ['Name', 'Completion %', 'Average Score', 'Aims and Objectives', 'Financial Data', 'Market Research', 'Business Planning'];
    const rows = students.map(s => [
      s.name,
      s.completionRate,
      s.averageScore,
      s.topicScores['Aims and Objectives'] || 0,
      s.topicScores['Financial Data'] || 0,
      s.topicScores['Market Research'] || 0,
      s.topicScores['Business Planning'] || 0,
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <View style={styles.content}>
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
            <Text style={[styles.title, { color: colors.text }]}>Student Progress</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{className}</Text>
          </View>
          <Pressable
            style={[styles.exportButton, { backgroundColor: colors.primary }]}
            onPress={handleExport}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Export data"
          >
            <Download size={18} color={colors.background} />
            <Text style={[styles.exportText, { color: colors.background }]}>Export</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tableContainer}>
            <View style={[styles.tableHeader, { backgroundColor: colors.surface, borderColor: theme === 'dark' ? '#333333' : colors.border }]}>
              <Pressable
                style={[styles.headerCell, styles.nameColumn]}
                onPress={() => handleSort('name')}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Sort by name"
              >
                <Text style={[styles.headerText, { color: colors.text }]}>Name</Text>
                <ArrowUpDown size={14} color={colors.textMuted} />
              </Pressable>
              <Pressable
                style={styles.headerCell}
                onPress={() => handleSort('completionRate')}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Sort by completion"
              >
                <Text style={[styles.headerText, { color: colors.text }]}>Completion %</Text>
                <ArrowUpDown size={14} color={colors.textMuted} />
              </Pressable>
              <Pressable
                style={styles.headerCell}
                onPress={() => handleSort('averageScore')}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Sort by average score"
              >
                <Text style={[styles.headerText, { color: colors.text }]}>Avg Score</Text>
                <ArrowUpDown size={14} color={colors.textMuted} />
              </Pressable>
              <View style={styles.headerCell}>
                <Text style={[styles.headerText, { color: colors.text }]}>Aims & Objectives</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={[styles.headerText, { color: colors.text }]}>Financial Data</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={[styles.headerText, { color: colors.text }]}>Market Research</Text>
              </View>
              <View style={styles.headerCell}>
                <Text style={[styles.headerText, { color: colors.text }]}>Business Planning</Text>
              </View>
            </View>

            <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={true}>
              {sortedStudents.map((student, index) => (
                <View
                  key={student.id}
                  style={[
                    styles.tableRow,
                    { backgroundColor: index % 2 === 0 ? colors.card : colors.surface, borderColor: theme === 'dark' ? '#333333' : colors.border },
                  ]}
                >
                  <View style={[styles.cell, styles.nameColumn]}>
                    <Text style={[styles.cellText, { color: colors.text }]}>{student.name}</Text>
                  </View>
                  <View style={styles.cell}>
                    <View style={styles.progressContainer}>
                      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              backgroundColor: student.completionRate >= 80 ? colors.success : student.completionRate >= 60 ? colors.warning : colors.error,
                              width: `${student.completionRate}%`,
                            },
                          ]}
                        />
                      </View>
                      <Text style={[styles.cellText, { color: colors.text }]}>{student.completionRate}%</Text>
                    </View>
                  </View>
                  <View style={styles.cell}>
                    <Text
                      style={[
                        styles.cellText,
                        styles.scoreText,
                        {
                          color: student.averageScore >= 80 ? colors.success : student.averageScore >= 60 ? colors.warning : colors.error,
                        },
                      ]}
                    >
                      {student.averageScore}%
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={[styles.cellText, { color: colors.text }]}>
                      {student.topicScores['Aims and Objectives']}%
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={[styles.cellText, { color: colors.text }]}>
                      {student.topicScores['Financial Data']}%
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={[styles.cellText, { color: colors.text }]}>
                      {student.topicScores['Market Research']}%
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={[styles.cellText, { color: colors.text }]}>
                      {student.topicScores['Business Planning']}%
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  exportText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  tableContainer: {
    minWidth: 900,
  },
  tableHeader: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerCell: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameColumn: {
    minWidth: 180,
  },
  headerText: {
    fontSize: 13,
    fontWeight: 'bold' as const,
  },
  tableBody: {
    maxHeight: 500,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
  },
  scoreText: {
    fontWeight: '600' as const,
  },
  progressContainer: {
    gap: 6,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
