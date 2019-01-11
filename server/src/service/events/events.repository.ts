import { Event } from 'models';

export abstract class EventsRepository {
  public abstract addEvent(event: Event, id: number): Promise<void>;

  public abstract deleteEvent(eventId: number, id: number): Promise<void>;

  public abstract editEvent(event: Event, id: number): Promise<void>;

  public abstract getEvents(): Promise<Event[]>;

  public abstract getEvent(eventId: number): Promise<Event>;
}
