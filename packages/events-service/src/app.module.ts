import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { BullModule } from '@nestjs/bullmq';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/event.entity';

@Module({
  imports: [
    // Database configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Event],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),

    // Redis/BullMQ configuration
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),

    // Worker service client
    // ClientsModule.register([
    //   {
    //     name: 'WORKER_SERVICE',
    //     transport: Transport.TCP,
    //     options: {
    //       host: process.env.WORKER_SERVICE_HOST || 'worker-service',
    //       port: parseInt(process.env.WORKER_SERVICE_PORT || '3003'),
    //     },
    //   },
    // ]),

    EventsModule,
  ],
})
export class AppModule {}
