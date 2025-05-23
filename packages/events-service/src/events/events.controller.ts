import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateEventDto,
  UpdateEventDto,
  MESSAGE_PATTERNS,
  ApiResponse,
  GetEventsQuery,
} from '@recipe-scheduler/shared';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern(MESSAGE_PATTERNS.CREATE_EVENT)
  async createEvent(
    createEventDto: CreateEventDto,
  ): Promise<ApiResponse<Event>> {
    return this.eventsService.create(createEventDto);
  }

  @MessagePattern(MESSAGE_PATTERNS.GET_EVENTS)
  async getEvents(query: GetEventsQuery): Promise<ApiResponse<Event[]>> {
    return this.eventsService.findAll(query);
  }

  @MessagePattern(MESSAGE_PATTERNS.GET_EVENT)
  async getEvent(id: string): Promise<ApiResponse<Event>> {
    return this.eventsService.findOne(id);
  }

  @MessagePattern(MESSAGE_PATTERNS.UPDATE_EVENT)
  async updateEvent(
    payload: { id: string } & UpdateEventDto,
  ): Promise<ApiResponse<Event>> {
    const { id, ...updateEventDto } = payload;
    return this.eventsService.update(id, updateEventDto);
  }

  @MessagePattern(MESSAGE_PATTERNS.DELETE_EVENT)
  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    return this.eventsService.remove(id);
  }
}
