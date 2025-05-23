import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Payload,
  Ctx,
  RedisContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('EVENT_CREATED')
    private readonly eventServiceClient: ClientProxy,
  ) {}

  @MessagePattern('event_created')
  handleEntryExitRequest(data: any) {
    return this.eventServiceClient.send('event_created', data);
  }

  @MessagePattern('notification')
  getNotifications(@Payload() data: number[], @Ctx() context: RedisContext) {
    console.log(`Channel: ${context.getChannel()} ${JSON.stringify(data)}`);
  }
}
