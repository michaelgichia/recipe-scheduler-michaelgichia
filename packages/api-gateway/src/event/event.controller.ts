import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
  Query,
  Get,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  Event,
  GetEventsQuery,
  MESSAGE_PATTERNS,
  // CreateEventDto,
  // UpdateEventSchema,
  // EventParamsSchema,
  // GetEventsQuerySchema,
} from '@microservice/shared';

@Controller('events')
export class EventController {
  constructor(@Inject('EVENT_SERVICE') private eventService: ClientProxy) {}

  @Post()
  async createEvent(@Body() createEventDto: any): Promise<Event> {
    const result = await firstValueFrom(
      this.eventService.send(MESSAGE_PATTERNS.CREATE_EVENT, createEventDto),
    );

    if (!result.success) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return result.data;
  }

  @Get()
  async getEvents(@Query() query: GetEventsQuery): Promise<Event[]> {
    console.log("query", query)
    const result = await firstValueFrom(
      this.eventService.send<{
        success: boolean;
        error?: string;
        data: Event[];
      }>(MESSAGE_PATTERNS.GET_EVENTS, query),
    );

    if (!result.success) {
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    return result.data;
  }

  // @Get()
  // @ApiOperation({ summary: 'Get upcoming events for a user' })
  // @ApiQuery({ name: 'userId', description: 'User ID (UUID)', required: true })
  // @ApiQuery({ name: 'limit', description: 'Limit results', required: false })
  // @ApiQuery({ name: 'offset', description: 'Offset for pagination', required: false })
  // @ApiResponse({ status: 200, description: 'Events retrieved successfully' })
  // async getEvents(@Query() query: any): Promise<Event[]> {
  //   try {
  //     // Validate query parameters
  //     const validatedQuery = GetEventsQuerySchema.parse(query);

  //     const result = await firstValueFrom(
  //       this.eventService.send(MESSAGE_PATTERNS.GET_EVENTS, validatedQuery),
  //     );

  //     if (!result.success) {
  //       throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
  //     }

  //     return result.data;
  //   } catch (error) {
  //     if (error.name === 'ZodError') {
  //       throw new HttpException(
  //         { message: 'Validation failed', errors: error.errors },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     throw error;
  //   }
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get a specific event' })
  // @ApiParam({ name: 'id', description: 'Event ID (UUID)' })
  // @ApiResponse({ status: 200, description: 'Event retrieved successfully' })
  // @ApiResponse({ status: 404, description: 'Event not found' })
  // async getEvent(@Param('id') id: string): Promise<Event> {
  //   try {
  //     // Validate params
  //     const validatedParams = EventParamsSchema.parse({ id });

  //     const result = await firstValueFrom(
  //       this.eventService.send(MESSAGE_PATTERNS.GET_EVENT, validatedParams.id),
  //     );

  //     if (!result.success) {
  //       throw new HttpException(
  //         result.error,
  //         result.error === 'Event not found' ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //     return result.data;
  //   } catch (error) {
  //     if (error.name === 'ZodError') {
  //       throw new HttpException(
  //         { message: 'Validation failed', errors: error.errors },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     throw error;
  //   }
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update an event' })
  // @ApiParam({ name: 'id', description: 'Event ID (UUID)' })
  // @ApiResponse({ status: 200, description: 'Event updated successfully' })
  // @ApiResponse({ status: 404, description: 'Event not found' })
  // async updateEvent(
  //   @Param('id') id: string,
  //   @Body() updateEventDto: any,
  // ): Promise<Event> {
  //   try {
  //     // Validate params and body
  //     const validatedParams = EventParamsSchema.parse({ id });
  //     const validatedData = UpdateEventSchema.parse(updateEventDto);

  //     const result = await firstValueFrom(
  //       this.eventService.send(MESSAGE_PATTERNS.UPDATE_EVENT, {
  //         id: validatedParams.id,
  //         ...validatedData,
  //       }),
  //     );

  //     if (!result.success) {
  //       throw new HttpException(
  //         result.error,
  //         result.error === 'Event not found' ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //     return result.data;
  //   } catch (error) {
  //     if (error.name === 'ZodError') {
  //       throw new HttpException(
  //         { message: 'Validation failed', errors: error.errors },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     throw error;
  //   }
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete an event' })
  // @ApiParam({ name: 'id', description: 'Event ID (UUID)' })
  // @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  // @ApiResponse({ status: 404, description: 'Event not found' })
  // async deleteEvent(@Param('id') id: string): Promise<void> {
  //   try {
  //     // Validate params
  //     const validatedParams = EventParamsSchema.parse({ id });

  //     const result = await firstValueFrom(
  //       this.eventService.send(MESSAGE_PATTERNS.DELETE_EVENT, validatedParams.id),
  //     );

  //     if (!result.success) {
  //       throw new HttpException(
  //         result.error,
  //         result.error === 'Event not found' ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   } catch (error) {
  //     if (error.name === 'ZodError') {
  //       throw new HttpException(
  //         { message: 'Validation failed', errors: error.errors },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     throw error;
  //   }
  // }
}
