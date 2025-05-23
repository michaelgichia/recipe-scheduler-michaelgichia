import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse, CreateEventDto } from '@recipe-scheduler/shared';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
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

  // async findAll(query: GetEventsQuery): Promise<ApiResponse<Event[]>> {
  //   try {
  //     const { userId, limit = 50, offset = 0 } = query;

  //     const events = await this.eventsRepository.find({
  //       where: {
  //         userId,
  //         eventTime: MoreThan(new Date()), // Only upcoming events
  //       },
  //       order: {
  //         eventTime: 'ASC', // Soonest first
  //       },
  //       take: limit,
  //       skip: offset,
  //     });

  //     return {
  //       success: true,
  //       data: events,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // async findOne(id: string): Promise<ApiResponse<Event>> {
  //   try {
  //     const event = await this.eventsRepository.findOne({ where: { id } });

  //     if (!event) {
  //       return {
  //         success: false,
  //         error: 'Event not found',
  //       };
  //     }

  //     return {
  //       success: true,
  //       data: event,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // async update(
  //   id: string,
  //   updateEventDto: UpdateEventDto,
  // ): Promise<ApiResponse<Event>> {
  //   try {
  //     const event = await this.eventsRepository.findOne({ where: { id } });

  //     if (!event) {
  //       return {
  //         success: false,
  //         error: 'Event not found',
  //       };
  //     }

  //     // Cancel existing reminder
  //     await firstValueFrom(
  //       this.workerService.send(MESSAGE_PATTERNS.CANCEL_REMINDER, event.id),
  //     );

  //     // Update event
  //     const updateData: Partial<Event> = {};
  //     if (updateEventDto.title) updateData.title = updateEventDto.title;
  //     if (updateEventDto.eventTime)
  //       updateData.eventTime = new Date(updateEventDto.eventTime);

  //     await this.eventsRepository.update(id, updateData);
  //     const updatedEvent = await this.eventsRepository.findOne({
  //       where: { id },
  //     });

  //     // Schedule new reminder
  //     await firstValueFrom(
  //       this.workerService.send(MESSAGE_PATTERNS.SCHEDULE_REMINDER, {
  //         eventId: updatedEvent.id,
  //         userId: updatedEvent.userId,
  //         title: updatedEvent.title,
  //         eventTime: updatedEvent.eventTime,
  //       }),
  //     );

  //     return {
  //       success: true,
  //       data: updatedEvent,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.message,
  //     };
  //   }
  // }

  // async remove(id: string): Promise<ApiResponse<void>> {
  //   try {
  //     const event = await this.eventsRepository.findOne({ where: { id } });

  //     if (!event) {
  //       return {
  //         success: false,
  //         error: 'Event not found',
  //       };
  //     }

  //     // Cancel reminder
  //     await firstValueFrom(
  //       this.workerService.send(MESSAGE_PATTERNS.CANCEL_REMINDER, event.id),
  //     );

  //     await this.eventsRepository.remove(event);

  //     return {
  //       success: true,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.message,
  //     };
  //   }
  // }
}
