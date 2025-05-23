export interface Event {
  id: string;
  userId: string;
  title: string;
  eventTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEventDto {
  title: string;
  eventTime: string; // ISO string
  userId: string;
}

export interface UpdateEventDto {
  title?: string;
  eventTime?: string; // ISO string
}

export interface Device {
  id: string;
  userId: string;
  pushToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDeviceDto {
  userId: string;
  pushToken: string;
}

export interface ReminderJob {
  eventId: string;
  userId: string;
  title: string;
  eventTime: Date;
  pushToken?: string;
}

export interface PushNotificationPayload {
  to: string;
  title: string;
  body: string;
  data?: Record<string, never>;
}

export interface ApiResponse<T = never> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Queue Names
export const QUEUE_NAMES = {
  REMINDER: 'reminder-queue',
} as const;

// Message Patterns for Microservices
export const MESSAGE_PATTERNS = {
  // Event Service
  CREATE_EVENT: 'event.create',
  GET_EVENTS: 'event.get_all',
  GET_EVENT: 'event.get_one',
  UPDATE_EVENT: 'event.update',
  DELETE_EVENT: 'event.delete',

  // Notification Service
  CREATE_DEVICE: 'device.create',
  GET_DEVICE: 'device.get',
  SEND_PUSH: 'notification.send_push',

  // Worker Service
  SCHEDULE_REMINDER: 'worker.schedule_reminder',
  CANCEL_REMINDER: 'worker.cancel_reminder',
} as const;