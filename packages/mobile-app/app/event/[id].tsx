import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEvents } from '../../hooks/useEvents';
import { useTheme } from '../../hooks/useTheme';
import { CustomDateTimePicker } from '../../components/DateTimePicker';
import { Event } from '@microservice/shared';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { events, updateEvent, deleteEvent } = useEvents();
  const { theme } = useTheme();
  const [event, setEvent] = useState<Event | null>(null);
  const [title, setTitle] = useState('');
  const [eventTime, setEventTime] = useState(new Date());

  useEffect(() => {
    const foundEvent = events.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
      setTitle(foundEvent.title);
      setEventTime(foundEvent.eventTime);
    }
  }, [id, events]);

  const handleUpdate = async () => {
    if (!title.trim() || !event) {
      return;
    }

    await updateEvent(event.id, {
      title: title.trim(),
      eventTime,
    });

    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteEvent(event!.id);
            router.back();
          },
        },
      ]
    );
  };

  if (!event) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.form}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          placeholder="Event Title"
          placeholderTextColor={theme.colors.text + '80'}
          value={title}
          onChangeText={setTitle}
        />
        <CustomDateTimePicker
          value={eventTime}
          onChange={setEventTime}
          label="Event Date & Time"
        />
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleUpdate}
          >
            <Text style={styles.buttonText}>Update Event</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: theme.colors.notification }]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Delete Event</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});