import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { EventsModule } from './events/events.module';
import { DevicesModule } from './devices/devices.module';
import { Event } from './events/entities/event.entity';
import { Device } from './devices/entities/device.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_URL || './data/database.sqlite',
      entities: [Event, Device],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    ClientsModule.registerAsync([
      {
        name: 'REMINDER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host:
              configService.get<string>('REMINDER_SERVICE_HOST') || 'localhost',
            port: parseInt(
              configService.get<string>('REMINDER_SERVICE_PORT') || '3003',
              10,
            ),
          },
        }),
      },
    ]),
    EventsModule,
    DevicesModule,
  ],
})
export class AppModule {}
