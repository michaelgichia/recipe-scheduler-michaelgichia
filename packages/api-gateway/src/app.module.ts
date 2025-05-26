import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController } from './event/event.controller';
import { DeviceController } from './device/device.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BACKEND_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.BACKEND_SERVICE_HOST || 'event-service',
          port: parseInt(process.env.BACKEND_SERVICE_PORT || '3001'),
        },
      },
    ]),
  ],
  controllers: [EventController, DeviceController],
})
export class AppModule {}
