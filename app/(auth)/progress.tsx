import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView | null>(null);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 64 }]}> 
      <ScrollView ref={scrollRef} contentContainerStyle={styles.content} testID="progress-scroll">
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.text}>Your progress dashboard will appear here.</Text>
        <Pressable onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} style={styles.button}>
          <Text style={styles.buttonText}>Scroll to top</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 16, opacity: 0.7, marginBottom: 12 },
  button: { padding: 12, backgroundColor: '#2563eb', borderRadius: 12, alignSelf: 'flex-start' },
  buttonText: { color: 'white', fontWeight: '600' },
});
