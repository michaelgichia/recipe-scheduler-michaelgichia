export interface ReminderJob {
  eventId: string;
  userId: string;
  title: string;
  eventTime: string;
  pushToken?: string;
  minutesBefore?: number
}

export interface PushNotificationRequest {
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
