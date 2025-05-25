import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  Event,
  CreateEventDto,
  GetEventsQuery,
  MESSAGE_PATTERNS,
  UpdateEventDto,
  EventParams,
} from '@microservice/shared';
@Controller('events')
export class EventController {
  constructor(@Inject('EVENT_SERVICE') private eventService: ClientProxy) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    const result = await firstValueFrom(
      this.eventService.send<{
        success: boolean;
        error?: string;
        data: Event;
      }>(MESSAGE_PATTERNS.CREATE_EVENT, createEventDto),
    );

    if (!result.success) {
      throw new HttpException(
        result.error || 'Failed to create event',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result.data;
  }

  @Get()
  async getEvents(@Query() query: GetEventsQuery): Promise<Event[]> {
    const result = await firstValueFrom(
      this.eventService.send<{
        success: boolean;
        error?: string;
        data: Event[];
      }>(MESSAGE_PATTERNS.GET_EVENTS, query),
    );

    if (!result.success) {
      throw new HttpException(
        result.error || 'Failed to get events',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result.data;
  }

  @Get(':id')
  async getEvent(@Param('id') id: string): Promise<Event> {
    const result = await firstValueFrom(
      this.eventService.send<{
        success: boolean;
        error?: string;
        data: Event;
      }>(MESSAGE_PATTERNS.GET_EVENT, id),
    );

    if (!result.success) {
      throw new HttpException(
        result.error || 'Failed to get event.',
        result.error === 'Event not found'
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    }

    return result.data;
  }

  @Patch(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const result = await firstValueFrom(
      this.eventService.send<{
        success: boolean;
        error?: string;
        data: Event;
      }>(MESSAGE_PATTERNS.UPDATE_EVENT, {
        id,
        ...updateEventDto,
      }),
    );

    if (!result.success) {
      throw new HttpException(
        result.error || 'Failed to update event',
        result.error === 'Event not found'
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    }

    return result.data;
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<void> {
    const result = await firstValueFrom(
      this.eventService.send<{
        success: boolean;
        error?: string;
        data: null;
      }>(MESSAGE_PATTERNS.DELETE_EVENT, id),
    );

    if (!result.success) {
      throw new HttpException(
        result.error || 'Failed to delete event',
        result.error === 'Event not found'
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    }
  }
}
