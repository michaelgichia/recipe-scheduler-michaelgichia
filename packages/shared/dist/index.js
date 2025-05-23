"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationSchema = exports.CreateDeviceSchema = exports.GetEventsQuerySchema = exports.EventParamsSchema = exports.UpdateEventSchema = exports.CreateEventSchema = void 0;
__exportStar(require("./types"), exports);
var validation_1 = require("./validation");
Object.defineProperty(exports, "CreateEventSchema", { enumerable: true, get: function () { return validation_1.CreateEventSchema; } });
Object.defineProperty(exports, "UpdateEventSchema", { enumerable: true, get: function () { return validation_1.UpdateEventSchema; } });
Object.defineProperty(exports, "EventParamsSchema", { enumerable: true, get: function () { return validation_1.EventParamsSchema; } });
Object.defineProperty(exports, "GetEventsQuerySchema", { enumerable: true, get: function () { return validation_1.GetEventsQuerySchema; } });
Object.defineProperty(exports, "CreateDeviceSchema", { enumerable: true, get: function () { return validation_1.CreateDeviceSchema; } });
Object.defineProperty(exports, "PushNotificationSchema", { enumerable: true, get: function () { return validation_1.PushNotificationSchema; } });
