// Message Patterns for Microservices
export const MESSAGE_PATTERNS = {
  // Event Service
  CREATE_EVENT: "event.create",
  GET_EVENTS: "event.get_all",
  GET_EVENT: "event.get_one",
  UPDATE_EVENT: "event.update",
  DELETE_EVENT: "event.delete",

  // Notification Service
  CREATE_DEVICE: "device.create",
  GET_DEVICE: "device.get",
  GET_DEVICE_BY_USER_ID: "device.get_by_user_id",
  SEND_PUSH: "notification.send_push",

  // Worker Service
  SCHEDULE_REMINDER: "worker.schedule_reminder",
  CANCEL_REMINDER: "worker.cancel_reminder",
} as const;
