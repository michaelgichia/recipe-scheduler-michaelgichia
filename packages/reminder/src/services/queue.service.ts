import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAMES, ReminderJob } from '@microservice/shared';
import { subMinutes, parseISO } from 'date-fns';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QUEUE_NAMES.REMINDER)
    private reminderQueue: Queue<ReminderJob>,
  ) {}

  async scheduleReminder(job: ReminderJob): Promise<void> {
    console.log('Job', JSON.stringify(job));
    const leadMinutes = parseInt(process.env.REMINDER_LEAD_MINUTES || '0');

    // Parse the event time using date-fns
    const eventTime = parseISO(job.eventTime);
    const now = new Date();

    // Log the times for debugging
    console.log('Event time (UTC):', eventTime.toISOString());
    console.log('Current time (UTC):', now.toISOString());

    // Calculate reminder time using date-fns
    const reminderTime = subMinutes(eventTime, leadMinutes);
    console.log('Reminder time (UTC):', reminderTime.toISOString());

    const delay = reminderTime.getTime() - now.getTime();
    console.log('Delay in minutes:', Math.floor(delay / (60 * 1000)));

    if (delay > 0) {
      await this.reminderQueue.add('send-reminder', job, {
        delay: job.minutesBefore,
        jobId: job.eventId,
        removeOnComplete: 10,
        removeOnFail: 10,
      });

      console.log(
        `📅 Reminder scheduled for event ${job.eventId} at ${reminderTime.toISOString()} (${leadMinutes} minutes before event)`,
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
