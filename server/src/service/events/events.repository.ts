import { Event } from 'models';

export abstract class EventsRepository {
  public abstract addEvent(event: Event): Promise<void>;

  public abstract deleteEvent(eventId: number): Promise<void>;

  public abstract editEvent(event: Event): Promise<Event[]>;

  public abstract getEvents(): Promise<Event[]>;

  public abstract getEvent(eventId: number): Promise<Event>;

}
