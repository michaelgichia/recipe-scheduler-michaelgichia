import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import {
  MESSAGE_PATTERNS,
  ApiResponse,
  PushNotificationPayload,
} from '@microservice/shared';
@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern(MESSAGE_PATTERNS.SEND_PUSH)
  async sendPushNotification(
    payload: PushNotificationPayload,
  ): Promise<ApiResponse<any>> {
    return this.notificationService.sendPushNotification(payload);
  }

  @MessagePattern('notification.send_push_to_user')
  async sendPushToUser(data: {
    userId: string;
    title: string;
    body: string;
    data?: any;
  }): Promise<ApiResponse<any>> {
    return this.notificationService.sendPushToUser(
      data.userId,
      data.title,
      data.body,
      data.data,
    );
  }
}
