import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateEventDto,
  Event,
  GetEventsQuery,
  MESSAGE_PATTERNS,
  UpdateEventDto,
} from '@microservice/shared';
import { EventsService } from './events.service';
import { DeleteResult } from 'typeorm';

@Controller()
export class EventProcessor {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern(MESSAGE_PATTERNS.CREATE_EVENT)
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventsService.create(createEventDto);
  }

  @MessagePattern(MESSAGE_PATTERNS.GET_EVENTS)
  async getEvents(query: GetEventsQuery): Promise<Event[]> {
    return await this.eventsService.findAll(query.userId);
  }

  @MessagePattern(MESSAGE_PATTERNS.GET_EVENT)
  async getEvent(id: string): Promise<Event | null> {
    return await this.eventsService.findOne(id);
  }

  @MessagePattern(MESSAGE_PATTERNS.UPDATE_EVENT)
  async updateEvent(
    payload: { id: string } & UpdateEventDto,
  ): Promise<Event | undefined> {
    const { id, ...updateEventDto } = payload;
    return await this.eventsService.update(id, updateEventDto);
  }

  @MessagePattern(MESSAGE_PATTERNS.DELETE_EVENT)
  async deleteEvent(id: string): Promise<DeleteResult> {
    return await this.eventsService.remove(id);
  }
}
