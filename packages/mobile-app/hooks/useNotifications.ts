import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Notifications from 'expo-notifications';
import { Notification } from '../constants/types';

const NOTIFICATIONS_STORAGE_KEY = '@notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
    setupNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const savedNotifications = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const saveNotifications = async (updatedNotifications: Notification[]) => {
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  const setupNotifications = async () => {
    // const { status } = await Notifications.requestPermissionsAsync();
    // if (status !== 'granted') {
    //   console.log('Notification permissions not granted');
    //   return;
    // }

    // Notifications.setNotificationHandler({
    //   handleNotification: async () => ({
    //     shouldShowAlert: true,
    //     shouldPlaySound: true,
    //     shouldSetBadge: true,
    //     shouldShowBanner: true,
    //     shouldShowList: true,
    //   }),
    // });

    // const subscription = Notifications.addNotificationReceivedListener(notification => {
    //   const newNotification: Notification = {
    //     id: notification.request.identifier || Date.now().toString(),
    //     title: notification.request.content.title,
    //     body: notification.request.content.body || '',
    //     date: new Date().toISOString(),
    //     read: false,
    //   };
      // setNotifications(prev => [newNotification, ...prev]);
    // });

    return () => {
      // subscription.remove();
    };
  };

  const markAsRead = async (id: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    await saveNotifications(updatedNotifications);
  };

  const deleteNotification = async (id: string) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    await saveNotifications(updatedNotifications);
  };

  return {
    notifications,
    markAsRead,
    deleteNotification,
  };
};