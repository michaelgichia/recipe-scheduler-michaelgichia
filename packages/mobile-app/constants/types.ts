import { Event } from '@microservice/shared';

export interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

export type RootStackParamList = {
  'index': undefined;
  'event-form': undefined;
  'notifications': undefined;
  'event/[id]': { id: string };
};