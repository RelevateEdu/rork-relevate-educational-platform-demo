import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, useWindowDimensions } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useBusiness } from '@/contexts/BusinessContext';
import { courses, courseCategories, CourseCategory } from '@/mocks/courses';
import { Heart, Award, BookOpen, Clock, ChevronDown } from 'lucide-react-native';

export default function EmployeeLibrary() {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { employees, favoriteCourses, toggleFavorite } = useBusiness();
  const { width } = useWindowDimensions();

  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const currentEmployee = employees.find(e => e.email === user?.email);
  const assignedCourseIds = currentEmployee?.assignedCourses || [];

  const assignedCourses = useMemo(() => {
    return courses.filter(course => assignedCourseIds.includes(course.id));
  }, [assignedCourseIds]);

  const filteredCourses = useMemo(() => {
    let filtered = courses;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(course => favoriteCourses.includes(course.id));
    }

    return filtered;
  }, [selectedCategory, showFavoritesOnly, favoriteCourses]);

  const handleCoursePress = (courseId: string) => {
    router.push(`/business/courses/${courseId}` as any);
  };

  const handleToggleFavorite = async (courseId: string) => {
    await toggleFavorite(courseId);
  };

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
          <Text style={[styles.title, { color: colors.text }]}>Course Library</Text>
          <Pressable
            style={[styles.certificatesButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/business/certificates' as any)}
          >
            <Award size={18} color={colors.background} />
            {width > 380 && (
              <Text style={[styles.certificatesButtonText, { color: colors.background }]}>
                Certificates
              </Text>
            )}
          </Pressable>
        </View>

        {assignedCourses.length > 0 && (
          <View style={[styles.assignedSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.assignedHeader}>
              <BookOpen size={20} color={colors.primary} />
              <Text style={[styles.assignedTitle, { color: colors.text }]}>Assigned to You</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.assignedList}
            >
              {assignedCourses.map((course) => (
                <Pressable
                  key={course.id}
                  style={[styles.assignedCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}
                  onPress={() => handleCoursePress(course.id)}
                >
                  <Image
                    source={{ uri: course.imageUrl }}
                    style={styles.assignedImage}
                    resizeMode="cover"
                  />
                  <View style={styles.assignedInfo}>
                    <Text style={[styles.assignedCourseTitle, { color: colors.text }]} numberOfLines={2}>
                      {course.title}
                    </Text>
                    <View style={[styles.assignedBadge, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.assignedBadgeText, { color: colors.background }]}>
                        Required
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.filtersSection}>
          <View style={styles.filterRow}>
            <Pressable
              style={[styles.categoryDropdown, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Text style={[styles.categoryDropdownText, { color: colors.text }]}>
                {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
              </Text>
              <ChevronDown size={18} color={colors.textMuted} />
            </Pressable>

            <Pressable
              style={[
                styles.favoritesFilter,
                {
                  backgroundColor: showFavoritesOnly ? colors.primary : colors.card,
                  borderColor: showFavoritesOnly ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Heart
                size={18}
                color={showFavoritesOnly ? colors.background : colors.primary}
                fill={showFavoritesOnly ? colors.background : 'none'}
              />
              <Text
                style={[
                  styles.favoritesFilterText,
                  { color: showFavoritesOnly ? colors.background : colors.primary },
                ]}
              >
                Favorites
              </Text>
            </Pressable>
          </View>

          {showCategoryDropdown && (
            <View style={[styles.categoryMenu, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Pressable
                style={[styles.categoryMenuItem, selectedCategory === 'all' && { backgroundColor: colors.surface }]}
                onPress={() => {
                  setSelectedCategory('all');
                  setShowCategoryDropdown(false);
                }}
              >
                <Text style={[styles.categoryMenuText, { color: colors.text }]}>All Categories</Text>
              </Pressable>
              {courseCategories.map((category) => (
                <Pressable
                  key={category}
                  style={[styles.categoryMenuItem, selectedCategory === category && { backgroundColor: colors.surface }]}
                  onPress={() => {
                    setSelectedCategory(category);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <Text style={[styles.categoryMenuText, { color: colors.text }]}>{category}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.coursesGrid}>
          {filteredCourses.map((course) => {
            const isFavorite = favoriteCourses.includes(course.id);
            const isAssigned = assignedCourseIds.includes(course.id);

            return (
              <Pressable
                key={course.id}
                style={[styles.courseCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleCoursePress(course.id)}
              >
                <View style={styles.courseImageContainer}>
                  <Image
                    source={{ uri: course.imageUrl }}
                    style={styles.courseImage}
                    resizeMode="cover"
                  />
                  <Pressable
                    style={[styles.favoriteButton, { backgroundColor: colors.card }]}
                    onPress={() => handleToggleFavorite(course.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Heart
                      size={20}
                      color={isFavorite ? colors.error : colors.textMuted}
                      fill={isFavorite ? colors.error : 'none'}
                    />
                  </Pressable>
                  {isAssigned && (
                    <View style={[styles.requiredBadge, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.requiredBadgeText, { color: colors.background }]}>
                        Required
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.courseInfo}>
                  <View style={[styles.categoryTag, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.categoryTagText, { color: colors.primary }]}>
                      {course.category}
                    </Text>
                  </View>

                  <Text style={[styles.courseTitle, { color: colors.text }]} numberOfLines={2}>
                    {course.title}
                  </Text>

                  <Text style={[styles.courseDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                    {course.description}
                  </Text>

                  <View style={styles.courseMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={14} color={colors.textMuted} />
                      <Text style={[styles.metaText, { color: colors.textMuted }]}>
                        {course.estimatedMinutes} min
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <BookOpen size={14} color={colors.textMuted} />
                      <Text style={[styles.metaText, { color: colors.textMuted }]}>
                        {course.pages.length} lessons
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {filteredCourses.length === 0 && (
          <View style={styles.emptyState}>
            <BookOpen size={48} color={colors.textMuted} />
            <Text style={[styles.emptyStateText, { color: colors.textMuted }]}>
              {showFavoritesOnly
                ? 'No favorite courses yet. Tap the heart icon to add courses to your favorites.'
                : 'No courses found in this category.'}
            </Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
  },
  certificatesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  certificatesButtonText: {
    fontSize: 13,
    fontWeight: '600' as const,
  },
  assignedSection: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    marginBottom: 24,
  },
  assignedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  assignedTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
  },
  assignedList: {
    gap: 16,
    paddingRight: 16,
  },
  assignedCard: {
    width: 200,
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  assignedImage: {
    width: '100%',
    height: 100,
  },
  assignedInfo: {
    padding: 12,
    gap: 8,
  },
  assignedCourseTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 18,
  },
  assignedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  assignedBadgeText: {
    fontSize: 11,
    fontWeight: '700' as const,
  },
  filtersSection: {
    marginBottom: 24,
    gap: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryDropdown: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  categoryDropdownText: {
    fontSize: 15,
    fontWeight: '500' as const,
  },
  favoritesFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  favoritesFilterText: {
    fontSize: 15,
    fontWeight: '600' as const,
  },
  categoryMenu: {
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  categoryMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryMenuText: {
    fontSize: 15,
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  courseCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  courseImageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requiredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  requiredBadgeText: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
  courseInfo: {
    padding: 16,
    gap: 8,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    lineHeight: 24,
  },
  courseDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  courseMeta: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  emptyStateText: {
    fontSize: 15,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22,
  },
});
