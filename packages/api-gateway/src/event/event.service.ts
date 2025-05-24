import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateEventDto,
  GetEventsQuery,
  MESSAGE_PATTERNS,
  QUEUE_NAMES,
} from '@microservice/shared';

@Injectable()
export class EventService {
  constructor(
    @InjectQueue(QUEUE_NAMES.EVENT_QUEUE)
    private readonly eventQueue: Queue,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const requestId = uuidv4();

    const jobPayload = {
      type: MESSAGE_PATTERNS.CREATE_EVENT,
      data: createEventDto,
      requestId,
    };

    const job = await this.eventQueue.add(MESSAGE_PATTERNS.CREATE_EVENT, jobPayload, {
      removeOnComplete: 10,
      removeOnFail: 10,
    });

    return {
      message: 'Event creation job queued successfully',
      jobId: job.id,
      requestId,
    };
  }

  async getEvents(getEventDto: GetEventsQuery) {
    const requestId = uuidv4();

    const jobPayload = {
      type: MESSAGE_PATTERNS.GET_EVENT,
      data: getEventDto,
      requestId,
    };

    const job = await this.eventQueue.add(MESSAGE_PATTERNS.GET_EVENT, jobPayload, {
      removeOnComplete: 10,
      removeOnFail: 10,
    });

    return {
      message: 'Get events job queued successfully',
      jobId: job.id,
      requestId,
    };
  }
}
