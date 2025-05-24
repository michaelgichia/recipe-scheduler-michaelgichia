import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '@microservice/shared';

import { Event } from './entities/event.entity';
import { EventsService } from './events.service';
import { EventController } from './events.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    BullModule.registerQueue({
      name: QUEUE_NAMES.EVENT_QUEUE,
    }),
  ],
  controllers: [EventController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
