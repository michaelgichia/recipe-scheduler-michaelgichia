"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationSchema =
  exports.CreateDeviceSchema =
  exports.GetEventsQuerySchema =
  exports.EventParamsSchema =
  exports.UpdateEventSchema =
  exports.CreateEventSchema =
    void 0;
const zod_1 = require("zod");
// Event validation schemas
exports.CreateEventSchema = zod_1.z.object({
  title: zod_1.z
    .string()
    .min(1, "Title is required")
    .max(200, "Title too long"),
  eventTime: zod_1.z.string().datetime("Invalid datetime format"),
  userId: zod_1.z.string().uuid("Invalid user ID format"),
});
exports.UpdateEventSchema = zod_1.z
  .object({
    title: zod_1.z
      .string()
      .min(1, "Title is required")
      .max(200, "Title too long")
      .optional(),
    eventTime: zod_1.z.string().datetime("Invalid datetime format").optional(),
  })
  .refine((data) => data.title || data.eventTime, {
    message: "At least one field (title or eventTime) must be provided",
  });
exports.EventParamsSchema = zod_1.z.object({
  id: zod_1.z.string().uuid("Invalid event ID format"),
});
exports.GetEventsQuerySchema = zod_1.z.object({
  userId: zod_1.z.string().uuid("Invalid user ID format"),
  limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
  offset: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
});
// Device validation schemas
exports.CreateDeviceSchema = zod_1.z.object({
  userId: zod_1.z.string().uuid("Invalid user ID format"),
  pushToken: zod_1.z.string().min(1, "Push token is required"),
});
// Push notification schemas
exports.PushNotificationSchema = zod_1.z.object({
  to: zod_1.z.string().min(1, "Push token is required"),
  title: zod_1.z.string().min(1, "Title is required"),
  body: zod_1.z.string().min(1, "Body is required"),
  data: zod_1.z.record(zod_1.z.any()).optional(),
});
