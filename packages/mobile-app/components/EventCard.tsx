import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { format } from 'date-fns';
import { Event } from '@microservice/shared';
import { useTheme } from '../hooks/useTheme';

interface EventCardProps {
  event: Event;
  onPress: (event: Event) => void;
  onDelete: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress, onDelete }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: theme.colors.card }]}
      onPress={() => onPress(event)}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{event.title}</Text>
        <Text style={[styles.date, { color: theme.colors.text }]}>
          {format(event.eventTime, 'PPp')}
        </Text>
      </View>
      <Pressable
        style={[styles.deleteButton, { backgroundColor: theme.colors.notification }]}
        onPress={() => onDelete(event.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});