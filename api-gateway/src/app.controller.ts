import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('EVENT_CREATED')
    private readonly eventServiceClient: ClientProxy,
  ) {}

  @MessagePattern('event_created')
  handleEntryExitRequest(data: Record<string, unknown>) {
    return this.eventServiceClient.send('event_created', data);
  }

  @MessagePattern('notification')
  getNotifications(@Payload() data: number[]) {
    console.log(`Message: ${JSON.stringify(data)}`);
  }
}
