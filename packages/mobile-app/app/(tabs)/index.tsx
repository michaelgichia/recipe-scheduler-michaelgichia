import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useEvents } from '../../hooks/useEvents';
import { EventCard } from '../../components/EventCard';
import { useTheme } from '../../hooks/useTheme';
import { Event } from '@microservice/shared';

export default function EventsScreen() {
  const router = useRouter();
  const { events, loading, error, deleteEvent, refetch } = useEvents();
  const { theme } = useTheme();

  const handleEventPress = (event: Event) => {
    router.push({
      pathname: '/event/[id]',
      params: { id: event.id }
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>{error}</Text>
        <Pressable
          style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
          onPress={refetch}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

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
        refreshing={loading}
        onRefresh={refetch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: 16,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
