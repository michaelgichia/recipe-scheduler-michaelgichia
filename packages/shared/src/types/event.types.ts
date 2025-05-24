export interface Event {
  id: string;
  userId: string;
  title: string;
  eventTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEventRequest {
  title: string;
  eventTime: string; // ISO string
  userId: string;
}

export interface UpdateEventRequest {
  title?: string;
  eventTime?: string; // ISO string
}
