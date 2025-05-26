import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '@microservice/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  ReminderProcessor,
  ReminderEventsListener,
} from './processors/reminder.processor';
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
    ClientsModule.registerAsync([
      {
        name: 'BACKEND_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host:
              configService.get<string>('BACKEND_SERVICE_HOST') ||
              'event-service',
            port: parseInt(
              configService.get<string>('BACKEND_SERVICE_PORT') || '3001',
              10,
            ),
          },
        }),
      },
    ]),
  ],
  controllers: [WorkerController],
  providers: [
    ReminderProcessor,
    NotificationService,
    QueueService,
    ReminderEventsListener,
  ],
})
export class AppModule {}
