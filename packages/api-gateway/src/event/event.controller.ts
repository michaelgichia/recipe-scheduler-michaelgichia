import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, GetEventsQuery } from '@microservice/shared';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Get()
  async getEvents(@Query() getEventDto: GetEventsQuery) {
    return this.eventService.getEvents(getEventDto);
  }
}