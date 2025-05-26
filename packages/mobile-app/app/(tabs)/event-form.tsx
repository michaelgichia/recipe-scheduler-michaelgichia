import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useEvents } from '../../hooks/useEvents';
import { useTheme } from '../../hooks/useTheme';
import { CustomDateTimePicker } from '../../components/DateTimePicker';

export default function EventFormScreen() {
  const router = useRouter();
  const { addEvent } = useEvents();
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [eventTime, setEventTime] = useState(new Date());

  const handleSubmit = async () => {
    if (!title.trim()) {
      return;
    }

    await addEvent({
      title: title.trim(),
      eventTime,
    });

    router.back();
  };

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
        <Pressable
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Create Event</Text>
        </Pressable>
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
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});