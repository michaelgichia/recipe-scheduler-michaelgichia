import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export type ThemeType = 'light' | 'dark';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#38e060',
    background: '#FFFFFF',
    card: '#F2F2F7',
    text: '#000000',
    border: '#C6C6C8',
    notification: '#FF3B30',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#38e060',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    border: '#38383A',
    notification: '#FF453A',
  },
};