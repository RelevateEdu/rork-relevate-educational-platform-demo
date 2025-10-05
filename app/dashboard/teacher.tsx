import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeScreen from './teacher/welcome';
import ClassSelection from './teacher/class-selection';
import ClassDashboard from './teacher/class-dashboard';
import StudentProgress from './teacher/student-progress';
import SetHomeworkModal from './teacher/set-homework';

type Screen = 'welcome' | 'class-selection' | 'class-dashboard' | 'student-progress';

interface SelectedClass {
  id: string;
  name: string;
}

export default function TeacherDashboard() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedClass, setSelectedClass] = useState<SelectedClass | null>(null);
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    console.log('Teacher Dashboard mounted');
  }, []);

  const handleWelcomeComplete = () => {
    setCurrentScreen('class-selection');
  };

  const handleSelectClass = (classId: string) => {
    const classNames: { [key: string]: string } = {
      '1': 'AS Business Class 1',
      '2': 'A-Level Business Class 2',
      '3': 'GCSE Business Class 3',
    };
    setSelectedClass({ id: classId, name: classNames[classId] || 'Unknown Class' });
    setCurrentScreen('class-dashboard');
  };

  const handleBackToClassSelection = () => {
    setSelectedClass(null);
    setCurrentScreen('class-selection');
  };

  const handleSetHomework = (topicId: string, topicName: string) => {
    setSelectedTopic({ id: topicId, name: topicName });
    setShowHomeworkModal(true);
  };

  const handleSubmitHomework = (task: string) => {
    console.log('Homework set:', { topicId: selectedTopic?.id, task });
    setShowHomeworkModal(false);
    setSelectedTopic(null);
  };

  const handleViewProgress = () => {
    setCurrentScreen('student-progress');
  };

  const handleBackFromProgress = () => {
    setCurrentScreen('class-dashboard');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'welcome' && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}
      
      {currentScreen === 'class-selection' && (
        <ClassSelection onSelectClass={handleSelectClass} />
      )}
      
      {currentScreen === 'class-dashboard' && selectedClass && (
        <ClassDashboard
          classId={selectedClass.id}
          className={selectedClass.name}
          onBack={handleBackToClassSelection}
          onSetHomework={handleSetHomework}
          onViewProgress={handleViewProgress}
        />
      )}
      
      {currentScreen === 'student-progress' && selectedClass && (
        <StudentProgress
          className={selectedClass.name}
          onBack={handleBackFromProgress}
        />
      )}

      {showHomeworkModal && selectedTopic && (
        <SetHomeworkModal
          visible={showHomeworkModal}
          topicName={selectedTopic.name}
          onClose={() => {
            setShowHomeworkModal(false);
            setSelectedTopic(null);
          }}
          onSubmit={handleSubmitHomework}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
