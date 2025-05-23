import { z } from 'zod';
export declare const CreateEventSchema: z.ZodObject<{
    title: z.ZodString;
    eventTime: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    eventTime: string;
    userId: string;
}, {
    title: string;
    eventTime: string;
    userId: string;
}>;
export declare const UpdateEventSchema: z.ZodEffects<z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    eventTime: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    eventTime?: string | undefined;
}, {
    title?: string | undefined;
    eventTime?: string | undefined;
}>, {
    title?: string | undefined;
    eventTime?: string | undefined;
}, {
    title?: string | undefined;
    eventTime?: string | undefined;
}>;
export declare const EventParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const GetEventsQuerySchema: z.ZodObject<{
    userId: z.ZodString;
    limit: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
    offset: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    limit?: number | undefined;
    offset?: number | undefined;
}, {
    userId: string;
    limit?: string | undefined;
    offset?: string | undefined;
}>;
export declare const CreateDeviceSchema: z.ZodObject<{
    userId: z.ZodString;
    pushToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    pushToken: string;
}, {
    userId: string;
    pushToken: string;
}>;
export declare const PushNotificationSchema: z.ZodObject<{
    to: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    to: string;
    body: string;
    data?: Record<string, any> | undefined;
}, {
    title: string;
    to: string;
    body: string;
    data?: Record<string, any> | undefined;
}>;
export type CreateEventDto = z.infer<typeof CreateEventSchema>;
export type UpdateEventDto = z.infer<typeof UpdateEventSchema>;
export type EventParams = z.infer<typeof EventParamsSchema>;
export type GetEventsQuery = z.infer<typeof GetEventsQuerySchema>;
export type CreateDeviceDto = z.infer<typeof CreateDeviceSchema>;
export type PushNotificationPayload = z.infer<typeof PushNotificationSchema>;
