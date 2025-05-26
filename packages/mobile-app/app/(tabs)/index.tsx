import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useEvents } from '../../hooks/useEvents';
import { EventCard } from '../../components/EventCard';
import { useTheme } from '../../hooks/useTheme';
import { Event } from '../../constants/types';

export default function EventsScreen() {
  const router = useRouter();
  const { events, deleteEvent } = useEvents();
  const { theme } = useTheme();

  const handleEventPress = (event: Event) => {
    router.push({
      pathname: '/event/[id]',
      params: { id: event.id }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={handleEventPress}
            onDelete={deleteEvent}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 16,
  },
});
