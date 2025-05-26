import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event, CreateEventRequest } from '@microservice/shared';

const EVENTS_STORAGE_KEY = '@events';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const savedEvents = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
          ...event,
          eventTime: new Date(event.eventTime),
          createdAt: new Date(event.createdAt),
          updatedAt: new Date(event.updatedAt),
        }));
        setEvents(parsedEvents);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const saveEvents = async (updatedEvents: Event[]) => {
    try {
      await AsyncStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  const addEvent = async (eventData: { title: string; eventTime: Date }) => {
    const now = new Date();
    const newEvent: Event = {
      id: Date.now().toString(),
      userId: '1', // TODO: Replace with actual user ID when auth is implemented
      title: eventData.title,
      eventTime: eventData.eventTime,
      createdAt: now,
      updatedAt: now,
    };
    const updatedEvents = [...events, newEvent].sort(
      (a, b) => a.eventTime.getTime() - b.eventTime.getTime()
    );
    await saveEvents(updatedEvents);
  };

  const updateEvent = async (id: string, updates: { title?: string; eventTime?: Date }) => {
    const updatedEvents = events.map(event =>
      event.id === id
        ? {
            ...event,
            ...updates,
            updatedAt: new Date(),
          }
        : event
    );
    await saveEvents(updatedEvents);
  };

  const deleteEvent = async (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    await saveEvents(updatedEvents);
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};