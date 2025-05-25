import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Event, CreateEventDto, UpdateEventDto } from '@microservice/shared';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = this.eventsRepository.create({
      ...createEventDto,
      eventTime: new Date(createEventDto.eventTime), // Convert string to Date
    });
    return this.eventsRepository.save(newEvent);
  }

  async findAll(userId: string): Promise<Event[]> {
    this.logger.debug(`Querying events for userId: ${userId}`);
    try {
      const events = await this.eventsRepository.find({
        where: { userId },
        order: { eventTime: 'ASC' },
      });
      this.logger.debug(`Found ${events.length} events in database`);
      return events;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Error finding events: ${errorMessage}`, errorStack);
      throw error;
    }
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventsRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event | undefined> {
    const event = await this.eventsRepository.preload({
      id: id,
      ...updateEventDto,
      eventTime: updateEventDto.eventTime
        ? new Date(updateEventDto.eventTime)
        : undefined,
    });

    if (!event) {
      return undefined; // Event not found
    }
    return this.eventsRepository.save(event);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.eventsRepository.delete(id);
  }
}
