import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import {
  CreateEventSchema,
  Event,
  MESSAGE_PATTERNS,
} from '@recipe-scheduler/shared';
import { firstValueFrom } from 'rxjs';

@Controller('events')
export class AppController {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventService: ClientProxy,
  ) {}

  @Post()
  async createEvent(@Body() createEventDto: any): Promise<Event> {
    try {
      // Validate payload
      const validatedData = CreateEventSchema.parse(createEventDto);

      const result = await firstValueFrom(
        this.eventService.send(MESSAGE_PATTERNS.CREATE_EVENT, validatedData),
      );

      if (!result.success) {
        throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
      }

      return result.data;
    } catch (error) {
      if (error.name === 'ZodError') {
        throw new HttpException(
          { message: 'Validation failed', errors: error.errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }
}
