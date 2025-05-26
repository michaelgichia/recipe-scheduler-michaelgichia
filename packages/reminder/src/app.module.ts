import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '@microservice/shared';
import { ReminderProcessor } from './processors/reminder.processor';
import { WorkerController } from './controllers/worker.controller';
import { NotificationService } from './services/notification.service';
import { QueueService } from './services/queue.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.REMINDER,
    }),
  ],
  controllers: [WorkerController],
  providers: [ReminderProcessor, NotificationService, QueueService],
})
export class AppModule {}
