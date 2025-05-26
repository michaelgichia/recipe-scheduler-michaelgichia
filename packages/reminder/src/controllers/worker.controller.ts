import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  MESSAGE_PATTERNS,
  ReminderJob,
  ApiResponse,
} from '@microservice/shared';
import { QueueService } from '../services/queue.service';

@Controller()
export class WorkerController {
  constructor(private readonly queueService: QueueService) {}

  @MessagePattern(MESSAGE_PATTERNS.SCHEDULE_REMINDER)
  async scheduleReminder(@Payload() job: ReminderJob): Promise<ApiResponse> {
    try {
      await this.queueService.scheduleReminder(job);
      return {
        success: true,
        message: 'Reminder scheduled successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @MessagePattern(MESSAGE_PATTERNS.CANCEL_REMINDER)
  async cancelReminder(@Payload() eventId: string): Promise<ApiResponse> {
    try {
      await this.queueService.cancelReminder(eventId);
      return {
        success: true,
        message: 'Reminder cancelled successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
