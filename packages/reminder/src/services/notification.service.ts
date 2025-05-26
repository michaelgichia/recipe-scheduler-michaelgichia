import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private readonly expoApiUrl = 'https://exp.host/--/api/v2/push/send';

  // In-memory store for mock notifications (in production, use Redis or DB)
  private mockNotifications: Map<string, NotificationPayload[]> = new Map();

  async sendPushNotification(
    pushToken: string,
    payload: NotificationPayload,
  ): Promise<void> {
    const accessToken = process.env.EXPO_ACCESS_TOKEN;

    if (!accessToken) {
      this.logger.warn(
        'No EXPO_ACCESS_TOKEN found, logging notification instead',
      );
      await this.logNotification('unknown', payload);
      return;
    }

    try {
      const response = await axios.post(
        this.expoApiUrl,
        {
          to: pushToken,
          title: payload.title,
          body: payload.body,
          data: payload.data,
          sound: 'default',
          channelId: 'cooking-reminders',
        },
        {
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.errors) {
        this.logger.error(
          'Expo push notification errors:',
          response.data.errors,
        );
        throw new Error('Push notification failed');
      }

      this.logger.log('Push notification sent successfully');
    } catch (error) {
      this.logger.error('Failed to send push notification:', error.message);

      // Fallback to logging
      await this.logNotification('unknown', payload);
      throw error;
    }
  }

  async logNotification(
    userId: string,
    payload: NotificationPayload,
  ): Promise<void> {
    const userNotifications = this.mockNotifications.get(userId) || [];
    userNotifications.push({
      ...payload,
      timestamp: new Date(),
    } as any);

    // Keep only last 50 notifications per user
    if (userNotifications.length > 50) {
      userNotifications.splice(0, userNotifications.length - 50);
    }

    this.mockNotifications.set(userId, userNotifications);

    this.logger.log(
      `📝 Notification logged for user ${userId}: ${payload.title}`,
    );
  }

  async getLoggedNotifications(userId: string): Promise<NotificationPayload[]> {
    return this.mockNotifications.get(userId) || [];
  }

  async clearLoggedNotifications(userId: string): Promise<void> {
    this.mockNotifications.delete(userId);
  }
}
