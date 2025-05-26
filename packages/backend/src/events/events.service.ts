import { Body, Get, Inject, Injectable, Param, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import {
  Event,
  CreateEventDto,
  UpdateEventDto,
  ApiResponse,
  GetEventsQuery,
  ScheduleReminderDto,
  MESSAGE_PATTERNS,
} from '@microservice/shared';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @Inject('REMINDER_SERVICE')
    private readonly reminderServiceClient: ClientProxy,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<ApiResponse<Event>> {
    try {
      const event = this.eventsRepository.create({
        ...createEventDto,
        eventTime: new Date(createEventDto.eventTime),
      });

      const savedEvent = await this.eventsRepository.save(event);

      const scheduleReminderDto: ScheduleReminderDto = {
        eventId: savedEvent.id,
        userId: savedEvent.userId,
        eventTitle: savedEvent.title,
        eventTime: savedEvent.eventTime.toISOString(),
        minutesBefore: 5,
      };

      console.log(
        `Scheduling reminder for event ID ${savedEvent.id} at ${scheduleReminderDto.eventTime} with ${scheduleReminderDto.minutesBefore} minutes before`,
      );
      try {
        this.reminderServiceClient
          .emit(MESSAGE_PATTERNS.SCHEDULE_REMINDER, scheduleReminderDto)
          .subscribe({
            next: () => {},
            error: (emitError) => {
              console.error(
                `Failed to emit SCHEDULE_REMINDER for event ID ${savedEvent.id}:`,
                emitError,
              );
            },
          });
      } catch (dbError: unknown) {
        console.error(
          `Synchronous error during reminder scheduling for event ID ${savedEvent.id}:`,
          dbError,
        );
      }

      return {
        success: true,
        data: savedEvent,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  async findAll(query: GetEventsQuery): Promise<ApiResponse<Event[]>> {
    try {
      const { userId, limit = 50, offset = 0 } = query;
      const events = await this.eventsRepository.find({
        where: {
          userId,
          eventTime: MoreThan(new Date()),
        },
        order: {
          eventTime: 'ASC',
        },
        take: Number(limit),
        skip: Number(offset),
      });

      return {
        success: true,
        data: events,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Something wrong happened',
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Event>> {
    try {
      const event = await this.eventsRepository.findOne({ where: { id } });
      if (!event) {
        return {
          success: false,
          error: `Event with ID "${id}" not found`,
        };
      }
      return {
        success: true,
        data: event,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Something wrong happened',
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<ApiResponse<Event>> {
    try {
      await this.eventsRepository.update(id, updateEventDto);
      const event = await this.eventsRepository.findOne({ where: { id } });

      if (!event) {
        return {
          success: false,
          error: `Event with ID "${id}" not found`,
        };
      }

      return {
        success: true,
        data: event,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Something wrong happened',
      };
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      await this.eventsRepository.delete(id);
      return {
        success: true,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Something wrong happened',
      };
    }
  }
}
