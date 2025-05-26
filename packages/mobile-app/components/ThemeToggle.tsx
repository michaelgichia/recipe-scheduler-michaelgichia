import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { themeType, toggleTheme } = useTheme();

  return (
    <Pressable style={styles.container} onPress={toggleTheme}>
      <Ionicons
        name={themeType === 'light' ? 'moon' : 'sunny'}
        size={24}
        color={themeType === 'light' ? '#000000' : '#FFFFFF'}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
  },
});