import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useBusiness } from '@/contexts/BusinessContext';
import { courses } from '@/mocks/courses';
import { 
  Users, 
  Plus, 
  X, 
  BookOpen, 
  Award, 
  Download, 
  ChevronDown, 
  ChevronUp,
  UserCheck,
  UserX,
  Mail,
  Trash2,
} from 'lucide-react-native';

export default function EmployerDashboard() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const { 
    company, 
    employees, 
    completions, 
    addEmployee, 
    updateEmployeeStatus,
    assignCourse,
    unassignCourse,
    isNewCompletion,
  } = useBusiness();

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAssignCourse, setShowAssignCourse] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);

  const handleAddEmployee = async () => {
    if (!newEmployeeName.trim() || !newEmployeeEmail.trim()) {
      Alert.alert('Error', 'Please enter both name and email');
      return;
    }

    await addEmployee(newEmployeeName, newEmployeeEmail);
    setNewEmployeeName('');
    setNewEmployeeEmail('');
    setShowAddEmployee(false);
    Alert.alert('Success', 'Employee invited successfully');
  };

  const handleToggleEmployeeStatus = async (employeeId: string, currentStatus: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;

    if (currentStatus === 'deactivated') {
      await updateEmployeeStatus(employeeId, 'active');
      Alert.alert('Success', `${employee.name} has been reactivated`);
    } else {
      Alert.alert(
        'Deactivate Employee',
        `Are you sure you want to deactivate ${employee.name}? They will lose access to courses but can still download certificates.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Deactivate',
            style: 'destructive',
            onPress: async () => {
              await updateEmployeeStatus(employeeId, 'deactivated');
            },
          },
        ]
      );
    }
  };

  const handleAssignCourse = async (courseId: string) => {
    if (!selectedEmployee) return;
    await assignCourse(selectedEmployee, courseId);
    Alert.alert('Success', 'Course assigned successfully');
  };

  const handleUnassignCourse = async (employeeId: string, courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    Alert.alert(
      'Unassign Course',
      `Remove ${course?.title} from this employee?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await unassignCourse(employeeId, courseId);
          },
        },
      ]
    );
  };

  const handleDownloadCertificate = (completionId: string) => {
    Alert.alert('Download Certificate', 'Certificate download functionality will be implemented with PDF generation.');
  };

  const handleExportCSV = () => {
    Alert.alert('Export Data', 'CSV export functionality will be implemented.');
  };

  const passedCompletions = completions.filter(c => c.passed);
  const activeEmployees = employees.filter(e => e.status === 'active').length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <View>
            <Text style={[styles.companyName, { color: colors.text }]}>
              {company.name}
            </Text>
            <Text style={[styles.planBadge, { color: colors.primary }]}>
              {company.plan.charAt(0).toUpperCase() + company.plan.slice(1)} Plan
            </Text>
          </View>
          
          <Pressable
            style={[styles.myLearningButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/dashboard/employee')}
          >
            <BookOpen size={18} color={colors.background} />
            <Text style={[styles.myLearningText, { color: colors.background }]}>
              My Learning
            </Text>
          </Pressable>
        </View>

        <View style={[styles.statsRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.statItem}>
            <Users size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{activeEmployees}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Employees</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Award size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{passedCompletions.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Certificates Earned</Text>
          </View>
        </View>

        <View style={[styles.panel, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.panelHeader}>
            <View style={styles.panelTitleRow}>
              <Users size={22} color={colors.primary} />
              <Text style={[styles.panelTitle, { color: colors.text }]}>Team & Assignments</Text>
            </View>
            <Pressable
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowAddEmployee(true)}
            >
              <Plus size={18} color={colors.background} />
              <Text style={[styles.addButtonText, { color: colors.background }]}>Add Employee</Text>
            </Pressable>
          </View>

          <View style={styles.employeeList}>
            {employees.map((employee) => {
              const isExpanded = expandedEmployee === employee.id;
              const assignedCoursesList = employee.assignedCourses
                .map(courseId => courses.find(c => c.id === courseId))
                .filter(Boolean);

              return (
                <View
                  key={employee.id}
                  style={[styles.employeeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                >
                  <Pressable
                    style={styles.employeeHeader}
                    onPress={() => setExpandedEmployee(isExpanded ? null : employee.id)}
                  >
                    <View style={styles.employeeInfo}>
                      <Text style={[styles.employeeName, { color: colors.text }]}>
                        {employee.name}
                      </Text>
                      <Text style={[styles.employeeEmail, { color: colors.textSecondary }]}>
                        {employee.email}
                      </Text>
                      <View style={styles.statusRow}>
                        <View
                          style={[
                            styles.statusBadge,
                            {
                              backgroundColor:
                                employee.status === 'active'
                                  ? colors.success + '20'
                                  : employee.status === 'invited'
                                  ? colors.warning + '20'
                                  : colors.error + '20',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusText,
                              {
                                color:
                                  employee.status === 'active'
                                    ? colors.success
                                    : employee.status === 'invited'
                                    ? colors.warning
                                    : colors.error,
                              },
                            ]}
                          >
                            {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                          </Text>
                        </View>
                        <Text style={[styles.courseCount, { color: colors.textMuted }]}>
                          {employee.assignedCourses.length} courses assigned
                        </Text>
                      </View>
                    </View>
                    {isExpanded ? (
                      <ChevronUp size={20} color={colors.textMuted} />
                    ) : (
                      <ChevronDown size={20} color={colors.textMuted} />
                    )}
                  </Pressable>

                  {isExpanded && (
                    <View style={styles.employeeDetails}>
                      <View style={styles.actionsRow}>
                        <Pressable
                          style={[styles.actionButton, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}
                          onPress={() => {
                            setSelectedEmployee(employee.id);
                            setShowAssignCourse(true);
                          }}
                        >
                          <Plus size={16} color={colors.primary} />
                          <Text style={[styles.actionButtonText, { color: colors.primary }]}>
                            Assign Course
                          </Text>
                        </Pressable>

                        <Pressable
                          style={[
                            styles.actionButton,
                            {
                              backgroundColor:
                                employee.status === 'deactivated'
                                  ? colors.success + '15'
                                  : colors.error + '15',
                              borderColor:
                                employee.status === 'deactivated' ? colors.success : colors.error,
                            },
                          ]}
                          onPress={() => handleToggleEmployeeStatus(employee.id, employee.status)}
                        >
                          {employee.status === 'deactivated' ? (
                            <UserCheck size={16} color={colors.success} />
                          ) : (
                            <UserX size={16} color={colors.error} />
                          )}
                          <Text
                            style={[
                              styles.actionButtonText,
                              {
                                color:
                                  employee.status === 'deactivated' ? colors.success : colors.error,
                              },
                            ]}
                          >
                            {employee.status === 'deactivated' ? 'Reactivate' : 'Deactivate'}
                          </Text>
                        </Pressable>
                      </View>

                      {assignedCoursesList.length > 0 ? (
                        <View style={styles.assignedCourses}>
                          <Text style={[styles.assignedCoursesTitle, { color: colors.text }]}>
                            Assigned Courses:
                          </Text>
                          {assignedCoursesList.map((course) => (
                            <View
                              key={course!.id}
                              style={[styles.assignedCourseItem, { backgroundColor: colors.background, borderColor: colors.border }]}
                            >
                              <View style={styles.assignedCourseInfo}>
                                <Text style={[styles.assignedCourseTitle, { color: colors.text }]}>
                                  {course!.title}
                                </Text>
                                <Text style={[styles.assignedCourseCategory, { color: colors.textMuted }]}>
                                  {course!.category}
                                </Text>
                              </View>
                              <Pressable
                                onPress={() => handleUnassignCourse(employee.id, course!.id)}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                              >
                                <Trash2 size={18} color={colors.error} />
                              </Pressable>
                            </View>
                          ))}
                        </View>
                      ) : (
                        <Text style={[styles.noCoursesText, { color: colors.textMuted }]}>
                          No courses assigned yet
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.panel, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.panelHeader}>
            <View style={styles.panelTitleRow}>
              <Award size={22} color={colors.primary} />
              <Text style={[styles.panelTitle, { color: colors.text }]}>Completions & Certificates</Text>
            </View>
            <Pressable
              style={[styles.exportButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={handleExportCSV}
            >
              <Download size={18} color={colors.primary} />
              <Text style={[styles.exportButtonText, { color: colors.primary }]}>Export CSV</Text>
            </Pressable>
          </View>

          {passedCompletions.length > 0 ? (
            <View style={styles.completionsTable}>
              <View style={[styles.tableHeader, { backgroundColor: colors.surface }]}>
                <Text style={[styles.tableHeaderText, { color: colors.text, flex: 2 }]}>Employee</Text>
                <Text style={[styles.tableHeaderText, { color: colors.text, flex: 2 }]}>Course</Text>
                <Text style={[styles.tableHeaderText, { color: colors.text, flex: 1 }]}>Score</Text>
                <Text style={[styles.tableHeaderText, { color: colors.text, flex: 1 }]}>Date</Text>
                <Text style={[styles.tableHeaderText, { color: colors.text, flex: 1 }]}>Action</Text>
              </View>

              {passedCompletions.map((completion) => (
                <View
                  key={completion.id}
                  style={[styles.tableRow, { borderBottomColor: colors.border }]}
                >
                  <View style={[styles.tableCell, { flex: 2 }]}>
                    <Text style={[styles.tableCellText, { color: colors.text }]}>
                      {completion.employeeName}
                    </Text>
                    {isNewCompletion(completion.completedDate) && (
                      <View style={[styles.newBadge, { backgroundColor: colors.primary }]}>
                        <Text style={[styles.newBadgeText, { color: colors.background }]}>New</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.tableCellText, { color: colors.text, flex: 2 }]}>
                    {completion.courseTitle}
                  </Text>
                  <Text style={[styles.tableCellText, { color: colors.success, flex: 1, fontWeight: '600' as const }]}>
                    {completion.score}%
                  </Text>
                  <Text style={[styles.tableCellText, { color: colors.textSecondary, flex: 1 }]}>
                    {new Date(completion.completedDate).toLocaleDateString()}
                  </Text>
                  <Pressable
                    style={[styles.downloadButton, { flex: 1 }]}
                    onPress={() => handleDownloadCertificate(completion.id)}
                  >
                    <Download size={16} color={colors.primary} />
                  </Pressable>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Award size={48} color={colors.textMuted} />
              <Text style={[styles.emptyStateText, { color: colors.textMuted }]}>
                No certificates earned yet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showAddEmployee}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddEmployee(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Add Employee</Text>
              <Pressable onPress={() => setShowAddEmployee(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <X size={24} color={colors.textMuted} />
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Name</Text>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  value={newEmployeeName}
                  onChangeText={setNewEmployeeName}
                  placeholder="Enter employee name"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Email</Text>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                  value={newEmployeeEmail}
                  onChangeText={setNewEmployeeEmail}
                  placeholder="Enter employee email"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.modalActions}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  onPress={() => setShowAddEmployee(false)}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.confirmButton, { backgroundColor: colors.primary }]}
                  onPress={handleAddEmployee}
                >
                  <Mail size={18} color={colors.background} />
                  <Text style={[styles.confirmButtonText, { color: colors.background }]}>Send Invite</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAssignCourse}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAssignCourse(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.largeModal, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Assign Course</Text>
              <Pressable onPress={() => setShowAssignCourse(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <X size={24} color={colors.textMuted} />
              </Pressable>
            </View>

            <ScrollView style={styles.courseList} showsVerticalScrollIndicator={false}>
              {courses.map((course) => (
                <Pressable
                  key={course.id}
                  style={[styles.courseItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  onPress={() => {
                    handleAssignCourse(course.id);
                    setShowAssignCourse(false);
                  }}
                >
                  <View style={styles.courseItemContent}>
                    <Text style={[styles.courseItemTitle, { color: colors.text }]}>{course.title}</Text>
                    <Text style={[styles.courseItemCategory, { color: colors.textMuted }]}>{course.category}</Text>
                  </View>
                  <Plus size={20} color={colors.primary} />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    marginBottom: 4,
  },
  planBadge: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  myLearningButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  myLearningText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  statsRow: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  statDivider: {
    width: 1,
    marginHorizontal: 20,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold' as const,
  },
  statLabel: {
    fontSize: 13,
    textAlign: 'center',
  },
  panel: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  panelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  employeeList: {
    gap: 12,
  },
  employeeCard: {
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  employeeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  employeeInfo: {
    flex: 1,
    gap: 4,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  employeeEmail: {
    fontSize: 14,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  courseCount: {
    fontSize: 12,
  },
  employeeDetails: {
    padding: 16,
    paddingTop: 0,
    gap: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  assignedCourses: {
    gap: 8,
  },
  assignedCoursesTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  assignedCourseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  assignedCourseInfo: {
    flex: 1,
    gap: 2,
  },
  assignedCourseTitle: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  assignedCourseCategory: {
    fontSize: 12,
  },
  noCoursesText: {
    fontSize: 14,
    fontStyle: 'italic' as const,
    textAlign: 'center',
    paddingVertical: 12,
  },
  completionsTable: {
    gap: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '700' as const,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  tableCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tableCellText: {
    fontSize: 14,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '700' as const,
  },
  downloadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyStateText: {
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  largeModal: {
    maxWidth: 500,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
  },
  modalBody: {
    padding: 20,
    paddingTop: 0,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButton: {
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
  },
  confirmButton: {},
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
  },
  courseList: {
    padding: 20,
    paddingTop: 0,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  courseItemContent: {
    flex: 1,
    gap: 4,
  },
  courseItemTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
  },
  courseItemCategory: {
    fontSize: 13,
  },
});
