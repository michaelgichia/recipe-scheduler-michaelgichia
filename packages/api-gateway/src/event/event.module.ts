import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAMES } from '@microservice/shared';

import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.EVENT_QUEUE,
    }),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
