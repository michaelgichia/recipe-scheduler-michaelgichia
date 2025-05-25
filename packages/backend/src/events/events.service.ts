import {
  Body,
  Get,
  Injectable,
  Logger,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, MoreThan, UpdateResult } from 'typeorm';
import {
  Event,
  CreateEventDto,
  UpdateEventDto,
  ApiResponse,
  GetEventsQuery,
} from '@microservice/shared';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<ApiResponse<Event>> {
    try {
      const event = this.eventsRepository.create({
        ...createEventDto,
        eventTime: new Date(createEventDto.eventTime),
      });

      const savedEvent = await this.eventsRepository.save(event);

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
