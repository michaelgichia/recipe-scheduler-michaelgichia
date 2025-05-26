import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAMES, ReminderJob } from '@microservice/shared';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QUEUE_NAMES.REMINDER)
    private reminderQueue: Queue<ReminderJob>,
  ) {}

  async scheduleReminder(job: ReminderJob): Promise<void> {
    const leadMinutes = parseInt(process.env.REMINDER_LEAD_MINUTES || '0');
    const eventTime = new Date(job.eventTime);
    const reminderTime = new Date(
      eventTime.getTime() - leadMinutes * 60 * 1000,
    );
    const delay = reminderTime.getTime() - Date.now();

    if (delay > 0) {
      await this.reminderQueue.add('send-reminder', job, {
        delay,
        jobId: job.eventId,
        removeOnComplete: 10,
        removeOnFail: 10,
      });

      console.log(
        `📅 Reminder scheduled for event ${job.eventId} at ${reminderTime.toISOString()}`,
      );
    } else {
      console.log(
        `⚠️ Skipping reminder for event ${job.eventId} - reminder time is in the past`,
      );
    }
  }

  async cancelReminder(eventId: string): Promise<void> {
    // Find and remove the job by eventId
    const job = await this.reminderQueue.getJob(eventId);
    if (job) {
      await job.remove();
      console.log(`🗑️ Cancelled reminder for event ${eventId}`);
    }
  }

  async rescheduleReminder(job: ReminderJob): Promise<void> {
    // Cancel existing reminder and schedule new one
    await this.cancelReminder(job.eventId);
    await this.scheduleReminder(job);
  }
}
