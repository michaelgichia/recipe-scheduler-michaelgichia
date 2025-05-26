import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import {
  ApiResponse,
  Device,
  MESSAGE_PATTERNS,
  PushNotificationPayload,
} from '@microservice/shared';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  private readonly expo: Expo;
  private readonly mockMode: boolean;
  private readonly expoAccessToken: string;

  constructor(
    @Inject('BACKEND_SERVICE')
    private readonly backendServiceClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    this.expoAccessToken =
      this.configService.get<string>('EXPO_ACCESS_TOKEN') || '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.expo = new Expo({ accessToken: this.expoAccessToken });
    this.mockMode = !this.expoAccessToken;

    if (this.mockMode) {
      console.log(
        '📱 Notification Service running in MOCK MODE (no Expo access token)',
      );
    }
  }

  async sendPushNotification(
    payload: PushNotificationPayload,
  ): Promise<ApiResponse<any>> {
    try {
      if (this.mockMode) {
        const mockNotification = {
          timestamp: new Date().toISOString(),
          ...payload,
        };

        console.log(
          '📱 MOCK PUSH NOTIFICATION:',
          JSON.stringify(mockNotification, null, 2),
        );

        return {
          success: true,
          data: mockNotification,
          message: 'Mock notification sent (logged)',
        };
      }

      if (!Expo.isExpoPushToken(payload.to)) {
        return {
          success: false,
          error: 'Invalid Expo push token',
        };
      }

      const message: ExpoPushMessage = {
        to: payload.to,
        title: payload.title,
        body: payload.body,
        data: payload.data || {},
        sound: 'default',
      };

      const chunks = this.expo.chunkPushNotifications([
        message,
      ]) as ExpoPushMessage[][];
      const tickets: ExpoPushTicket[] = [];

      for (const chunk of chunks) {
        try {
          const ticketChunk = (await this.expo.sendPushNotificationsAsync(
            chunk,
          )) as ExpoPushTicket[];
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error('Error sending push notification chunk:', error);
        }
      }

      return {
        success: true,
        data: tickets,
        message: 'Push notification sent successfully',
      };
    } catch (error: unknown) {
      console.error('Error sending push notification:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async sendPushToUser(
    userId: string,
    title: string,
    body: string,
    data?: Record<string, unknown>,
  ): Promise<ApiResponse<any>> {
    try {
      const response = await firstValueFrom(
        this.backendServiceClient.send<ApiResponse<Device[]>>(
          MESSAGE_PATTERNS.GET_DEVICE_BY_USER_ID,
          userId,
        ),
      );

      if (!response.success || !response.data) {
        return {
          success: false,
          error: 'No devices found for user',
        };
      }

      const pushTokens = response.data.map((device) => device.pushToken);
      const results = [];

      for (const pushToken of pushTokens) {
        const result = await this.sendPushNotification({
          to: pushToken,
          title,
          body,
          data,
        });

        results.push({
          pushToken,
          result,
        });
      }

      return {
        success: true,
        data: results,
        message: `Sent notifications to ${pushTokens.length} device(s)`,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
