import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '@microservice/shared';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EventsService } from './events.service';
import { EventProcessor } from './events.processor';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    BullModule.registerQueue({
      name: QUEUE_NAMES.EVENT_QUEUE,
    }),
    ClientsModule.registerAsync([
      {
        name: 'REMINDER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host:
              configService.get<string>('REMINDER_SERVICE_HOST') || 'localhost',
            port: parseInt(
              configService.get<string>('REMINDER_SERVICE_PORT') || '3005',
              10,
            ),
          },
        }),
      },
    ]),
  ],
  controllers: [EventProcessor],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
