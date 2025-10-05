import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Modal, Animated } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { X } from 'lucide-react-native';

interface SetHomeworkModalProps {
  visible: boolean;
  topicName: string;
  onClose: () => void;
  onSubmit: (task: string) => void;
}

export default function SetHomeworkModal({ visible, topicName, onClose, onSubmit }: SetHomeworkModalProps) {
  const { colors } = useThemeContext();
  const [task, setTask] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      setTask('');
      setShowConfetti(false);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [visible, fadeAnim, scaleAnim]);

  const handleSubmit = () => {
    if (task.trim()) {
      setShowConfetti(true);
      setTimeout(() => {
        onSubmit(task);
        setShowConfetti(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContent,
            { backgroundColor: colors.card, borderColor: colors.border },
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {!showConfetti ? (
            <>
              <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Set Homework</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={onClose}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <X size={24} color={colors.textMuted} />
                </Pressable>
              </View>

              <Text style={[styles.topicLabel, { color: colors.textSecondary }]}>
                Topic: {topicName}
              </Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
                value={task}
                onChangeText={setTask}
                placeholder="e.g., Complete Aims and Objectives Quiz by next week"
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                accessible={true}
                accessibilityLabel="Homework task"
              />

              <View style={styles.actions}>
                <Pressable
                  style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
                  onPress={onClose}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel"
                >
                  <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.submitButton,
                    { backgroundColor: task.trim() ? colors.primary : colors.textMuted },
                  ]}
                  onPress={handleSubmit}
                  disabled={!task.trim()}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Set homework"
                  accessibilityState={{ disabled: !task.trim() }}
                >
                  <Text style={[styles.submitButtonText, { color: colors.background }]}>
                    Set Homework
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <ConfettiAnimation colors={colors} />
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

function ConfettiAnimation({ colors }: { colors: any }) {
  const confettiPieces = Array.from({ length: 30 }, (_, i) => i);
  
  return (
    <View style={styles.confettiContainer}>
      {confettiPieces.map((i) => (
        <ConfettiPiece key={i} index={i} colors={colors} />
      ))}
      <Text style={[styles.confettiText, { color: colors.text }]}>Homework Set!</Text>
    </View>
  );
}

function ConfettiPiece({ index, colors }: { index: number; colors: any }) {
  const translateY = useRef(new Animated.Value(-50)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const confettiColors = [colors.primary, colors.secondary, colors.accent, colors.success, colors.warning];
  const color = confettiColors[index % confettiColors.length];

  useEffect(() => {
    const randomX = (Math.random() - 0.5) * 300;
    const randomRotation = Math.random() * 720;
    const delay = Math.random() * 200;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 400,
        duration: 1500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: randomX,
        duration: 1500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: randomRotation,
        duration: 1500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, translateX, rotate, opacity]);

  return (
    <Animated.View
      style={[
        styles.confettiPiece,
        {
          backgroundColor: color,
          transform: [
            { translateY },
            { translateX },
            { rotate: rotate.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) },
          ],
          opacity,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 16,
    borderWidth: 2,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold' as const,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicLabel: {
    fontSize: 14,
    marginBottom: 16,
  },
  input: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 15,
    minHeight: 120,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1.5,
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
  },
  submitButton: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: 'bold' as const,
  },
  confettiContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  confettiPiece: {
    position: 'absolute',
    width: 10,
    height: 10,
    top: 150,
  },
  confettiText: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    zIndex: 10,
  },
});
