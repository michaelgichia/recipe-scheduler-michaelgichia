import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_CREATED',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'entry-exit-queue',
          queueOptions: {
            durable: false,
          },
          prefetchCount: 1,
          persistent: true,
          noAck: false,
          socketOptions: {
            keepAlive: true,
          },
          maxConnectionAttempts: 5,
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
