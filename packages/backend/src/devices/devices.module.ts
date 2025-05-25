import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';

import { QUEUE_NAMES } from '@microservice/shared';
import { DevicesService } from './devices.service';
import { DevicesProcessor } from './devices.processor';
import { Device } from './entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device]),
    BullModule.registerQueue({
      name: QUEUE_NAMES.EVENT_QUEUE,
    }),
  ],
  controllers: [DevicesProcessor],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
