"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_PATTERNS = exports.QUEUE_NAMES = void 0;
// Queue Names
exports.QUEUE_NAMES = {
    REMINDER: 'reminder-queue',
};
// Message Patterns for Microservices
exports.MESSAGE_PATTERNS = {
    // Event Service
    CREATE_EVENT: 'event.create',
    GET_EVENTS: 'event.get_all',
    GET_EVENT: 'event.get_one',
    UPDATE_EVENT: 'event.update',
    DELETE_EVENT: 'event.delete',
    // Notification Service
    CREATE_DEVICE: 'device.create',
    GET_DEVICE: 'device.get',
    SEND_PUSH: 'notification.send_push',
    // Worker Service
    SCHEDULE_REMINDER: 'worker.schedule_reminder',
    CANCEL_REMINDER: 'worker.cancel_reminder',
};
