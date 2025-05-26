import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { format } from 'date-fns';
import { useNotifications } from '../../hooks/useNotifications';
import { useTheme } from '../../hooks/useTheme';
import { Notification } from '../../constants/types';

export default function NotificationsScreen() {
  const { notifications, markAsRead, deleteNotification } = useNotifications();
  const { theme } = useTheme();

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable
      style={[
        styles.notification,
        {
          backgroundColor: theme.colors.card,
          opacity: item.read ? 0.7 : 1,
        },
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
        <Text style={[styles.body, { color: theme.colors.text }]}>{item.body}</Text>
        <Text style={[styles.date, { color: theme.colors.text }]}>
          {format(new Date(item.date), 'PPp')}
        </Text>
      </View>
      <Pressable
        style={[styles.deleteButton, { backgroundColor: theme.colors.notification }]}
        onPress={() => deleteNotification(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            No notifications yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
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
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
  },
});