import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 64 }]}> 
      <ScrollView contentContainerStyle={styles.content} testID="profile-scroll">
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Your profile settings will appear here.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 16, opacity: 0.7 },
});
