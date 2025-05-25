import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '@microservice/shared';

import { EventsService } from './events.service';
import { EventProcessor } from './events.processor';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    BullModule.registerQueue({
      name: QUEUE_NAMES.EVENT_QUEUE,
    }),
  ],
  controllers: [EventProcessor],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
