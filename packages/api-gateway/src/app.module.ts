import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  controllers: [AppController],
})
export class AppModule {}
