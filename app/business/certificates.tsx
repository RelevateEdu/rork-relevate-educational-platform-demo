import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useBusiness } from '@/contexts/BusinessContext';
import { ArrowLeft, Award, Download, Calendar, TrendingUp } from 'lucide-react-native';

export default function CertificatesScreen() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { employees, getEmployeeCertificates } = useBusiness();

  const currentEmployee = employees.find(e => e.email === user?.email);
  const certificates = currentEmployee ? getEmployeeCertificates(currentEmployee.id) : [];

  const handleDownloadCertificate = (certificateId: string) => {
    Alert.alert(
      'Download Certificate',
      'Certificate download functionality will be implemented with PDF generation. The certificate will include your name, course title, completion date, score, and co-branding with your employer and Relevate logos.',
      [{ text: 'OK' }]
    );
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Certificates</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {certificates.length > 0 ? (
          <>
            <View style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.statItem}>
                <Award size={32} color={colors.primary} />
                <Text style={[styles.statValue, { color: colors.text }]}>{certificates.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Certificate{certificates.length !== 1 ? 's' : ''} Earned
                </Text>
              </View>
            </View>

            <View style={styles.certificatesList}>
              {certificates.map((certificate) => (
                <View
                  key={certificate.id}
                  style={[styles.certificateCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={[styles.certificateIcon, { backgroundColor: colors.primary + '20' }]}>
                    <Award size={32} color={colors.primary} />
                  </View>

                  <View style={styles.certificateInfo}>
                    <Text style={[styles.certificateTitle, { color: colors.text }]}>
                      {certificate.courseTitle}
                    </Text>

                    <View style={styles.certificateMeta}>
                      <View style={styles.metaItem}>
                        <Calendar size={14} color={colors.textMuted} />
                        <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                          {new Date(certificate.completedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Text>
                      </View>

                      <View style={styles.metaItem}>
                        <TrendingUp size={14} color={colors.success} />
                        <Text style={[styles.metaText, { color: colors.success, fontWeight: '600' as const }]}>
                          {certificate.score}%
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.companyName, { color: colors.textMuted }]}>
                      Issued by {certificate.companyName}
                    </Text>
                  </View>

                  <Pressable
                    style={[styles.downloadButton, { backgroundColor: colors.primary }]}
                    onPress={() => handleDownloadCertificate(certificate.id)}
                  >
                    <Download size={20} color={colors.background} />
                  </Pressable>
                </View>
              ))}
            </View>

            <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>About Your Certificates</Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                Your certificates are permanently available for download, even if your company cancels their
                Relevate subscription. Each certificate includes verification details and can be shared with
                employers or added to your professional profile.
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.surface }]}>
              <Award size={64} color={colors.textMuted} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No Certificates Yet</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Complete courses and pass quizzes with 80% or higher to earn certificates.
            </Text>
            <Pressable
              style={[styles.browseButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/dashboard/employee')}
            >
              <Text style={[styles.browseButtonText, { color: colors.background }]}>
                Browse Courses
              </Text>
            </Pressable>
          </View>
        )}
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
    fontSize: 18,
    fontWeight: '600' as const,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  statsCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    gap: 12,
  },
  statValue: {
    fontSize: 48,
    fontWeight: 'bold' as const,
  },
  statLabel: {
    fontSize: 15,
  },
  certificatesList: {
    gap: 16,
    marginBottom: 24,
  },
  certificateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
  certificateIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certificateInfo: {
    flex: 1,
    gap: 8,
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  certificateMeta: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
  },
  companyName: {
    fontSize: 12,
  },
  downloadButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 20,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },
  browseButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
