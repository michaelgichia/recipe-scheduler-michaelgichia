import {
  WorkerHost,
  Processor,
  QueueEventsHost,
  QueueEventsListener,
  OnQueueEvent,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { QUEUE_NAMES, ReminderJob } from '@microservice/shared';
import { NotificationService } from '../services/notification.service';

@Processor(QUEUE_NAMES.REMINDER)
export class ReminderProcessor extends WorkerHost {
  private readonly logger = new Logger(ReminderProcessor.name);

  constructor(private readonly notificationService: NotificationService) {
    super();
    this.logger.log('ReminderProcessor initialized');
  }

  async process(job: Job<ReminderJob>) {
    const { eventId, userId, title, eventTime, pushToken } = job.data;

    this.logger.log(`Processing reminder for event ${eventId}`);

    try {
      // Format the event time for display
      const eventDate = new Date(eventTime);
      const timeString = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const dateString = eventDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      const notificationPayload = {
        title: '🍳 Cooking Reminder',
        body: `Time to "${title}" - scheduled for ${dateString} at ${timeString}`,
        data: {
          eventId,
          eventTime: eventTime.toString(),
          type: 'cooking_reminder',
        },
      };

      if (pushToken) {
        // Send actual push notification
        await this.notificationService.sendPushNotification(
          pushToken,
          notificationPayload,
        );
        this.logger.log(`✅ Push notification sent for event ${eventId}`);
      } else {
        // Log notification for mock display
        await this.notificationService.logNotification(
          userId,
          notificationPayload,
        );
        this.logger.log(
          `📝 Notification logged for event ${eventId} (no push token)`,
        );
      }

      return { success: true };
    } catch (error) {
      this.logger.error(
        `❌ Failed to send reminder for event ${eventId}:`,
        error,
      );
      throw error;
    }
  }
}

@QueueEventsListener(QUEUE_NAMES.REMINDER)
export class ReminderEventsListener extends QueueEventsHost {
  @OnQueueEvent('active')
  onActive(job: { jobId: string; prev?: string }) {
    console.log(`Processing job ${job.jobId}...`);
  }
}
