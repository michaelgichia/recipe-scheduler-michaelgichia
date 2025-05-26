import { Stack } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from '../components/ThemeToggle';

export default function Layout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="event/[id]"
        options={{
          title: 'Event Details',
        }}
      />
    </Stack>
  );
}
