export interface Event {
    id: string;
    userId: string;
    title: string;
    eventTime: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateEventDto {
    title: string;
    eventTime: string;
    userId: string;
}
export interface UpdateEventDto {
    title?: string;
    eventTime?: string;
}
export interface Device {
    id: string;
    userId: string;
    pushToken: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateDeviceDto {
    userId: string;
    pushToken: string;
}
export interface ReminderJob {
    eventId: string;
    userId: string;
    title: string;
    eventTime: Date;
    pushToken?: string;
}
export interface PushNotificationPayload {
    to: string;
    title: string;
    body: string;
    data?: Record<string, never>;
}
export interface ApiResponse<T = never> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export declare const QUEUE_NAMES: {
    readonly REMINDER: "reminder-queue";
};
export declare const MESSAGE_PATTERNS: {
    readonly CREATE_EVENT: "event.create";
    readonly GET_EVENTS: "event.get_all";
    readonly GET_EVENT: "event.get_one";
    readonly UPDATE_EVENT: "event.update";
    readonly DELETE_EVENT: "event.delete";
    readonly CREATE_DEVICE: "device.create";
    readonly GET_DEVICE: "device.get";
    readonly SEND_PUSH: "notification.send_push";
    readonly SCHEDULE_REMINDER: "worker.schedule_reminder";
    readonly CANCEL_REMINDER: "worker.cancel_reminder";
};
