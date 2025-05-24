// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { BullModule } from '@nestjs/bullmq';
// import { EventModule } from './event/event.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     BullModule.forRoot({
//       connection: {
//         host: process.env.REDIS_HOST || 'localhost',
//         port: parseInt(process.env.REDIS_PORT || '6379'),
//       },
//     }),
//     EventModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventController } from './event/event.controller';

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
  controllers: [EventController],
})
export class AppModule {}
