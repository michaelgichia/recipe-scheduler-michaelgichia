import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useTheme } from '../hooks/useTheme';

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
}

export const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  label = 'Select Date & Time',
}) => {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  const handleChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      )}
      <Pressable
        style={[styles.pickerButton, { backgroundColor: theme.colors.card }]}
        onPress={() => setShow(true)}
      >
        <Text style={[styles.pickerText, { color: theme.colors.text }]}>
          {format(value, 'PPp')}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={value}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  pickerButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C6C6C8',
  },
  pickerText: {
    fontSize: 16,
  },
});