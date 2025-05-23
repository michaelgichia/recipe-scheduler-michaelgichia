import {z} from 'zod'

// Event validation schemas
export const CreateEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  eventTime: z.string().datetime('Invalid datetime format'),
  userId: z.string().uuid('Invalid user ID format'),
})

export const UpdateEventSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(200, 'Title too long')
      .optional(),
    eventTime: z.string().datetime('Invalid datetime format').optional(),
  })
  .refine((data) => data.title || data.eventTime, {
    message: 'At least one field (title or eventTime) must be provided',
  })

export const EventParamsSchema = z.object({
  id: z.string().uuid('Invalid event ID format'),
})

export const GetEventsQuerySchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  offset: z.string().regex(/^\d+$/).transform(Number).optional(),
})

// Device validation schemas
export const CreateDeviceSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  pushToken: z.string().min(1, 'Push token is required'),
})

// Push notification schemas
export const PushNotificationSchema = z.object({
  to: z.string().min(1, 'Push token is required'),
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  data: z.record(z.any()).optional(),
})

// Utility type extractors
export type CreateEventDto = z.infer<typeof CreateEventSchema>
export type UpdateEventDto = z.infer<typeof UpdateEventSchema>
export type EventParams = z.infer<typeof EventParamsSchema>
export type GetEventsQuery = z.infer<typeof GetEventsQuerySchema>
export type CreateDeviceDto = z.infer<typeof CreateDeviceSchema>
export type PushNotificationPayload = z.infer<typeof PushNotificationSchema>
