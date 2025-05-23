import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
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
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
