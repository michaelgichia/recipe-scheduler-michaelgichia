import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController } from './event/event.controller';
import { DeviceController } from './device/device.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.EVENT_SERVICE_HOST || 'event-service',
          port: parseInt(process.env.EVENT_SERVICE_PORT || '3001'),
        },
      },
    ]),
  ],
  controllers: [EventController, DeviceController],
})
export class AppModule {}
