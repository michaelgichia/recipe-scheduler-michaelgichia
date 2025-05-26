import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeType, lightTheme, darkTheme } from '../constants/theme';

const THEME_STORAGE_KEY = '@theme_preference';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(systemColorScheme || 'light');

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setThemeType(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = themeType === 'light' ? 'dark' : 'light';
    setThemeType(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = themeType === 'light' ? lightTheme : darkTheme;

  return {
    theme,
    themeType,
    toggleTheme,
  };
};